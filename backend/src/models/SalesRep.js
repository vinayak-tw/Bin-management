const mongoose = require('mongoose');

const salesRepSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  region: {
    type: String
  },
  ownedBins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bin'
  }],
  sharedBins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bin'
  }],
  role: {
    type: String,
    enum: ['admin', 'salesRep'],
    default: 'salesRep'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SalesRep', salesRepSchema); 