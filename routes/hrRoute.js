const express = require('express');
const { addJob, addInternship , getJobs, updateJob, deleteJob,deleteInternship ,updateInternship, getInternships, searchJobs,searchCandidates,predictCandidateFit} = require('../controllers/hrController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/add-job', protect, authorizeRoles('HR'), addJob);
router.get('/jobs', protect,getJobs);
router.put('/jobs/:id', protect, authorizeRoles('HR'), updateJob);
router.delete('/jobs/:id', protect, authorizeRoles('HR'), deleteJob);


router.post('/add-internship', protect, authorizeRoles('HR'), addInternship);
router.get('/internships',protect , getInternships);
router.put('/internships/:id', protect, authorizeRoles('HR'), updateInternship);
router.delete('/internships/:id', protect, authorizeRoles('HR'), deleteInternship);


// Search Jobs
router.get('/jobs/search', protect,searchJobs);

// Search Candidates
router.get('/search-candidates', protect, authorizeRoles('HR'),searchCandidates);


// Predict Candidate Fit
router.get('/predict-fit/:jobId/:candidateId', protect, authorizeRoles('HR'), predictCandidateFit);


// router.post('/filter-candidates', protect, authorizeRoles('HR'), filterCandidates);



module.exports = router;
