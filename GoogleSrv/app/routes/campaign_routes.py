from flask import Blueprint, request
from app.google_ads import create_campaign
from app.exceptions import handle_google_ads_exception

campaign_routes = Blueprint('campaign_routes', __name__)

@campaign_routes.route('/campaigns', methods=['POST'])
def create_campaign_route():
    campaign_data = request.json

    try:
        create_campaign(campaign_data)
        return {'message': 'Campaign created successfully'}
    except Exception as ex:
        handle_google_ads_exception(ex)
        return {'error': 'Failed to create campaign'}
