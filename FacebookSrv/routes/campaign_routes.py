from flask import Blueprint
from controllers.campaign_controller import create_campaign_controller

campaign_routes = Blueprint('campaign_routes', __name__)

campaign_routes.route('/', methods=['POST'])(create_campaign_controller)
