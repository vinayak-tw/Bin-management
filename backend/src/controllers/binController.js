const Bin = require('../models/Bin');
const Agency = require('../models/Agency');
const { validationResult } = require('express-validator');

// Create a new bin
exports.createBin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      binId, 
      volume, 
      productId,
      location,
      availableVolume,
      owner,
      warehouse,
      agencies, 
      geoLocation 
    } = req.body;

    // Create new bin
    const bin = new Bin({
      binId,
      volume,
      productId,
      location,
      availableVolume,
      owner,
      warehouse,
      agencies,
      geoLocation
    });

    await bin.save();

    // Update agency references if agencies are provided
    if (agencies && agencies.length > 0) {
      for (const agency of agencies) {
        await Agency.findByIdAndUpdate(
          agency.agencyId,
          { $push: { bins: { bin: bin._id, allocatedUnits: agency.allocation } } }
        );
      }
    }

    res.status(201).json(bin);
  } catch (error) {
    console.error('Error creating bin:', error);
    res.status(500).json({ message: 'Error creating bin', error: error.message });
  }
};

// Get all bins
exports.getBins = async (req, res) => {
  try {
    const bins = await Bin.find()
      .populate('agencies.agencyId', 'agencyId name type')
      .sort({ createdAt: -1 });
    res.json(bins);
  } catch (error) {
    console.error('Error fetching bins:', error);
    res.status(500).json({ message: 'Error fetching bins', error: error.message });
  }
};

// Get a single bin
exports.getBin = async (req, res) => {
  try {
    const bin = await Bin.findById(req.params.id)
      .populate('agencies.agencyId', 'agencyId name type');
    
    if (!bin) {
      return res.status(404).json({ message: 'Bin not found' });
    }
    res.json(bin);
  } catch (error) {
    console.error('Error fetching bin:', error);
    res.status(500).json({ message: 'Error fetching bin', error: error.message });
  }
};

// Update bin capacity
exports.updateBinCapacity = async (req, res) => {
  try {
    const { volume } = req.body;
    const bin = await Bin.findById(req.params.id);
    
    if (!bin) {
      return res.status(404).json({ message: 'Bin not found' });
    }

    bin.volume = volume;
    await bin.save();
    
    res.json(bin);
  } catch (error) {
    console.error('Error updating bin capacity:', error);
    res.status(500).json({ message: 'Error updating bin capacity', error: error.message });
  }
};

// Update agency allocation
exports.updateAgencyAllocation = async (req, res) => {
  try {
    const { agencyId, allocation } = req.body;
    const bin = await Bin.findById(req.params.id);
    
    if (!bin) {
      return res.status(404).json({ message: 'Bin not found' });
    }

    const agencyIndex = bin.agencies.findIndex(a => a.agencyId.toString() === agencyId);
    
    if (agencyIndex > -1) {
      bin.agencies[agencyIndex].allocation = allocation;
    } else {
      bin.agencies.push({ agencyId, allocation });
    }

    await bin.save();

    // Update agency reference
    await Agency.findByIdAndUpdate(
      agencyId,
      { $set: { 'bins.$[elem].allocatedUnits': allocation } },
      { arrayFilters: [{ 'elem.bin': bin._id }] }
    );
    
    res.json(bin);
  } catch (error) {
    console.error('Error updating agency allocation:', error);
    res.status(500).json({ message: 'Error updating agency allocation', error: error.message });
  }
};

// Update inventory
exports.updateInventory = async (req, res) => {
  try {
    const { currentLevel } = req.body;
    const bin = await Bin.findById(req.params.id);
    
    if (!bin) {
      return res.status(404).json({ message: 'Bin not found' });
    }

    bin.currentLevel = currentLevel;
    bin.lastUpdated = new Date();
    await bin.save();
    
    res.json(bin);
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ message: 'Error updating inventory', error: error.message });
  }
};

// Delete a bin
exports.deleteBin = async (req, res) => {
  try {
    const bin = await Bin.findById(req.params.id);
    
    if (!bin) {
      return res.status(404).json({ message: 'Bin not found' });
    }

    // Remove bin references from agencies
    for (const agency of bin.agencies) {
      await Agency.findByIdAndUpdate(
        agency.agencyId,
        { $pull: { bins: { bin: bin._id } } }
      );
    }

    await bin.remove();
    res.json({ message: 'Bin removed' });
  } catch (error) {
    console.error('Error deleting bin:', error);
    res.status(500).json({ message: 'Error deleting bin', error: error.message });
  }
}; 