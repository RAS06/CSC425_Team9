const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
const messageRoutes = require('./routes/messageRoutes');
app.use('/api', messageRoutes);

// Mongo connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


// Default route
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'Backend Example API is running! Please use a tool to interact with endpoints.',
    }
  });
});
module.exports = app;