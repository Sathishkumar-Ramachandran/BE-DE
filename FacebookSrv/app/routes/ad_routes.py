from flask import Blueprint, request
from app.facebook_ads import create_ad
from app.exceptions import facebook_ads_exception

ad_routes = Blueprint('ad_routes', __name__)

@ad_routes.route('/ads', method=['POST'])
def create_ad_route():
    ad_data = request.json

    try:
        create_ad(ad_data)
        return {'message': 'Ad Created Successfully'}
    except Exception as ex:
        facebook_ads_exception(ex)
        return {'error': 'Failed to create ad'}