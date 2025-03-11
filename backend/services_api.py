import requests
import json
import time
from sqlalchemy import create_engine, MetaData, Table, select
from sqlalchemy.sql import text
import os

def search_businesses(api_key, location, term=None, total_results=20):
    endpoint = "https://api.yelp.com/v3/businesses/search"
    
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    # Maximum results per request (Yelp limits this to 50)
    max_per_request = 50
    
    # Calculate how many requests we need to make
    num_requests = (total_results + max_per_request - 1) // max_per_request
    
    all_businesses = []
    
    for i in range(num_requests):
        # Calculate the offset for each request
        offset = i * max_per_request
        
        # Base parameters
        params = {
            "location": location,
            "limit": min(max_per_request, total_results - offset),
            "offset": offset,
        }
        
        # Add optional search term if provided
        if term:
            params["term"] = term
        
        # Make the API request
        response = requests.get(endpoint, headers=headers, params=params)
        
        # Check if the request was successful
        if response.status_code == 200:
            data = response.json()
            businesses = data["businesses"]
            all_businesses.extend(businesses)
            
            # If we received fewer results than requested, we've hit the end
            if len(businesses) < params["limit"]:
                break
                
            # Respect rate limits (Yelp limits to ~500 requests per day)
            if i < num_requests - 1:
                time.sleep(0.2)  # Add a small delay between requests
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            break
    
    return all_businesses

def search_translations(api_key, location, total_results=20):
    endpoint = "https://api.yelp.com/v3/businesses/search"
    
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    # Maximum results per request (Yelp limits this to 50)
    max_per_request = 50
    
    # Calculate how many requests we need to make
    num_requests = (total_results + max_per_request - 1) // max_per_request
    
    all_businesses = []
    
    for i in range(num_requests):
        # Calculate the offset for each request
        offset = i * max_per_request
        
        # Base parameters
        params = {
            "location": location,
            "limit": min(max_per_request, total_results - offset),
            "offset": offset,
            "categories": "translationservices"
        }
        
        # Make the API request
        response = requests.get(endpoint, headers=headers, params=params)
        
        # Check if the request was successful
        if response.status_code == 200:
            data = response.json()
            businesses = data["businesses"]
            all_businesses.extend(businesses)
            
            # If we received fewer results than requested, we've hit the end
            if len(businesses) < params["limit"]:
                break
                
            # Respect rate limits (Yelp limits to ~500 requests per day)
            if i < num_requests - 1:
                time.sleep(0.2)  # Add a small delay between requests
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            break
    
    return all_businesses

def save_to_json(businesses, filename="yelp_results.json"):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(businesses, f, ensure_ascii=False, indent=2)
    print(f"Results saved to {filename}")

def populate_database(results):
    password = os.environ.get("SQL_PASS", "uh oh")
    engine = create_engine(f'mysql+pymysql://admin:{password}@database-1.cnkg4y8uupw7.us-east-2.rds.amazonaws.com:3306/SpeakATX')
    connection = engine.connect()
    metadata = MetaData()

    services_table = Table('Services', metadata, autoload_with=engine)

    print("Connected to database")

    print(f"Found columns: {[c.name for c in services_table.columns]}")

    connection.execute(services_table.delete())
    connection.commit()

    for category, items in results.items():
        for item in items:
            insert_stmt = services_table.insert().values(
                name=item["name"],
                language=category if category != "translations" else "english",
                rating=item["rating"],
                area="unknown" if item["location"]["address1"] == None else item["location"]["address1"],
                price=1 if "price" not in item else len(item["price"]), # either $, $$, or $$$
                imageUrl=item["image_url"],
                map_location=f"{item["coordinates"]["latitude"]},{item["coordinates"]["longitude"]}",
                website=item["url"],
                descr="idk"
            )
            connection.execute(insert_stmt)

    connection.commit()

    print("\nPopulated with the following rows:")

    select_stmt = select(services_table).limit(140)

    with engine.connect() as connection:
        result = connection.execute(select_stmt)
        for row in result:
            print(row)

    connection.close()


if __name__ == "__main__":

    API_KEY = "vCZrFDPdXdCjEyYp7NtgcSqZ6IxlHWihpK_TKBXLdzMjOEdRrWIwhC6Kn2D4vsQ7fUVplhQinBkiIzL_sr4wXsiNJBjTgS3hTTdr-cbrTPLs7oFMIJwF6ExZbzXKZ3Yx"
    
    location = "Austin, TX"

    languages = ["spanish", "french", "chinese", "vietnamese", "korean", "german"]
    
    results = {}
    results["translations"] = search_translations(API_KEY, location)
    count = len(results["translations"])

    for lang in languages:
        results[lang] = search_businesses(API_KEY, location, lang)
        count += len(results[lang])

    print(f"Retrieved a total of {count} businesses")
    
    populate_database(results)
    #save_to_json(results)