const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').isIn(['admin', 'salesrep'])
  ],
  authController.register
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, authController.getCurrentUser);

module.exports = router; 