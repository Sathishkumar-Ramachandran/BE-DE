from flask import Blueprint, request
from app.google_ads import create_ad_group
from app.exceptions import handle_google_ads_exception

adgroup_routes = Blueprint('adgroup_routes', __name__)

@adgroup_routes.route('/adgroups', methods=['POST'])
def create_adgroup_route():
    adgroup_data = request.json

    try:
        create_ad_group(adgroup_data)
        return {'message': 'Ad Group created successfully'}
    except Exception as ex:
        handle_google_ads_exception(ex)
        return {'error': 'Failed to create ad group'}
