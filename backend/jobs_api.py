from serpapi import GoogleSearch
import json
import requests
from sqlalchemy import create_engine, MetaData, Table, select
from sqlalchemy.sql import text
import os
import re

def extract_first_number(text):
    match = re.search(r'\d+(\.\d+)?', text)
    if match:
        return float(match.group(0))
    return None

def extract_first_dollar(text):
    pattern = r'\$\d+\.\d{2}'
    match = re.search(pattern, text)
    if match:
        return float(match.group(0)[1:])
    return 0

def fetch_image(query):
    api_key = "67e5e1a679bcf8e2c17481e7"
    url = "https://api.scrapingdog.com/google_images/"
    params = {
        "api_key": api_key,
        "query": query,
        "results": 1,
        "country": "us",
        "page": 0
    }
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            if "images_results" in data and len(data["images_results"]) > 0:
                return data["images_results"][0]["image"]
    except Exception as e:
        print(f"Error fetching image for {query}: {e}")
    return "https://www.dunbarcentre.org/wp-content/uploads/2022/10/placeholder-1.png"

def populate_database(results):
    password = os.environ.get("SQL_PASS", "uh oh")
    engine = create_engine(f'mysql+pymysql://admin:{password}@database-1.cnkg4y8uupw7.us-east-2.rds.amazonaws.com:3306/SpeakATX')
    connection = engine.connect()
    metadata = MetaData()
    table = Table('Jobs', metadata, autoload_with=engine)

    print("Connected to database")
    connection.execute(table.delete())
    connection.commit()

    languages = ["spanish", "french", "chinese", "vietnamese", "korean", "german"]

    for item in results:
        lang = ", ".join([l for l in languages if l in (item.get("title", "") + item.get("description", "")).lower()])
        lang = lang if lang else "spanish"
        
        paya = extract_first_number(item.get("detected_extensions", {}).get("salary", "")) or 0
        if paya == 0 and "job_highlights" in item:
            for section in item["job_highlights"]:
                for line in section["items"]:
                    paya = max(paya, extract_first_dollar(line))

        image_url = fetch_image(item["company_name"])
        
        insert_stmt = table.insert().values(
            name=item.get("company_name", "none"),
            title=item["title"],
            pay=paya,
            language=lang,
            area=item["location"],
            imageUrl=image_url,
            website=item["apply_options"][0]["link"],
            descr=item["description"]
        )
        connection.execute(insert_stmt)
    
    connection.commit()
    print("\nPopulated with the following rows:")
    result = connection.execute(select(table).limit(10))
    for row in result:
        print(row)
    connection.close()

def fetch_jobs(search_terms_list, pages):
    job_listings = []
    for search_terms in search_terms_list:
        params = {
            "api_key": "98105f355440203dbe19be8ee68e13264a6f8370c8353fd3aabc3224f7eb2183",
            "engine": "google_jobs",
            "google_domain": "google.com",
            "q": f"{search_terms}",
            "location": "Austin, Texas, United States",
        }
        search = GoogleSearch(params)
        results = search.get_dict()
        if "jobs_results" in results:
            for job in results.get("jobs_results", []):
                if "tx" in job.get("location", "").lower():
                    job_listings.append({key: value for key, value in job.items()})
    return job_listings if job_listings else {"message": "No jobs found."}

if __name__ == "__main__":
    jobs = fetch_jobs(["bilingual jobs", "spanish jobs", "chinese jobs", "vietnamese jobs", "french jobs", "korean jobs", "german jobs"], 1)
    populate_database(jobs)
