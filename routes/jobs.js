const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const jobController = require('../controllers/jobController');

// Get all jobs
router.get('/', jobController.getAllJobs);

// Get job by ID
router.get('/:id', jobController.getJobById);

// Create job
router.post('/', authMiddleware, jobController.createJob);

// Update job
router.put('/:id', authMiddleware, jobController.updateJob);

// Delete job
router.delete('/:id', authMiddleware, jobController.deleteJob);

module.exports = router;
