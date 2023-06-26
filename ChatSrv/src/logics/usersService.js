const User = require('../models/User');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Failed to get users', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUsers,
};
