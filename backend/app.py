from flask import Flask, jsonify, request
from sqlalchemy import create_engine, MetaData, Table, select
from sqlalchemy.sql import text
import os

app = Flask(__name__)

# Sample data (acts as a mock database)
# communities = [
#     {
#         "name": "Tech Enthusiasts",
#         "language": "English",
#         "area": "Online",
#         "member_count": 1200,
#         "type": "Public",
#         "about": "A place for tech lovers.",
#         "imageUrl": "https://example.com/tech_image.jpg",
#         "url": "https://speakatx.me/communities/tech-enthusiasts",
#         "id": 1
#     },
#     {
#         "name": "Spanish Learners",
#         "language": "Spanish",
#         "area": "Austin, TX",
#         "member_count": 500,
#         "type": "Private",
#         "about": "A group for Spanish learners.",
#         "imageUrl": "https://example.com/spanish_image.jpg",
#         "url": "https://speakatx.me/communities/spanish-learners",
#         "id": 2
#     }
# ]

# jobs = [
#     { 
#         "name": "Chick-Fil-A", 
#         "title": "Team Member", 
#         "pay": 13, 
#         "language": "Spanish", 
#         "area": "Austin", 
#         "imageUrl": "https://download.logo.wine/logo/Chick-fil-A/Chick-fil-A-Logo.wine.png",
#         "jobUrl": "https://www.indeed.com/viewjob?jk=9e4a110fd7f3bae2&from=shareddesktop",
#         "id": 1
#     },
#     { 
#         "name": "Family Tree Private Care", 
#         "title": "Care Giver", 
#         "pay": 17, 
#         "language": "Vietnamese", 
#         "area": "Austin", 
#         "imageUrl": "https://familytreecares.com/wp-content/uploads/2022/05/logo.png",
#         "jobUrl": "https://www.indeed.com/cmp/Family-Tree-Private-Care/jobs?jk=c1b30935fa3fd2ed&start=0&clearPrefilter=1",
#         "id": 2
#     },
#     { 
#         "name": "Tso Chinese", 
#         "title": "Store Manager", 
#         "pay": 34, 
#         "language": "Chinese", 
#         "area": "Austin", 
#         "imageUrl": "https://speakatx-images.s3.us-east-2.amazonaws.com/jobs_page/tso_chinese.png",
#         "jobUrl": "https://tsochinese.com/jobs",
#         "id": 3
#     }
# ]
# translations = [
#     { 
#         "name": "Vietnamese Translations Consulting", 
#         "rating": "4.8", 
#         "language": "Vietnamese, English", 
#         "area": "Downtown Austin", 
#         "price": 40,
#         "pricing": "Budget",
#         "website": "https://www.yelp.com/biz/vietnamese-translations-consulting-mimi-tran-austin?osq=vietnamese+translator&override_cta=Get+pricing+%26+availability",
#         "mapImageUrl": "https://img.freepik.com/premium-vector/map-city-vector-illustration_276184-55.jpg",
#         "imageUrl": "https://img.p.mapq.st/?url=https://s3-media0.fl.yelpcdn.com/bphoto/tfAnBVTl7oT-N5OsK_XW1g/l.jpg?w=3840&q=75",
#         "mapUrl": "https://www.google.com/maps/place/1512+W+Howard+Ln,+Austin,+TX+78728/data=!4m2!3m1!1s0x8644ceed235c218b:0xb947ff4a74563760?sa=X&ved=1t:242&ictx=111",
#         "id": 1
#     },
#     { 
#         "name": "Texas Tower Passport and Visa Services", 
#         "rating": "4.5", 
#         "language": "Spanish, English", 
#         "area": "North Austin", 
#         "price": 25,
#         "pricing": "Budget",
#         "website": "https://www.yelp.com/biz/texas-tower-passport-and-visa-services-houston?override_cta=Get+pricing+%26+availability",
#         "mapImageUrl": "https://cdn.prod.website-files.com/5c29380b1110ec92a203aa84/66e5ce469b48938aa34d8684_Google%20Maps%20-%20Compressed.jpg",
#         "imageUrl": "https://s3-media0.fl.yelpcdn.com/bphoto/yqcQ1Ot99T2XNqxBtBGAXg/o.jpg",
#         "mapUrl": "https://www.google.com/maps?client=firefox-b-1-d&sca_esv=0c36c686c589dc21&biw=1728&bih=825&output=search&q=Texas+Tower+Passport+%26+Visa+Services&source=lnms&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBjnSuuKZNj-6zieDk_gkn6CyymgG_tEVFNWvBwycIom9HlR-mPw3LjRRj22WCaNNYiY26Pyg_mYsiBrfH3XTveKfVF9AnXBeF4A8To7FVGsxz41nDkXayYDZMloNfG-q_Nsiio46-BtjDeMRYZJnAoBGIjBwJQTuRV_Bdja0R19eL9CMDw&entry=mc&ved=1t:200715&ictx=111",
#         "id": 2
#     },
#     { 
#         "name": "Marvelous Mandarin", 
#         "rating": "4.3", 
#         "language": "Chinese, English", 
#         "area": "North Austin", 
#         "price": 40,
#         "pricing": "Budget",
#         "mapImageUrl": "https://speakatx-images.s3.us-east-2.amazonaws.com/services_page/marvelous_mandarin_MAP.png",
#         "website": "https://www.marvelous-mandarin.com/",
#         "mapUrl": "https://www.google.com/maps/place/Marvelous+Mandarin/@30.365534,-97.7539841,16z/data=!3m2!4b1!5s0x8644cb0ce6c052e5:0x3cb47319db6bb03!4m6!3m5!1s0x8644cb0ce896b5e5:0x947d36c6a29c3ade!8m2!3d30.3655341!4d-97.7491132!16s%2Fg%2F1th1vfxy?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D",
#         "imageUrl": "https://speakatx-images.s3.us-east-2.amazonaws.com/services_page/marvelous_mandarin_LOGO.png",
#         "id": 3
#     }
# ]

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
        for row in result:
            result.append(row)

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
        "id": data.get("id", "-1"),
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
        "id": data.get("id", "-1"),
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
        "id": data.get("id", "-1"),
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