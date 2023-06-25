const facebookAdsService = require('../services/facebookAdsService');

const createCampaign = async (req, res) => {
  try {
    // Extract campaign data from the request body
    const { name, objective } = req.body;

    // Call the Facebook Ads service to create the campaign
    const campaign = await facebookAdsService.createCampaign(name, objective);

    res.status(201).json(campaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.sendStatus(500);
  }
};

module.exports = {
  createCampaign,
};
