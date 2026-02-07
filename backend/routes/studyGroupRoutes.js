const express = require('express');
const router = express.Router();
const studyGroupController = require('../controllers/studyGroupController');
const { authenticate } = require('../middleware/auth');

router.get('/', studyGroupController.getStudyGroups);
router.get('/my-groups', authenticate, studyGroupController.getUserStudyGroups);
router.post('/', authenticate, studyGroupController.createStudyGroup);
router.post('/:groupId/join', authenticate, studyGroupController.joinStudyGroup);
router.delete('/:groupId/leave', authenticate, studyGroupController.leaveStudyGroup);

module.exports = router;
