const express = require('express');
const campaignController = require('../controllers/campaignController');

const router = express.Router();

router.post('/', campaignController.createCampaign);

module.exports = router;
