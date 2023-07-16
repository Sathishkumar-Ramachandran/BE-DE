from flask import Blueprint, request
from app.facebook_ads import create_ad_set
from app.exceptions import facebook_ads_exception


adset_routes = Blueprint('adset_routes', __name__)

@adset_routes.route('/adset', method=['POST'])
def create_adset_route():
    adset_data = request.json
    try:
        create_ad_set(adset_data)
        return {'message': 'AdSet Created Successfully'}
    except Exception as ex:
        facebook_ads_exception(ex)
        return {'error': 'Failed to Create AdSet'}