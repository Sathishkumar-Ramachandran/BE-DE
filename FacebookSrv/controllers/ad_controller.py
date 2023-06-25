from flask import request, jsonify
from services.facebook_ads_service import create_ad

def create_ad_controller():
    data = request.get_json()
    name = data.get('name')
    ad_set_id = data.get('ad_set_id')
    creative = data.get('creative')

    ad = create_ad(name, ad_set_id, creative)
    return jsonify(ad), 201
