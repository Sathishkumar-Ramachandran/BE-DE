const express = require('express');
const adSetController = require('../controllers/adSetController');

const router = express.Router();

router.post('/', adSetController.createAdSet);

module.exports = router;
