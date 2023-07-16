from pymongo import MongoClient
from config.settings import mongo_host, mongo_port, mongo_db_name, mongo_collection_name

client = MongoClient(host=mongo_host, port=mongo_port)
db = client[mongo_db_name]
collection = db[mongo_collection_name]
