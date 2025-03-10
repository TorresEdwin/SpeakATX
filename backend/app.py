from flask import Flask, jsonify, request
from sqlalchemy import create_engine, MetaData, Table, select
from sqlalchemy.sql import text
import os
from flask_cors import CORS  # Import Flask-CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_table(table_name):
    password = os.environ.get("SQL_PASS", "uh oh")
    engine = create_engine(f'mysql+pymysql://admin:{password}@database-1.cnkg4y8uupw7.us-east-2.rds.amazonaws.com:3306/SpeakATX')
    connection = engine.connect()
    metadata = MetaData()

    table = Table(table_name, metadata, autoload_with=engine)

    print("Connected to database")

    print(f"\nRetrieving {table_name}")

    select_stmt = select(table)

    table_res = []

    with engine.connect() as connection:
        result = connection.execute(select_stmt)
        for row in result.mappings():
            table_res.append(dict(row))

    connection.close()

    return table_res

# Get all communities
@app.route('/get/communities', methods=['GET'])
def get_communities():
    print("Communities endpoint hit")  # Debugging
    communities = get_table("Communities")
    return jsonify(communities)

# Get a single community by ID
@app.route('/get/communities/id/<int:id>', methods=['GET'])
def get_community_by_id(id):
    communities = get_table("Communities")
    community = next((c for c in communities if c["community_id"] == id), None)
    if community:
        return jsonify(community), 200
    return jsonify({"error": "Community not found"}), 404

# Create a new community
@app.route('/post/communities', methods=['POST'])
def create_community():
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "Missing community name"}), 400

    new_community = {
        "name": data["name"],
        "language": data.get("language", "Unknown"),
        "area": data.get("area", "Unknown"),
        "member_count": data.get("member_count", 0),
        "type": data.get("type", "Public"),
        "about": data.get("about", ""),
        "imageUrl": data.get("imageUrl", ""),
        "url": f"https://speakatx.me/communities/{data['name'].replace(' ', '-').lower()}",
    }
    
    #communities.append(new_community)
    return jsonify(new_community), 201


# Delete a community by ID
@app.route('/delete/communities/<int:id>', methods=['DELETE'])
def delete_community_by_id(id):
    # global communities
    # communities = [c for c in communities if c["id"] != id]
    return jsonify({"message": f"Community with ID {id} deleted successfully"})

# Get all jobs
@app.route('/get/jobs', methods=['GET'])
def get_jobs():
    jobs = get_table("Jobs")
    return jsonify(jobs)

# Get a single job by ID
@app.route('/get/jobs/id/<int:id>', methods=['GET'])
def get_job_by_id(id):
    jobs = get_table("Jobs")
    job = next((j for j in jobs if j["job_id"] == id), None)
    if job:
        return jsonify(job), 200
    return jsonify({"error": "Job not found"}), 404

# Create a new job
@app.route('/post/jobs', methods=['POST'])
def create_job():
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "Missing job name"}), 400

    new_job = {
        "name": data["name"],
        "title": data.get("title", "Unknown"),
        "pay": data.get("pay", 0),
        "language": data.get("language", "Unknown"),
        "area": data.get("area", "Unknown"),
        "imageUrl": data.get("imageUrl", ""),
        "jobUrl": data.get("jobUrl", ""),
    }

    # jobs.append(new_job)
    return jsonify(new_job), 201

# Delete a job by ID
@app.route('/delete/jobs/<int:id>', methods=['DELETE'])
def delete_job_by_id(id):
    # global jobs
    # jobs = [j for j in jobs if j["id"] != id]
    return jsonify({"message": f"Job with ID {id} deleted successfully"})

# Get all translation services
@app.route('/get/translations', methods=['GET'])
def get_translations():
    services = get_table("Services")
    return jsonify(services)

# Get a single translation by ID
@app.route('/get/translations/id/<int:id>', methods=['GET'])
def get_translation_by_id(id):
    services = get_table("Services")
    translation = next((t for t in services if t["service_id"] == id), None)
    if translation:
        return jsonify(translation), 200
    return jsonify({"error": "Service not found"}), 404

# Create a new translation service
@app.route('/post/translations', methods=['POST'])
def create_translation():
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "Missing service name"}), 400

    new_translation = {
        "name": data["name"],
        "rating": data.get("rating", "N/A"),
        "language": data.get("language", "Unknown"),
        "area": data.get("area", "Unknown"),
        "price": data.get("price", 0),
        "pricing": data.get("pricing", "Unknown"),
        "website": data.get("website", ""),
        "mapImageUrl": data.get("mapImageUrl", ""),
        "imageUrl": data.get("imageUrl", ""),
        "mapUrl": data.get("mapUrl", ""),
    }

    # translations.append(new_translation)
    return jsonify(new_translation), 201

# Delete a translation service by ID
@app.route('/delete/translations/<int:id>', methods=['DELETE'])
def delete_translation_by_id(id):
    # global translations
    # translations = [t for t in translations if t["id"] != id]
    return jsonify({"message": f"Translation service with ID {id} deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True)