from mongo.db import collection

def get_google_ads_credentials(companyId):
    document = collection.find_one({"companyId": companyId})

    # Extract the required fields
    developer_token = document['developer_token']
    client_id = document['client_id']
    client_secret = document['client_secret']
    refresh_token = document['refresh_token']
    #login_customer_id = document['login_customer_id']

    # Return the credentials as a dictionary
    return {
        'developer_token': developer_token,
        'client_id': client_id,
        'client_secret': client_secret,
        'refresh_token': refresh_token,
        #'login_customer_id': login_customer_id
    }

# Other settings
