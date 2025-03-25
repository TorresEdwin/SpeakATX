from flask import Flask, jsonify, request
from sqlalchemy import create_engine, MetaData, Table, select, func
from sqlalchemy.sql import text
from sqlalchemy.pool import NullPool
import os
from flask_cors import CORS  # Import Flask-CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

password = os.environ.get("SQL_PASS", "uh oh")
engine = create_engine(
    f'mysql+pymysql://admin:{password}@database-1.cnkg4y8uupw7.us-east-2.rds.amazonaws.com:3306/SpeakATX',
    poolclass=NullPool  # Disables connection pooling (for small apps, but you may enable it)
)
metadata = MetaData()

def get_table(table_name, filters=None):
    table = Table(table_name, metadata, autoload_with=engine)
    select_stmt = select(table)

    if filters:
        select_stmt = select_stmt.where(filters)

    with engine.connect() as connection:
        result = connection.execute(select_stmt)
        return [dict(row) for row in result.mappings()]

def get_table_paginated(table_name, page=1, per_page=10, filters=None):
    table = Table(table_name, metadata, autoload_with=engine)
    query = select(table)

    offset = (page - 1) * per_page

    count_query = select(func.count()).select_from(table)
    if filters:
        query = query.where(filters)

    query = query.limit(per_page).offset(offset)

    with engine.connect() as connection:
        result = connection.execute(query)
        total = connection.execute(count_query).scalar()

        items = [dict(row) for row in result.mappings()]

        total_pages = (total + per_page - 1) // per_page # ceil
    
        return {
            "items": items,
            "pagination": {
                "page": page,
                "per_page": per_page,
                "total_items": total,
                "total_pages": total_pages,
                "has_next": page < total_pages,
                "has_prev": page > 1
            }
        }
    
    return {}

def get_pagination_params():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    page = max(1, page)
    per_page = min(max(1, per_page), 100)
    
    return page, per_page

def get_community_params():
    name = request.args.get('name', '', type=str)
    language = request.args.get('lang', '', type=str)
    area = request.args.get('area', '', type=str)
    count = request.args.get('count', 1, type=int)
    type = request.args.get('type', '', type=str)

    return name, language, area, count, type

def get_service_params():
    name = request.args.get('name', '', type=str)
    language = request.args.get('lang', '', type=str)
    area = request.args.get('area', '', type=str)
    rating = request.args.get('rating', 1, type=int)
    price = request.args.get('price', 1, type=int)

    return name, language, area, rating, price

def get_job_params():
    name = request.args.get('name', '', type=str)
    language = request.args.get('lang', '', type=str)
    area = request.args.get('area', '', type=str)
    pay = request.args.get('pay', 1, type=int)
    role = request.args.get('role', '', type=str)

    return name, language, area, pay, role


# Get all communities
@app.route('/get/communities', methods=['GET'])
def get_communities():
    page, per_page = get_pagination_params()
    name, language, area, count, type = get_community_params()
    result = get_table_paginated("Communities", page, per_page)
    return jsonify(result)

# Get a single community by ID
@app.route('/get/communities/id/<int:id>', methods=['GET'])
def get_community_by_id(id):
    communities = get_table("Communities")
    community = next((c for c in communities if c["community_id"] == id), None)
    if community:
        return jsonify(community), 200
    return jsonify({"error": "Community not found"}), 404

# Get all jobs
@app.route('/get/jobs', methods=['GET'])
def get_jobs():
    page, per_page = get_pagination_params()
    name, language, area, pay, role = get_job_params()
    result = get_table_paginated("Jobs", page, per_page)
    return jsonify(result)

# Get a single job by ID
@app.route('/get/jobs/id/<int:id>', methods=['GET'])
def get_job_by_id(id):
    jobs = get_table("Jobs")
    job = next((j for j in jobs if j["job_id"] == id), None)
    if job:
        return jsonify(job), 200
    return jsonify({"error": "Job not found"}), 404

# Get all translation services
@app.route('/get/translations', methods=['GET'])
def get_translations():
    page, per_page = get_pagination_params()
    name, language, area, rating, price = get_service_params()
    result = get_table_paginated("Services", page, per_page)
    return jsonify(result)

# Get a single translation by ID
@app.route('/get/translations/id/<int:id>', methods=['GET'])
def get_translation_by_id(id):
    services = get_table("Services")
    translation = next((t for t in services if t["service_id"] == id), None)
    if translation:
        return jsonify(translation), 200
    return jsonify({"error": "Service not found"}), 404

@app.route('/health', methods=['GET'])
def health_check():
    return 'It is OK', 200

if __name__ == '__main__':
    app.run(debug=False)