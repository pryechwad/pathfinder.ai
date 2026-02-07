const prisma = require('../config/database');

// Get all forum categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.forumCategory.findMany({
      orderBy: { postsCount: 'desc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get posts by category
exports.getPosts = async (req, res) => {
  try {
    const { categoryId, search } = req.query;
    const where = {};
    
    if (categoryId) where.categoryId = categoryId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ];
    }

    const posts = await prisma.forumPost.findMany({
      where,
      include: {
        user: { select: { id: true, fullName: true, email: true } },
        category: true,
        comments: { select: { id: true } },
        votes: true
      },
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    const postsWithVotes = posts.map(post => ({
      ...post,
      upvotes: post.votes.filter(v => v.voteType === 'UPVOTE').length,
      downvotes: post.votes.filter(v => v.voteType === 'DOWNVOTE').length,
      commentsCount: post.comments.length
    }));

    res.json(postsWithVotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new post
exports.createPost = async (req, res) => {
  try {
    const { categoryId, title, content, tags } = req.body;
    const userId = req.user.id;

    const post = await prisma.forumPost.create({
      data: {
        userId,
        categoryId,
        title,
        content,
        tags: tags || []
      },
      include: {
        user: { select: { id: true, fullName: true } },
        category: true
      }
    });

    await prisma.forumCategory.update({
      where: { id: categoryId },
      data: { postsCount: { increment: 1 } }
    });

    // Award points
    await prisma.user.update({
      where: { id: userId },
      data: { points: { increment: 5 } }
    });

    await prisma.pointsHistory.create({
      data: {
        userId,
        points: 5,
        type: 'FORUM_POST',
        description: 'Created a forum post',
        reference: post.id
      }
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single post with comments
exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.forumPost.update({
      where: { id },
      data: { views: { increment: 1 } }
    });

    const post = await prisma.forumPost.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, fullName: true, email: true } },
        category: true,
        comments: {
          include: {
            user: { select: { id: true, fullName: true } }
          },
          orderBy: { createdAt: 'asc' }
        },
        votes: true
      }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const postWithVotes = {
      ...post,
      upvotes: post.votes.filter(v => v.voteType === 'UPVOTE').length,
      downvotes: post.votes.filter(v => v.voteType === 'DOWNVOTE').length
    };

    res.json(postWithVotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    const comment = await prisma.forumComment.create({
      data: {
        postId,
        userId,
        content
      },
      include: {
        user: { select: { id: true, fullName: true } }
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Vote on post
exports.votePost = async (req, res) => {
  try {
    const { postId, voteType } = req.body;
    const userId = req.user.id;

    const existingVote = await prisma.forumVote.findUnique({
      where: {
        postId_userId: { postId, userId }
      }
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        await prisma.forumVote.delete({
          where: { id: existingVote.id }
        });
        return res.json({ message: 'Vote removed' });
      } else {
        await prisma.forumVote.update({
          where: { id: existingVote.id },
          data: { voteType }
        });
        return res.json({ message: 'Vote updated' });
      }
    }

    const vote = await prisma.forumVote.create({
      data: { postId, userId, voteType }
    });

    res.status(201).json(vote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
