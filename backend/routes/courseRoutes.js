const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', studentController.getCourses);
router.post('/enroll', authenticateToken, studentController.enrollCourse);
router.patch('/progress/:enrollmentId', authenticateToken, studentController.updateProgress);

module.exports = router;
