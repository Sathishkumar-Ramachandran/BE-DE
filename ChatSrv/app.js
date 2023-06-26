const express = require('express');
const app = express();
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const messageRoutes = require('./src/routes/chatRoutes');
const cors = require('cors');

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
