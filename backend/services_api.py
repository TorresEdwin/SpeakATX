import requests
import json
import time

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
    """Save the results to a JSON file"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(businesses, f, ensure_ascii=False, indent=2)
    print(f"Results saved to {filename}")

# Example usage
if __name__ == "__main__":
    # Replace with your actual API key
    API_KEY = "vCZrFDPdXdCjEyYp7NtgcSqZ6IxlHWihpK_TKBXLdzMjOEdRrWIwhC6Kn2D4vsQ7fUVplhQinBkiIzL_sr4wXsiNJBjTgS3hTTdr-cbrTPLs7oFMIJwF6ExZbzXKZ3Yx"
    
    # Example search parameters
    location = "Austin, TX"

    languages = ["spanish", "french", "chinese", "vietnamese", "korean", "german"]
    
    # Get results with pagination
    results = {}
    results["translations"] = search_translations(API_KEY, location)
    
    print(f"Retrieved a total of {len(results)} businesses")

    for lang in languages:
        results[lang] = search_businesses(API_KEY, location, lang)
    
    # Save results to a file
    save_to_json(results)
    
    print(len(results))