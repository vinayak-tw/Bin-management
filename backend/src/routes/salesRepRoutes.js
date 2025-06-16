const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const salesRepController = require('../controllers/salesRepController');

// @route   POST api/salesreps
// @desc    Create a sales representative
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('region', 'Region is required').not().isEmpty()
    ]
  ],
  salesRepController.createSalesRep
);

// @route   GET api/salesreps
// @desc    Get all sales representatives
// @access  Private
router.get('/', auth, salesRepController.getSalesReps);

// @route   GET api/salesreps/:id
// @desc    Get a single sales representative
// @access  Private
router.get('/:id', auth, salesRepController.getSalesRep);

// @route   PUT api/salesreps/:id
// @desc    Update a sales representative
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('region', 'Region is required').not().isEmpty()
    ]
  ],
  salesRepController.updateSalesRep
);

// @route   DELETE api/salesreps/:id
// @desc    Delete a sales representative
// @access  Private
router.delete('/:id', auth, salesRepController.deleteSalesRep);

module.exports = router; 