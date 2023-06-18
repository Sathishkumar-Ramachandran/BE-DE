import threading
from kafka import KafkaConsumer
from index import app

from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException



def create_campaign(campaign_data):
    # Logic for creating a campaign using the campaign_data
    client = GoogleAdsClient.load_from_storage("path/to/google_ads.yaml")
    customer_id = "your_customer_id"

    # Create a campaign operation
    campaign_operation = client.get_type("CampaignOperation")
    campaign = campaign_operation.create
    campaign.name = campaign_data['name']
    campaign.status = client.get_type("CampaignStatusEnum").PAUSED
    campaign.advertising_channel_type = client.get_type("AdvertisingChannelTypeEnum").SEARCH

    # Set campaign budget
    campaign_budget = campaign_operation.create.campaign_budget
    campaign_budget.name = campaign_data['name'] + " Budget"
    campaign_budget.delivery_method = client.get_type("BudgetDeliveryMethodEnum").STANDARD
    campaign_budget.amount_micros = campaign_data['budget'] * 1000000

    # Set targeting, ad groups, ads, etc.
    # Add more code here to handle targeting, ad groups, ads, etc.

    # Create the campaign
    campaign_service = client.get_service("CampaignService")
    response = campaign_service.mutate_campaigns(
        customer_id=customer_id,
        operations=[campaign_operation]
    )

    # Get the created campaign resource name
    created_campaign_resource_name = response.results[0].resource_name
    print("Campaign created with resource name:", created_campaign_resource_name)


def kafka_consumer():
    consumer = KafkaConsumer(
        'googleAd',
        bootstrap_servers='localhost:9092',
        group_id='your_consumer_group_id',
        auto_offset_reset='earliest'
    )

    for message in consumer:
        topic = message.topic
        partition = message.partition
        offset = message.offset
        value = message.value.decode('utf-8')

        print('Received message: Topic={}, Partition={}, Offset={}, Value={}'.format(
            topic, partition, offset, value
        ))

        if topic == 'googleAd' and value == 'campaign':
            campaign_data = {
                # Provide the necessary campaign data
                'name': 'My Campaign',
                'budget': 1000,
                'target_audience': 'Some audience',
                # Add more campaign details as needed
            }
            create_campaign(campaign_data)

    consumer.close()


@app.route('/campaign', methods=['POST'])
def handle_campaign_creation():
    # Handle the incoming request to create a campaign
    campaign_data = {
        # Extract the campaign data from the request as needed
        'name': 'My Campaign',
        'budget': 1000,
        'target_audience': 'Some audience',
        # Add more campaign details as needed
    }
    create_campaign(campaign_data)

    return 'Campaign creation request received'


if __name__ == '__main__':
    # Create a separate thread for the Kafka consumer
    consumer_thread = threading.Thread(target=kafka_consumer)

    # Start the consumer thread
    consumer_thread.start()

    # Run the Flask application
    app.run()