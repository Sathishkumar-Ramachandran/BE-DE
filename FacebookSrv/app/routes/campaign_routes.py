from flask import Blueprint, request
from app.facebook_ads import create_campaign
from app.exceptions import facebook_ads_exception


campaign_routes = Blueprint('campaign_routes', __name__)

@campaign_routes.route('/campaigns', methods=['POST'])
def create_campaign_route():
    campaign_data = request.json
    try:
        create_campaign(campaign_data)
        return {'message': 'Campaign created Successfully'}
    except Exception as ex:
        facebook_ads_exception(ex)
        return {'error' : 'Failed to Create Campaign'}