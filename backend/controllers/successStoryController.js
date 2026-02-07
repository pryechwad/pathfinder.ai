const prisma = require('../config/database');

// Get all success stories
exports.getSuccessStories = async (req, res) => {
  try {
    const { careerPath, featured } = req.query;
    const where = { isApproved: true };
    
    if (careerPath) where.careerPath = careerPath;
    if (featured === 'true') where.isFeatured = true;

    const stories = await prisma.successStory.findMany({
      where,
      include: {
        user: {
          select: { id: true, fullName: true, email: true, city: true }
        }
      },
      orderBy: [
        { isFeatured: 'desc' },
        { likes: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single success story
exports.getSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.successStory.update({
      where: { id },
      data: { views: { increment: 1 } }
    });

    const story = await prisma.successStory.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, fullName: true, email: true, city: true, school: true }
        }
      }
    });

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create success story
exports.createSuccessStory = async (req, res) => {
  try {
    const { title, content, careerPath, company, position, image } = req.body;
    const userId = req.user.id;

    const story = await prisma.successStory.create({
      data: {
        userId,
        title,
        content,
        careerPath,
        company,
        position,
        image,
        isApproved: false
      },
      include: {
        user: { select: { id: true, fullName: true } }
      }
    });

    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like success story
exports.likeSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await prisma.successStory.update({
      where: { id },
      data: { likes: { increment: 1 } }
    });

    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's success stories
exports.getUserSuccessStories = async (req, res) => {
  try {
    const userId = req.user.id;

    const stories = await prisma.successStory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
