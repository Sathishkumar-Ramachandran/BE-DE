from flask import request, jsonify
from services.facebook_ads_service import create_ad_set

def create_ad_set_controller():
    data = request.get_json()
    name = data.get('name')
    campaign_id = data.get('campaign_id')
    targeting = data.get('targeting')

    ad_set = create_ad_set(name, campaign_id, targeting)
    return jsonify(ad_set), 201
