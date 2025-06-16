const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const agencyController = require('../controllers/agencyController');

// @route   POST api/agencies
// @desc    Create an agency
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('agencyId', 'Agency ID is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('type', 'Type is required').isIn(['Primary', 'Secondary']),
      check('location', 'Location is required').not().isEmpty()
    ]
  ],
  agencyController.createAgency
);

// @route   GET api/agencies
// @desc    Get all agencies
// @access  Private
router.get('/', auth, agencyController.getAgencies);

// @route   GET api/agencies/:agencyId
// @desc    Get a single agency
// @access  Private
router.get('/:agencyId', auth, agencyController.getAgency);

// @route   PUT api/agencies/:agencyId
// @desc    Update an agency
// @access  Private
router.put(
  '/:agencyId',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('type', 'Type is required').isIn(['Primary', 'Secondary']),
      check('location', 'Location is required').not().isEmpty()
    ]
  ],
  agencyController.updateAgency
);

// @route   PUT api/agencies/:agencyId/salesrep
// @desc    Add a sales rep to an agency
// @access  Private
router.put(
  '/:agencyId/salesrep',
  [
    auth,
    [
      check('salesRepId', 'Sales Rep ID is required').not().isEmpty()
    ]
  ],
  agencyController.addSalesRep
);

// @route   DELETE api/agencies/:agencyId/salesrep
// @desc    Remove a sales rep from an agency
// @access  Private
router.delete(
  '/:agencyId/salesrep',
  [
    auth,
    [
      check('salesRepId', 'Sales Rep ID is required').not().isEmpty()
    ]
  ],
  agencyController.removeSalesRep
);

// @route   DELETE api/agencies/:agencyId
// @desc    Delete an agency
// @access  Private
router.delete('/:agencyId', auth, agencyController.deleteAgency);

module.exports = router; 