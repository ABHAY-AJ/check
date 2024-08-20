const express = require('express');
const { addCampusJob,createCourse,getCourses,updateCourse,deleteCourse, addEvent,getEvents,updateEvent,deleteEvent} = require('../controllers/tpoController');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// router.post('/add-campus-job', protect, authorizeRoles('TPO'), addCampusJob);

// Courses
router.post('/courses', protect, authorizeRoles('TPO'), createCourse);
router.get('/courses', protect,getCourses);
router.put('/courses/:id', protect, authorizeRoles('TPO'), updateCourse);
router.delete('/courses/:id', protect, authorizeRoles('TPO'),deleteCourse);



router.post('/add-event', protect, authorizeRoles('TPO'), addEvent);
router.get('/events', protect,getEvents);
router.put('/events/:id', protect, authorizeRoles('TPO'), updateEvent);
router.delete('/events/:id', protect, authorizeRoles('TPO'), deleteEvent);

module.exports = router;
