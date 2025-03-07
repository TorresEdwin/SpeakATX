import requests
import json
import time

def search_businesses_by_language_with_pagination(api_key, location, language, term=None, total_results=100):
    """
    Search for businesses that offer services in a specific language with pagination.
    
    Parameters:
    - api_key: Your Yelp Fusion API key
    - location: The location to search in (city, address, zip code, etc.)
    - language: The language attribute to search for (e.g., 'spanish', 'french', 'mandarin')
    - term: Optional search term (e.g., 'restaurant', 'doctor', 'lawyer')
    - total_results: Total number of results desired (will be capped by what's available)
    
    Returns:
    - A list of businesses matching the criteria
    """
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
            "attributes": f"open_to_all,{language}_speaking"
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

def save_to_json(businesses, filename="yelp_results.json"):
    """Save the results to a JSON file"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(businesses, f, ensure_ascii=False, indent=2)
    print(f"Results saved to {filename}")

def display_businesses(businesses):
    """Display the businesses in a readable format"""
    if not businesses or len(businesses) == 0:
        print("No businesses found matching your criteria.")
        return
    
    print(f"Found {len(businesses)} matching businesses:\n")
    
    for i, business in enumerate(businesses, 1):
        print(f"{i}. {business['name']}")
        print(f"   Rating: {business['rating']} stars ({business['review_count']} reviews)")
        print(f"   Address: {', '.join(business['location']['display_address'])}")
        print(f"   Phone: {business.get('phone', 'N/A')}")
        print(f"   Categories: {', '.join([c['title'] for c in business['categories']])}")
        print(f"   URL: {business['url']}")
        print()

# Example usage
if __name__ == "__main__":
    # Replace with your actual API key
    API_KEY = "vCZrFDPdXdCjEyYp7NtgcSqZ6IxlHWihpK_TKBXLdzMjOEdRrWIwhC6Kn2D4vsQ7fUVplhQinBkiIzL_sr4wXsiNJBjTgS3hTTdr-cbrTPLs7oFMIJwF6ExZbzXKZ3Yx"
    
    # Example search parameters
    location = "Austin, TX"
    language = "french"  # Options include: spanish, french, italian, german, chinese, japanese, korean, etc.
    search_term = "translation"  # Optional
    desired_results = 100  # How many total results you want
    
    # Get results with pagination
    results = search_businesses_by_language_with_pagination(API_KEY, location, language, search_term, desired_results)
    
    print(f"Retrieved a total of {len(results)} businesses")
    
    # Save results to a file
    save_to_json(results)
    
    # Display results (might be a lot if you requested many)
    display_businesses(results[:20])  # Show just the first 20 for console display