from pymongo import MongoClient
#from config.settings import mongo_host, mongo_db_name, mongo_collection_name

client = MongoClient(
    host="mongodb+srv://teamproject:Sathish123@cluster0.wqp3wtc.mongodb.net/?retryWrites=true&w=majority"
    )
db = client["test"]
collection = db["mediasetupschemastrcutures"]

# Implement additional database operations as needed
