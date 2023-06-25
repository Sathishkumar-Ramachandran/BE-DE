from flask import Flask
from kafka import KafkaConsumer
import threading
import json
from app.routes.campaign_routes import campaign_routes
from app.routes.ad_routes import ad_routes
from app.routes.adgroup_routes import adgroup_routes
from app.google_ads import create_ad
from app.google_ads import create_ad_group
from app.google_ads import create_campaign 
# from kafka.producer import send_message

app = Flask(__name__)
app.register_blueprint(campaign_routes)
app.register_blueprint(ad_routes)
app.register_blueprint(adgroup_routes)

KAFKA_TOPIC = 'googleAd'
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
        elif topic == 'adgroup':
            create_ad_group(value)
        elif topic == 'ad':
            create_ad(value)
        else:
            print(f'Unknown topic: {topic}')

if __name__ == '__main__':
    threading.Thread(target=consume_messages).start()
    app.run(debug=True)
