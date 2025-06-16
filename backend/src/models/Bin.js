const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
  binId: {
    type: String,
    required: true,
    unique: true
  },
  volume: {
    type: Number,
    required: true
  },
  currentLevel: {
    type: Number,
    default: 0
  },
  productId: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  availableVolume: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalesRep',
    required: true
  },
  agencies: [{
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agency'
    },
    allocation: {
      type: Number,
      required: true
    }
  }],
  geoLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  warehouse: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

binSchema.index({ geoLocation: '2dsphere' });

module.exports = mongoose.model('Bin', binSchema); 