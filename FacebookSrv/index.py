from flask import Flask
from kafka import KafkaConsumer
import threading
import json

#File Imports
from app.routes.campaign_routes import campaign_routes
from app.routes.ad_routes import ad_routes
from app.routes.adset_routes import adset_routes
from app.facebook_ads import create_ad
from app.facebook_ads import create_ad_set
from app.facebook_ads import create_campaign


#Facebook Imports
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.campaign import Campaign
from facebook_business.adobjects.adset import AdSet
from facebook_business.adobjects.ad import Ad
from facebook_business.adobjects.adcreative import AdCreative
from facebook_business.adobjects.adcreativelinkdata import AdCreativeLinkData
from facebook_business.adobjects.adcreativeobjectstoryspec import AdCreativeObjectStorySpec

app = Flask(__name__)
app.register_blueprint(campaign_routes)
app.register_blueprint(ad_routes)
app.register_blueprint(adset_routes)

KAFKA_TOPIC = 'facebookAd'
KAFKA_BOOTSTRAP_SERVERS = 'localhost:9092'

def consume_messages():
    consumer = KafkaConsumer(
        KAFKA_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        value_deserializer=lambda v: json.loads(v.decode('utf-8')),
        auto_offset_reset='earliest',
        group_id=None
    )

    for message in consumer:
        topic = message.topic
        value = message.value

        if topic == 'campaign':
            create_campaign(value)
        elif topic == 'adset':
            create_ad_set(value)
        elif topic == 'ad':
            create_ad(value)
        else:
            print(f'Unknown topic: {topic}')

if __name__ == '__main__':
    threading.Thread(target=consume_messages).start()
    app.run(debug=True)
