from flask import Blueprint
from controllers.adset_controller import create_ad_set_controller

adset_routes = Blueprint('adset_routes', __name__)

adset_routes.route('/', methods=['POST'])(create_ad_set_controller)
