import threading
from confluent_kafka import Consumer, KafkaError


def kafka_consumer():
    consumer = Consumer({
        'bootstrap.servers': 'localhost:9092',
        'group.id': 'your_consumer_group_id',
        'auto.offset.reset': 'earliest'
    })
    consumer.subscribe(['googleAd'])

    while True:
        message = consumer.poll(1.0)

        if message is None:
            continue

        if message.error():
            if message.error().code() == KafkaError._PARTITION_EOF:
                continue
            else:
                print('Error occurred: {}'.format(message.error().str()))
                continue

        topic = message.topic()
        partition = message.partition()
        offset = message.offset()
        value = message.value().decode('utf-8')

        print('Received message: Topic={}, Partition={}, Offset={}, Value={}'.format(topic, partition, offset, value))

    consumer.close()


# Create a separate thread for the Kafka consumer
consumer_thread = threading.Thread(target=kafka_consumer)

# Start the consumer thread
consumer_thread.start()

# The main thread can continue running or perform other tasks while the consumer thread is active

# You can join the consumer thread to the main thread if you want the main thread to wait until the consumer thread finishes
# consumer_thread.join()
