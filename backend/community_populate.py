import json
from sqlalchemy import create_engine, MetaData, Table, select
from sqlalchemy.sql import text
import os

def populate_database(results):
    password = os.environ.get("SQL_PASS", "uh oh")
    engine = create_engine(f'mysql+pymysql://admin:{password}@database-1.cnkg4y8uupw7.us-east-2.rds.amazonaws.com:3306/SpeakATX')
    connection = engine.connect()
    metadata = MetaData()

    table = Table('Communities', metadata, autoload_with=engine)

    print("Connected to database")

    print(f"Found columns: {[c.name for c in table.columns]}")

    connection.execute(table.delete())
    connection.commit()

    for item in results:

        com_type = "culture"

       

        learn_flags = ["learn"]

        if any(substring in item["description"].lower() for substring in learn_flags):
            com_type = "learning"

        business_flags = ["business", "engineer", "software", "career"]

        if any(substring in item["description"].lower() for substring in business_flags):
            com_type = "business"


        insert_stmt = table.insert().values(
            name=item["name"].replace("/", "-"),
            member_count=item["member_count"],
            language=item["language"],
            area=item["location"],
            type=com_type,
            imageUrl=item["picture"],
            website=item["url"],
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

def join_duplicates(results):
    combined = {}

    for item in results:
        if item["name"] in combined:
            combined[item["name"]]["language"] += ", " + item["language"]
        else:
            combined[item["name"]] = item
    
    return combined.values()

if __name__ == "__main__":
    res = []
    with open('meetup_groups.json', 'r', encoding='utf-8', errors='ignore') as file:
        data = json.load(file)
        for section in data:
            res.extend(section)
        populate_database(join_duplicates(res))