const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const eventController = require('../controllers/eventController');

// Get all events
router.get('/', eventController.getAllEvents);

// Get event by ID
router.get('/:id', eventController.getEventById);

// Create event
router.post('/', authMiddleware, eventController.createEvent);

// Update event
router.put('/:id', authMiddleware, eventController.updateEvent);

// Delete event
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;
