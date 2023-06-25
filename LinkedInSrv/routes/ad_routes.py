from flask import Blueprint
from controllers.ad_controller import create_ad_controller

ad_routes = Blueprint('ad_routes', __name__)

ad_routes.route('/', methods=['POST'])(create_ad_controller)
