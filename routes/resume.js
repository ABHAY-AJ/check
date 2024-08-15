const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const resumeController = require('../controllers/resumeController');

// Get resume by User ID
router.get('/:userId', resumeController.getResumeByUserId);

// Create resume
router.post('/', authMiddleware, resumeController.createResume);

// Update resume
router.put('/:id', authMiddleware, resumeController.updateResume);

// Delete resume
router.delete('/:id', authMiddleware, resumeController.deleteResume);

module.exports = router;
