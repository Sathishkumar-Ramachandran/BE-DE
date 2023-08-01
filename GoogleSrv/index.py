from flask import Flask
from confluent_kafka import Consumer, KafkaError
import threading
import json
from app.routes.campaign_routes import campaign_routes
from app.routes.ad_routes import ad_routes
from app.routes.adgroup_routes import adgroup_routes
from app.google_ads import create_ad
from app.google_ads import create_ad_group
from app.google_ads import create_campaign

app = Flask(__name__)
app.register_blueprint(campaign_routes)
app.register_blueprint(ad_routes)
app.register_blueprint(adgroup_routes)

KAFKA_TOPIC = 'googleAd'
KAFKA_BOOTSTRAP_SERVERS = 'localhost:9092'

def consume_messages():
    conf = {
        'bootstrap.servers': KAFKA_BOOTSTRAP_SERVERS,
        'group.id': None,
        'auto.offset.reset': 'earliest',
        'enable.auto.commit': True,
        'value.deserializer': lambda v: json.loads(v.decode('utf-8'))
    }

    consumer = Consumer(conf)
    consumer.subscribe([KAFKA_TOPIC])

    while True:
        msg = consumer.poll(1.0)

        if msg is None:
            continue

        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                continue
            else:
                print(f'Error occurred: {msg.error().str()}')
                break

        topic = msg.topic()
        value = msg.value()

        if topic == 'campaign':
            create_campaign(value)
        elif topic == 'adgroup':
            create_ad_group(value)
        elif topic == 'ad':
            create_ad(value)
        else:
            print(f'Unknown topic: {topic}')

    consumer.close()

if __name__ == '__main__':
    threading.Thread(target=consume_messages).start()
    app.run(debug=True)
