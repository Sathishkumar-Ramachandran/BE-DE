const express = require('express');
const adController = require('../controllers/adController');

const router = express.Router();

router.post('/', adController.createAd);

module.exports = router;
