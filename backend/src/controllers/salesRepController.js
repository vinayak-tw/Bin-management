const { SalesRep } = require('../models');
const { validationResult } = require('express-validator');

// Create a new sales representative
exports.createSalesRep = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, region } = req.body;
    const salesRep = new SalesRep({
      name,
      email,
      phone,
      region
    });

    await salesRep.save();
    res.status(201).json(salesRep);
  } catch (error) {
    console.error('Error creating sales rep:', error);
    res.status(500).json({ message: 'Error creating sales rep', error: error.message });
  }
};

// Get all sales representatives
exports.getSalesReps = async (req, res) => {
  try {
    const salesReps = await SalesRep.find()
      .populate('ownedBins', 'binId volume')
      .populate('sharedBins', 'binId volume');
    res.json(salesReps);
  } catch (error) {
    console.error('Error fetching sales reps:', error);
    res.status(500).json({ message: 'Error fetching sales reps', error: error.message });
  }
};

// Get a single sales representative
exports.getSalesRep = async (req, res) => {
  try {
    const salesRep = await SalesRep.findById(req.params.id)
      .populate('ownedBins', 'binId volume')
      .populate('sharedBins', 'binId volume');
    
    if (!salesRep) {
      return res.status(404).json({ message: 'Sales representative not found' });
    }
    res.json(salesRep);
  } catch (error) {
    console.error('Error fetching sales rep:', error);
    res.status(500).json({ message: 'Error fetching sales rep', error: error.message });
  }
};

// Update a sales representative
exports.updateSalesRep = async (req, res) => {
  try {
    const { name, email, phone, region } = req.body;
    const salesRep = await SalesRep.findById(req.params.id);
    
    if (!salesRep) {
      return res.status(404).json({ message: 'Sales representative not found' });
    }

    salesRep.name = name || salesRep.name;
    salesRep.email = email || salesRep.email;
    salesRep.phone = phone || salesRep.phone;
    salesRep.region = region || salesRep.region;

    await salesRep.save();
    res.json(salesRep);
  } catch (error) {
    console.error('Error updating sales rep:', error);
    res.status(500).json({ message: 'Error updating sales rep', error: error.message });
  }
};

// Delete a sales representative
exports.deleteSalesRep = async (req, res) => {
  try {
    const salesRep = await SalesRep.findById(req.params.id);
    
    if (!salesRep) {
      return res.status(404).json({ message: 'Sales representative not found' });
    }

    await salesRep.remove();
    res.json({ message: 'Sales representative removed' });
  } catch (error) {
    console.error('Error deleting sales rep:', error);
    res.status(500).json({ message: 'Error deleting sales rep', error: error.message });
  }
}; 