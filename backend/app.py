from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample data (acts as a mock database)
communities = [
    {
        "name": "Tech Enthusiasts",
        "language": "English",
        "area": "Online",
        "member_count": 1200,
        "type": "Public",
        "about": "A place for tech lovers.",
        "imageUrl": "https://example.com/tech_image.jpg",
        "url": "https://speakatx.me/communities/tech-enthusiasts"
    },
    {
        "name": "Spanish Learners",
        "language": "Spanish",
        "area": "Austin, TX",
        "member_count": 500,
        "type": "Private",
        "about": "A group for Spanish learners.",
        "imageUrl": "https://example.com/spanish_image.jpg",
        "url": "https://speakatx.me/communities/spanish-learners"
    }
]

# Get all communities
@app.route('/communities', methods=['GET'])
def get_communities():
    print("Communities endpoint hit")  # Debugging
    return jsonify(communities)

# Get a single community by name
@app.route('/communities/<string:name>', methods=['GET'])
def get_community(name):
    community = next((c for c in communities if c["name"].lower() == name.lower()), None)
    if community:
        return jsonify(community), 200
    return jsonify({"error": "Community not found"}), 404

# Create a new community
@app.route('/communities', methods=['POST'])
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
        "url": f"https://speakatx.me/communities/{data['name'].replace(' ', '-').lower()}"
    }
    
    communities.append(new_community)
    return jsonify(new_community), 201

if __name__ == '__main__':
    app.run(debug=True)