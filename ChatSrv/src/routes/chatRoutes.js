const express = require('express');
const router = express.Router();
const messageController = require('../logics/chatService');

router.get('/:userId', messageController.getMessagesByUserId);
router.post('/', messageController.createMessage);

module.exports = router;
