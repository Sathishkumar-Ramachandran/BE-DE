const express = require('express');
const router = express.Router();
const userController = require('../logics/usersService');

router.get('/', userController.getUsers);

module.exports = router;
