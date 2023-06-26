const Message = require('../models/Chat');

// Get messages by user ID
const getMessagesByUserId = async (userId) => {
  try {
    const messages = await Message.find({ userId });
    return messages;
  } catch (error) {
    console.error('Failed to get messages', error);
    throw new Error('Failed to get messages');
  }
};

// Create a new message
const createMessage = async (senderId, content) => {
  try {
    const newMessage = await Message.create({ senderId, content });
    return newMessage;
  } catch (error) {
    console.error('Failed to create a message', error);
    throw new Error('Failed to create a message');
  }
};

module.exports = {
  getMessagesByUserId,
  createMessage,
};
