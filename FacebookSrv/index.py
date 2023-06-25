from flask import jsonify
from config import app
from routes.campaign_routes import campaign_routes
from routes.adset_routes import adset_routes
from routes.ad_routes import ad_routes

# Register routes
app.register_blueprint(campaign_routes, url_prefix='/campaigns')
app.register_blueprint(adset_routes, url_prefix='/adsets')
app.register_blueprint(ad_routes, url_prefix='/ads')

@app.route('/')
def index():
    return jsonify({'message': 'Welcome to the API!'})

if __name__ == '__main__':
    app.run(debug=True)
