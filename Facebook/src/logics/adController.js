const facebookAdsService = require('../services/facebookAdsService');

const createAd = async (req, res) => {
  try {
    // Extract ad data from the request body
    const { name, adSetId, creative } = req.body;

    // Call the Facebook Ads service to create the ad
    const ad = await facebookAdsService.createAd(name, adSetId, creative);

    res.status(201).json(ad);
  } catch (error) {
    console.error('Error creating ad:', error);
    res.sendStatus(500);
  }
};

module.exports = {
  createAd,
};
