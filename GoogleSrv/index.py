from flask import Flask, request
import threading
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from pymongo import MongoClient

app = Flask(__name__)

#googleads_client = GoogleAdsClient.load_from_storage(version='v13')

mongo_host = 'localhost'
mongo_port = 27017
mongo_db_name = 'your_database_name'
mongo_collection_name = 'your_collection_name'

def get_google_ads_credentials():
    # Connect to MongoDB
    client = MongoClient(host=mongo_host, port=mongo_port)
    db = client[mongo_db_name]
    collection = db[mongo_collection_name]

    # Retrieve the details from the collection
    document = collection.find_one()

    # Extract the required fields
    developer_token = document['developer_token']
    client_id = document['client_id']
    client_secret = document['client_secret']
    refresh_token = document['refresh_token']
    login_customer_id = document['login_customer_id']

    # Return the credentials as a dictionary
    return {
        'developer_token': developer_token,
        'client_id': client_id,
        'client_secret': client_secret,
        'refresh_token': refresh_token,
        'login_customer_id': login_customer_id
    }




@app.route('/campaigns', methods=['POST'])
def create_campaign():
    campaign_data = request.json

    try:
        CreateCampaign(googleads_client, campaign_data)
        return {'message': 'Campaign created successfully'}
    except GoogleAdsException as ex:
        handle_googleads_exception(ex)
        return {'error': 'Failed to create campaign'}

def CreateCampaign(client, campaign_data):
    customer_id = 'INSERT_CUSTOMER_ID'  # Replace with your Google Ads customer ID

    campaign_budget_service = client.get_service("CampaignBudgetService")
    campaign_service = client.get_service("CampaignService")

    # Create a campaign budget
    campaign_budget_operation = client.get_type("CampaignBudgetOperation")
    campaign_budget = campaign_budget_operation.create
    campaign_budget.name = campaign_data['name']
    campaign_budget.delivery_method = client.enums.BudgetDeliveryMethodEnum.STANDARD
    campaign_budget.amount_micros = campaign_data['budget']

    try:
        campaign_budget_response = campaign_budget_service.mutate_campaign_budgets(
            customer_id=customer_id, operations=[campaign_budget_operation]
        )
    except GoogleAdsException as ex:
        handle_googleads_exception(ex)

    # Create a campaign
    campaign_operation = client.get_type("CampaignOperation")
    campaign = campaign_operation.create
    campaign.name = campaign_data['name']
    campaign.advertising_channel_type = client.enums.AdvertisingChannelTypeEnum.SEARCH
    campaign.status = client.enums.CampaignStatusEnum.PAUSED
    campaign.manual_cpc.enhanced_cpc_enabled = True
    campaign.campaign_budget = campaign_budget_response.results[0].resource_name
    campaign.start_date = campaign_data['startDate']
    campaign.end_date = campaign_data['endDate']

    try:
        campaign_response = campaign_service.mutate_campaigns(
            customer_id=customer_id, operations=[campaign_operation]
        )
        print(f"Created campaign {campaign_response.results[0].resource_name}.")
    except GoogleAdsException as ex:
        handle_googleads_exception(ex)

def handle_googleads_exception(exception):
    print(
        f'Request with ID "{exception.request_id}" failed with status '
        f'"{exception.error.code().name}" and includes the following errors:'
    )
    for error in exception.failure.errors:
        print(f'\tError with message "{error.message}".')
        if error.location:
            for field_path_element in error.location.field_path_elements:
                print(f"\t\tOn field: {field_path_element.field_name}")
    raise Exception('Google Ads exception occurred')

if __name__ == '__main__':
    threading.Thread(target=app.run).start()
