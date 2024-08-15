const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const internshipController = require('../controllers/internshipController');

// Get all internships
router.get('/', internshipController.getAllInternships);

// Get internship by ID
router.get('/:id', internshipController.getInternshipById);

// Create internship
router.post('/', authMiddleware, internshipController.createInternship);

// Update internship
router.put('/:id', authMiddleware, internshipController.updateInternship);

// Delete internship
router.delete('/:id', authMiddleware, internshipController.deleteInternship);

module.exports = router;
