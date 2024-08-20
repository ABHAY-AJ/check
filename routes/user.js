const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const {check} = require("express-validator");
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// Registration and Login routes
router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  check('role', 'Role is required').not().isEmpty(),
], registerUser);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], loginUser);

// Protected route example (accessible only by logged-in users)
router.get('/dashboard', protect, (req, res) => {
  res.send('User dashboard');
});

// Role-based route example (accessible only by HR)
router.get('/add-job', protect, authorize('HR'), (req, res) => {
  res.send('Job added by HR');
});

module.exports = router;
