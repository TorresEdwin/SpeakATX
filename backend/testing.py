from sqlalchemy import create_engine, MetaData, Table, select
from sqlalchemy.sql import text
import os


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

print(get_table("Jobs"))