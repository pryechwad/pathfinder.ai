const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, bookingController.createBooking);
router.get('/user/:userId', authenticateToken, bookingController.getUserBookings);
router.get('/mentor/:mentorId', authenticateToken, bookingController.getMentorBookings);
router.patch('/:id', authenticateToken, bookingController.updateBooking);

module.exports = router;
