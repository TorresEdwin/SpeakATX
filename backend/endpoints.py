from serpapi import GoogleSearch
from flask import Flask, jsonify, request

flaskApp = Flask(__name__)

# Home route
@flaskApp.route("/")
def home():
    return "Hello, I Am Here!"

# Job search route
@flaskApp.route("/api/jobs", methods=["GET"])
def get_jobs():
    search_terms = request.args.get("search_terms", "jobs")
    location = request.args.get("location", "Austin, Texas, United States")
    
    jobs = fetch_jobs(search_terms, location)
    
    return jsonify(jobs)

# Function to fetch jobs using SerpApi
def fetch_jobs(search_terms, location):
    params = {
        "q": search_terms,
        "location": location,
        "engine": "google_jobs",
        "api_key": "98105f355440203dbe19be8ee68e13264a6f8370c8353fd3aabc3224f7eb2183",  # Use your API key here
    }
    
    # Create the search query for Google Jobs
    search = GoogleSearch(params)
    results = search.get_dict()
    
    job_listings = []
    
    # Check if results contain job listings
    if "jobs_results" in results:
        for job in results.get("jobs_results", []):
            job_location = job.get("location", "").lower()


            if "austin, tx" in job_location:
                job_dict = {key: value for key, value in job.items()}  # Dynamically create a dictionary from the job's attributes
                job_listings.append(job_dict)

# Now job_listings will contain dictionaries for each job with dynamic keys

    
    if not job_listings:
        return {"message": "No jobs found."}
    
    return job_listings

if __name__ == "__main__":
    flaskApp.run(port=5000, debug=True)
