from db.db import collection

def get_facebook_ads_credentials():
    document = collection.find_one()

    # Extract the required fields
    app_id = document['app_id']
    app_secret = document['app_secret']
    access_token = document['access_token']
    # developer_token = document['developer_token']
    # client_id = document['client_id']
    # client_secret = document['client_secret']
    # refresh_token = document['refresh_token']
    # login_customer_id = document['login_customer_id']

    # Return the credentials as a dictionary
    return {
        'app_id': app_id,
        'app_secret' : app_secret,
        'access_token' : access_token
        # 'developer_token': developer_token,
        # 'client_id': client_id,
        # 'client_secret': client_secret,
        # 'refresh_token': refresh_token,
        # 'login_customer_id': login_customer_id
    }

# Other settings
