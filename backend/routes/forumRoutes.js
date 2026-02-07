const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { authenticate } = require('../middleware/auth');

router.get('/categories', forumController.getCategories);
router.get('/posts', forumController.getPosts);
router.get('/posts/:id', forumController.getPost);
router.post('/posts', authenticate, forumController.createPost);
router.post('/comments', authenticate, forumController.addComment);
router.post('/votes', authenticate, forumController.votePost);

module.exports = router;
