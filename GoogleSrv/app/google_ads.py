import requests

from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from config.settings import get_google_ads_credentials

googleads_client = None

def get_googleads_client():
    global googleads_client
    companyId = 12345
    if googleads_client is None:
        credentials = get_google_ads_credentials(companyId)
        googleads_client = GoogleAdsClient.load_from_dict(credentials, version='v13')
    return googleads_client

def create_campaign(campaign_data):
    client = get_googleads_client()
    customer_id = client.login_customer_id  
    # Replace with your Google Ads customer ID

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
        raise Exception('Failed to create campaign budget') from ex

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
        raise Exception('Failed to create campaign') from ex


def create_ad(ad_data):
    # Initialize Google Ads client
    google_ads_client = get_google_ads_client()

    # Extract ad data
    ad_name = ad_data['name']
    ad_text = ad_data['text']
    ad_url = ad_data['url']
    ad_group_id = ad_data['ad_group_id']

    try:
        # Create an ad
        ad_service = google_ads_client.service.ad
        ad_operation = ad_service.create_ad(
            customer_id=google_ads_client.customer_id,
            ad={
                'name': ad_name,
                'final_urls': [ad_url],
                'expanded_text_ad': {
                    'headline_part1': ad_text,
                    'headline_part2': '',
                    'description': ''
                },
                'status': 'PAUSED',
                'ad_group': ad_service.ad_group_path(
                    google_ads_client.customer_id, ad_group_id
                )
            }
        )
        ad_response = google_ads_client.service.ad.mutate_ads(
            customer_id=google_ads_client.customer_id,
            operations=[ad_operation]
        )

        # Get the resource name of the created ad
        ad_resource_name = ad_response.results[0].resource_name

        return ad_resource_name
    except GoogleAdsException as ex:
        handle_googleads_exception(ex)

def create_ad_group(adgroup_data):
    # Initialize Google Ads client
    google_ads_client = get_google_ads_client()

    # Extract ad group data
    ad_group_name = adgroup_data['name']
    campaign_id = adgroup_data['campaign_id']

    try:
        # Create an ad group
        ad_group_service = google_ads_client.service.ad_group
        ad_group_operation = ad_group_service.create_ad_group(
            customer_id=google_ads_client.customer_id,
            ad_group={
                'name': ad_group_name,
                'campaign': ad_group_service.campaign_path(
                    google_ads_client.customer_id, campaign_id
                ),
                'type': 'SEARCH_STANDARD',
                'cpc_bid_micros': 1000000  # Set your desired CPC bid here
            }
        )
        ad_group_response = google_ads_client.service.ad_group.mutate_ad_groups(
            customer_id=google_ads_client.customer_id,
            operations=[ad_group_operation]
        )

        # Get the resource name of the created ad group
        ad_group_resource_name = ad_group_response.results[0].resource_name

        return ad_group_resource_name
    except GoogleAdsException as ex:
        handle_googleads_exception(ex)

def get_google_ads_client():
    # Retrieve Google Ads credentials from your MongoDB or any other configuration source
    credentials = get_google_ads_credentials()

    # Create a Google Ads client instance
    google_ads_client = GoogleAdsClient.load_from_dict(credentials, version='v13')

    return google_ads_client

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
