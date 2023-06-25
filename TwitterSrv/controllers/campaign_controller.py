from flask import Blueprint, jsonify, request
from app.services.campaign_service import CampaignService

campaign_controller = Blueprint('campaign_controller', __name__)
campaign_service = CampaignService()

@campaign_controller.route('/campaigns', methods=['GET'])
def get_campaigns():
    campaigns = campaign_service.get_campaigns()
    return jsonify(campaigns), 200

@campaign_controller.route('/campaigns', methods=['POST'])
def create_campaign():
    data = request.json
    campaign = campaign_service.create_campaign(data)
    return jsonify(campaign), 201

@campaign_controller.route('/campaigns/<campaign_id>', methods=['PUT'])
def update_campaign(campaign_id):
    data = request.json
    campaign = campaign_service.update_campaign(campaign_id, data)
    return jsonify(campaign), 200

# Other routes and controller methods for campaign operations
