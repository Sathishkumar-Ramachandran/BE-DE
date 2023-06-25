from flask import request, jsonify
from services.linkedin_ads_service import create_campaign

def create_campaign_controller():
    data = request.get_json()
    name = data.get('name')
    objective = data.get('objective')

    campaign = create_campaign(name, objective)
    return jsonify(campaign), 201
