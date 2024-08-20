const express = require('express');
const { applyForJob, applyForEvent, getAppliedJobs,getAppliedInternships,getAppliedEvents,applyForInternship } = require('../controllers/studentController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/apply-job', protect, authorizeRoles('Student'), applyForJob);
router.post('/apply-internship', protect, authorizeRoles('Student'), applyForInternship);
router.post('/apply-event', protect, authorizeRoles('Student'), applyForEvent);


router.get('/applied-jobs', protect, authorizeRoles('Student'), getAppliedJobs);
router.get('/applied-internships', protect, authorizeRoles('Student'), getAppliedInternships);
router.get('/applied-events', protect, authorizeRoles('Student'), getAppliedEvents);


module.exports = router;
