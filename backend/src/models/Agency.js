const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
  agencyId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Primary', 'Secondary'],
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  salesReps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalesRep'
  }],
  bins: [{
    bin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bin'
    },
    allocatedUnits: {
      type: Number,
      default: 0
    },
    physicalUnits: {
      type: Number,
      default: 0
    },
    invoicedUnits: {
      type: Number,
      default: 0
    },
    returnedUnits: {
      type: Number,
      default: 0
    },
    deliveredUnits: {
      type: Number,
      default: 0
    }
  }]
}, {
  timestamps: true
});

// Create index for agencyId
agencySchema.index({ agencyId: 1 }, { unique: true });

module.exports = mongoose.model('Agency', agencySchema); 