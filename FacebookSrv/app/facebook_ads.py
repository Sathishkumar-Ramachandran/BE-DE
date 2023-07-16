import request
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.campaign import Campaign
from facebook_business.adobjects.adset import AdSet
from facebook_business.adobjects.ad import Ad



facebookads_client = None

def get_facebookads_client():
    global facebookads_client
    if facebookads_client is None:
        credentials = get_facebookads_credentials()
        facebookads_client = FacebookAdsApi.load_from_dict(credentials).init()
    return facebookads_client


def create_campaign():
    # Parse request data and create a new campaign
    campaign_name = request.json['name']
    campaign_objective = request.json['objective']

    # Create the campaign
    campaign = Campaign(parent_id='<Your Ad Account ID>')
    campaign[Campaign.Field.name] = campaign_name
    campaign[Campaign.Field.objective] = campaign_objective
    campaign.remote_create(params={
        'status': Campaign.Status.paused,
    })

    # Parse request data and create a new ad set
    ad_set_name = request.json['ad_set_name']
    targeting = request.json['targeting']
    daily_budget = request.json['daily_budget']

    # Create the ad set
    ad_set = AdSet(parent_id='<Your Ad Account ID>')
    ad_set[AdSet.Field.name] = ad_set_name
    ad_set[AdSet.Field.campaign_id] = campaign['id']
    ad_set[AdSet.Field.targeting] = targeting
    ad_set[AdSet.Field.daily_budget] = daily_budget
    ad_set.remote_create(params={
        'status': AdSet.Status.paused,
    })

    return {
        'campaign_id': campaign['id'],
        'ad_set_id': ad_set['id']
    }, 201

def create_ad_set(campaign_id):
    # Create an ad set
    ad_set = AdSet(parent_id=ad_account_id)
    ad_set[AdSet.Field.name] = 'My Ad Set'
    ad_set[AdSet.Field.campaign_id] = campaign_id
    ad_set[AdSet.Field.targeting] = {
        'age_min': 18,
        'age_max': 65,
        'geo_locations': {
            'countries': ['US'],
        },
    }
    ad_set[AdSet.Field.daily_budget] = 1000
    ad_set[AdSet.Field.bid_strategy] = AdSet.BidStrategy.value_link_clicks
    ad_set[AdSet.Field.billing_event] = AdSet.BillingEvent.impressions
    ad_set.remote_create(params={
        'status': AdSet.Status.paused,
    })

    return ad_set['id']

def create_ad(ad_set_id):
    # Create an ad
    ad = Ad(parent_id=ad_account_id)
    ad[Ad.Field.name] = 'My Ad'
    ad[Ad.Field.adset_id] = ad_set_id
    ad[Ad.Field.creative] = {
        'object_story_spec': {
            'page_id': '<Your Facebook Page ID>',
            'link_data': {
                'link': '<Your Destination URL>',
                'message': 'Check out this awesome ad!',
                'call_to_action': {
                    'type': 'LEARN_MORE',
                    'value': {
                        'link': '<Your Destination URL>',
                    }
                }
            }
        }
    }
    ad.remote_create(params={
        'status': Ad.Status.paused,
    })

    return ad['id']

# Example usage:
campaign_id = '<Your Campaign ID>'
ad_set_id = create_ad_set(campaign_id)
ad_id = create_ad(ad_set_id)

print(f"Ad Set ID: {ad_set_id}")
print(f"Ad ID: {ad_id}")