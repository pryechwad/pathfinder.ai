const express = require('express');
const router = express.Router();
const successStoryController = require('../controllers/successStoryController');
const { authenticate } = require('../middleware/auth');

router.get('/', successStoryController.getSuccessStories);
router.get('/my-stories', authenticate, successStoryController.getUserSuccessStories);
router.get('/:id', successStoryController.getSuccessStory);
router.post('/', authenticate, successStoryController.createSuccessStory);
router.post('/:id/like', successStoryController.likeSuccessStory);

module.exports = router;
