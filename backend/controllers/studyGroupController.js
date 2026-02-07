const prisma = require('../config/database');

// Get all study groups
exports.getStudyGroups = async (req, res) => {
  try {
    const { category, search } = req.query;
    const where = { isPrivate: false };
    
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const groups = await prisma.studyGroup.findMany({
      where,
      include: {
        creator: { select: { id: true, fullName: true } },
        members: {
          include: {
            user: { select: { id: true, fullName: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const groupsWithCount = groups.map(group => ({
      ...group,
      memberCount: group.members.length,
      isFull: group.members.length >= group.maxMembers
    }));

    res.json(groupsWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create study group
exports.createStudyGroup = async (req, res) => {
  try {
    const { name, description, category, maxMembers, isPrivate, meetingLink } = req.body;
    const userId = req.user.id;

    const group = await prisma.studyGroup.create({
      data: {
        name,
        description,
        category,
        maxMembers: maxMembers || 50,
        isPrivate: isPrivate || false,
        meetingLink,
        creatorId: userId
      },
      include: {
        creator: { select: { id: true, fullName: true } }
      }
    });

    // Add creator as admin member
    await prisma.studyGroupMember.create({
      data: {
        groupId: group.id,
        userId,
        role: 'ADMIN'
      }
    });

    // Award points
    await prisma.user.update({
      where: { id: userId },
      data: { points: { increment: 10 } }
    });

    await prisma.pointsHistory.create({
      data: {
        userId,
        points: 10,
        type: 'STUDY_GROUP',
        description: 'Created a study group',
        reference: group.id
      }
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Join study group
exports.joinStudyGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    const group = await prisma.studyGroup.findUnique({
      where: { id: groupId },
      include: { members: true }
    });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (group.members.length >= group.maxMembers) {
      return res.status(400).json({ error: 'Group is full' });
    }

    const existingMember = await prisma.studyGroupMember.findUnique({
      where: {
        groupId_userId: { groupId, userId }
      }
    });

    if (existingMember) {
      return res.status(400).json({ error: 'Already a member' });
    }

    const member = await prisma.studyGroupMember.create({
      data: {
        groupId,
        userId,
        role: 'MEMBER'
      },
      include: {
        user: { select: { id: true, fullName: true } }
      }
    });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Leave study group
exports.leaveStudyGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    const member = await prisma.studyGroupMember.findUnique({
      where: {
        groupId_userId: { groupId, userId }
      }
    });

    if (!member) {
      return res.status(404).json({ error: 'Not a member' });
    }

    await prisma.studyGroupMember.delete({
      where: { id: member.id }
    });

    res.json({ message: 'Left group successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's study groups
exports.getUserStudyGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    const memberships = await prisma.studyGroupMember.findMany({
      where: { userId },
      include: {
        group: {
          include: {
            creator: { select: { id: true, fullName: true } },
            members: {
              include: {
                user: { select: { id: true, fullName: true } }
              }
            }
          }
        }
      }
    });

    const groups = memberships.map(m => ({
      ...m.group,
      memberCount: m.group.members.length,
      userRole: m.role
    }));

    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
