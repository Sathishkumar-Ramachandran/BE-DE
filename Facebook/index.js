const express = require('express');
const mongoose = require('mongoose');
// const app = require('./config/express');

const express = require('express');
const bodyParser = require('body-parser');
const campaignRoutes = require('../app/routes/campaignRoutes');
const adSetRoutes = require('../app/routes/adSetRoutes');
const adRoutes = require('../app/routes/adRoutes');

const app = express();

// Parse request body as JSON
app.use(bodyParser.json());

// Define API routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/adsets', adSetRoutes);
app.use('/api/ads', adRoutes);

module.exports = app;


// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the Express server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
