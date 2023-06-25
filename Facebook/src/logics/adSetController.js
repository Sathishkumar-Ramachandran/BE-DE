const facebookAdsService = require('../services/facebookAdsService');

const createAdSet = async (req, res) => {
  try {
    // Extract ad set data from the request body
    const { name, campaignId, targeting } = req.body;

    // Call the Facebook Ads service to create the ad set
    const adSet = await facebookAdsService.createAdSet(name, campaignId, targeting);

    res.status(201).json(adSet);
  } catch (error) {
    console.error('Error creating ad set:', error);
    res.sendStatus(500);
  }
};

module.exports = {
  createAdSet,
};
