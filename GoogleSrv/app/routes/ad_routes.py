from flask import Blueprint, request
from app.google_ads import create_ad
from app.exceptions import handle_google_ads_exception

ad_routes = Blueprint('ad_routes', __name__)

@ad_routes.route('/ads', methods=['POST'])
def create_ad_route():
    ad_data = request.json

    try:
        create_ad(ad_data)
        return {'message': 'Ad created successfully'}
    except Exception as ex:
        handle_google_ads_exception(ex)
        return {'error': 'Failed to create ad'}
