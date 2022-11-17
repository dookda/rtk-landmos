import psycopg2 as pg2

conn = {
    "dbName": "geodb",
    "dbUser": "postgres",
    "dbPass": "1234",
    "dbHost": "pymodis_postgis",
    "dbPort": "5432",
}

host = conn["dbHost"]
db = conn["dbName"]
username = conn["dbUser"]
password = conn["dbPass"]
port = conn["dbPort"]
pg = pg2.connect(database=db, user=username,
                 password=password, host=host, port=port)
