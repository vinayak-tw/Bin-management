const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const binController = require('../controllers/binController');

// @route   POST api/bins
// @desc    Create a bin
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('binId', 'Bin ID is required').not().isEmpty(),
      check('volume', 'Volume is required').isNumeric(),
      check('productId', 'Product ID is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('warehouse', 'Warehouse is required').not().isEmpty()
    ]
  ],
  binController.createBin
);

// @route   GET api/bins
// @desc    Get all bins for a sales rep
// @access  Private
router.get('/', auth, binController.getBins);

// @route   GET api/bins/:id
// @desc    Get a single bin
// @access  Private
router.get('/:id', auth, binController.getBin);

// @route   PUT api/bins/:id/capacity
// @desc    Update bin capacity
// @access  Private
router.put(
  '/:id/capacity',
  [
    auth,
    [
      check('volume', 'Volume is required').isNumeric()
    ]
  ],
  binController.updateBinCapacity
);

// @route   PUT api/bins/:id/allocation
// @desc    Update agency allocation
// @access  Private
router.put(
  '/:id/allocation',
  [
    auth,
    [
      check('agencyId', 'Agency ID is required').not().isEmpty(),
      check('allocatedUnits', 'Allocated units is required').isNumeric()
    ]
  ],
  binController.updateAgencyAllocation
);

// @route   PUT api/bins/:id/inventory
// @desc    Update inventory (Add/Withdraw stock)
// @access  Private
router.put(
  '/:id/inventory',
  [
    auth,
    [
      check('action', 'Action is required').isIn(['add', 'withdraw']),
      check('units', 'Units is required').isNumeric(),
      check('agencyId', 'Agency ID is required').not().isEmpty()
    ]
  ],
  binController.updateInventory
);

// @route   DELETE api/bins/:id
// @desc    Delete a bin
// @access  Private
router.delete('/:id', auth, binController.deleteBin);

module.exports = router; 