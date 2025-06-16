const { Agency, SalesRep } = require('../models');
const { validationResult } = require('express-validator');

// Create a new agency
exports.createAgency = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { agencyId, name, type, location } = req.body;
    const agency = new Agency({
      agencyId,
      name,
      type,
      location
    });

    await agency.save();
    res.status(201).json(agency);
  } catch (error) {
    console.error('Error creating agency:', error);
    res.status(500).json({ message: 'Error creating agency', error: error.message });
  }
};

// Get all agencies
exports.getAgencies = async (req, res) => {
  try {
    const agencies = await Agency.find()
      .populate('salesReps', 'name email')
      .populate('bins.bin', 'binId volume');
    res.json(agencies);
  } catch (error) {
    console.error('Error fetching agencies:', error);
    res.status(500).json({ message: 'Error fetching agencies', error: error.message });
  }
};

// Get a single agency
exports.getAgency = async (req, res) => {
  try {
    console.log('Searching for agency with ID:', req.params.agencyId);
    
    const agency = await Agency.findOne({ agencyId: req.params.agencyId })
      .populate('salesReps', 'name email')
      .populate('bins.bin', 'binId volume');
    
    console.log('Found agency:', agency);
    
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }
    res.json(agency);
  } catch (error) {
    console.error('Error fetching agency:', error);
    res.status(500).json({ message: 'Error fetching agency', error: error.message });
  }
};

// Update agency
exports.updateAgency = async (req, res) => {
  try {
    const { name, type, location } = req.body;
    const agency = await Agency.findOne({ agencyId: req.params.agencyId });
    
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    agency.name = name || agency.name;
    agency.type = type || agency.type;
    agency.location = location || agency.location;

    await agency.save();
    res.json(agency);
  } catch (error) {
    console.error('Error updating agency:', error);
    res.status(500).json({ message: 'Error updating agency', error: error.message });
  }
};

// Add a sales rep to an agency
exports.addSalesRep = async (req, res) => {
  try {
    const { salesRepId } = req.body;
    const agency = await Agency.findOne({ agencyId: req.params.agencyId });
    
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    if (!agency.salesReps.includes(salesRepId)) {
      agency.salesReps.push(salesRepId);
      await agency.save();
    }

    res.json(agency);
  } catch (error) {
    console.error('Error adding sales rep:', error);
    res.status(500).json({ message: 'Error adding sales rep', error: error.message });
  }
};

// Remove a sales rep from an agency
exports.removeSalesRep = async (req, res) => {
  try {
    const { salesRepId } = req.body;
    const agency = await Agency.findOne({ agencyId: req.params.agencyId });
    
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    agency.salesReps = agency.salesReps.filter(id => id.toString() !== salesRepId);
    await agency.save();

    res.json(agency);
  } catch (error) {
    console.error('Error removing sales rep:', error);
    res.status(500).json({ message: 'Error removing sales rep', error: error.message });
  }
};

// Delete an agency
exports.deleteAgency = async (req, res) => {
  try {
    const agency = await Agency.findOne({ agencyId: req.params.agencyId });
    
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    await agency.remove();
    res.json({ message: 'Agency removed' });
  } catch (error) {
    console.error('Error deleting agency:', error);
    res.status(500).json({ message: 'Error deleting agency', error: error.message });
  }
}; 