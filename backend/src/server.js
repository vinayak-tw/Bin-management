const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Load models
require('./models');

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/agencies', require('./routes/agencyRoutes'));
app.use('/api/bins', require('./routes/binRoutes'));
app.use('/api/salesreps', require('./routes/salesRepRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// Connect to MongoDB
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected');
  // Start server
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
}); 