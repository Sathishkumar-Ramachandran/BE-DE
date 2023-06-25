from flask import Flask
from app.controllers.campaign_controller import campaign_controller
from app.controllers.ad_group_controller import ad_group_controller
from app.controllers.creative_controller import creative_controller
from app.controllers.targeting_controller import targeting_controller
from app.exceptions import ApiException

app = Flask(__name__)
app.register_blueprint(campaign_controller)
app.register_blueprint(ad_group_controller)
app.register_blueprint(creative_controller)
app.register_blueprint(targeting_controller)

# Error handling for custom exceptions
@app.errorhandler(ApiException)
def handle_api_exception(error):
    response = {
        'message': error.message,
        'status_code': error.status_code
    }
    return jsonify(response), error.status_code

if __name__ == '__main__':
    app.run()
