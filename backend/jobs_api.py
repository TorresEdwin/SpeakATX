from serpapi import GoogleSearch
import json
from sqlalchemy import create_engine, MetaData, Table, select
from sqlalchemy.sql import text
import os
import re

def extract_first_number(text):
    # Regular expression to match the first number (integer or float)
    match = re.search(r'\d+(\.\d+)?', text)  # Looks for a number with optional decimal
    if match:
        # If there's a match, return it as a float (you could also return as int if preferred)
        return float(match.group(0))
    return None

def save_to_json(jobs, filename="job_results.json"):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(jobs, f, ensure_ascii=False, indent=2)
    print(f"Results saved to {filename}")

def populate_database(results):
    password = os.environ.get("SQL_PASS", "uh oh")
    engine = create_engine(f'mysql+pymysql://admin:{password}@database-1.cnkg4y8uupw7.us-east-2.rds.amazonaws.com:3306/SpeakATX')
    connection = engine.connect()
    metadata = MetaData()

    table = Table('Jobs', metadata, autoload_with=engine)

    print("Connected to database")

    print(f"Found columns: {[c.name for c in table.columns]}")

    connection.execute(table.delete())
    connection.commit()

    languages = ["spanish", "french", "chinese", "vietnamese", "korean", "german"]

    for item in results:
        lang = ""
        for l in languages:
            if "title" in item and "description" in item:
                if l in item["title"].lower() or l in item["description"].lower():
                    if len(lang) > 0:
                        lang += ", "
                    lang += l
        
        paya = 0

        if "detected_extensions" in item and "salary" in item["detected_extensions"]:
            paya = extract_first_number(item["detected_extensions"]["salary"])

        insert_stmt = table.insert().values(
            name="none" if "company_name" not in item else item["company_name"],
            title=item["title"],
            pay=paya, # wip
            language=lang,
            area=item["location"],
            imageUrl="none" if "thumbnail" not in item else item["thumbnail"],
            website=item["share_link"],
            descr=item["description"]
        )
        connection.execute(insert_stmt)

    connection.commit()

    print("\nPopulated with the following rows:")

    select_stmt = select(table).limit(10)

    with engine.connect() as connection:
        result = connection.execute(select_stmt)
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
        
        # Create the search query for Google Jobs
        search = GoogleSearch(params)
        results = search.get_dict()
        
        # Check if results contain job listings
        if "jobs_results" in results:
            for job in results.get("jobs_results", []):
                job_location = job.get("location", "").lower()

                if "tx" in job_location:
                    job_dict = {key: value for key, value in job.items()}
                    job_listings.append(job_dict)

    if not job_listings:
        print("oops")
        return {"message": "No jobs found."}
    
    return job_listings

if __name__ == "__main__":
    #save_to_json(fetch_jobs("bilingual"))
    populate_database(fetch_jobs(["bilingual jobs", "spanish jobs", "chinese jobs", "vietnamese jobs", "french jobs", "korean jobs", "german jobs"], 1))
