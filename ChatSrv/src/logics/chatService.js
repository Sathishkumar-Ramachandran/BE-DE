const Message = require('../models/Chat');

// Get messages by user ID
const getMessagesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({ userId });
    res.json(messages);
  } catch (error) {
    console.error('Failed to get messages', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  const { senderId, content } = req.body;

  try {
    const newMessage = await Message.create({ senderId, content });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Failed to create a message', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getMessagesByUserId,
  createMessage,
};
