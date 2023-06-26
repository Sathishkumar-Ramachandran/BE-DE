const User = require('../models/User');

// Create a new user
const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error('Failed to create a user', error);
    throw new Error('Failed to create a user');
  }
};

module.exports = {
  createUser,
};
