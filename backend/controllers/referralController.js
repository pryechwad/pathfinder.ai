const prisma = require('../config/database');

// Get user's referral code and stats
exports.getReferralStats = async (req, res) => {
  try {
    const userId = req.user.id;

    let user = await prisma.user.findUnique({
      where: { id: userId },
      select: { referralCode: true, points: true }
    });

    // Generate referral code if not exists
    if (!user.referralCode) {
      // Get user details for code generation
      const userDetails = await prisma.user.findUnique({
        where: { id: userId },
        select: { fullName: true, grade: true }
      });
      
      // Create code: FirstName + Grade/Age + Random3Digits
      const firstName = userDetails.fullName.split(' ')[0].toUpperCase().substring(0, 4);
      const gradeOrAge = userDetails.grade || Math.floor(Math.random() * 10 + 15); // Use grade or random age 15-24
      const randomNum = Math.floor(Math.random() * 900 + 100); // 3 digit random
      const newCode = `${firstName}${gradeOrAge}${randomNum}`;
      
      user = await prisma.user.update({
        where: { id: userId },
        data: { referralCode: newCode },
        select: { referralCode: true, points: true }
      });
    }

    const referrals = await prisma.referral.findMany({
      where: { referrerId: userId },
      include: {
        referrer: { select: { id: true, fullName: true, email: true } }
      }
    });

    const stats = {
      referralCode: user.referralCode,
      totalPoints: user.points,
      totalReferrals: referrals.length,
      completedReferrals: referrals.filter(r => r.status === 'COMPLETED').length,
      pendingReferrals: referrals.filter(r => r.status === 'PENDING').length,
      totalEarned: referrals.reduce((sum, r) => sum + r.pointsAwarded, 0),
      referrals
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Apply referral code during registration
exports.applyReferralCode = async (req, res) => {
  try {
    const { referralCode, newUserId } = req.body;

    const referrer = await prisma.user.findUnique({
      where: { referralCode }
    });

    if (!referrer) {
      return res.status(404).json({ error: 'Invalid referral code' });
    }

    if (referrer.id === newUserId) {
      return res.status(400).json({ error: 'Cannot refer yourself' });
    }

    // Update new user with referrer info
    await prisma.user.update({
      where: { id: newUserId },
      data: { referredBy: referrer.id }
    });

    // Create referral record
    const referral = await prisma.referral.create({
      data: {
        referrerId: referrer.id,
        referredId: newUserId,
        status: 'PENDING',
        pointsAwarded: 0
      }
    });

    res.status(201).json({ message: 'Referral code applied successfully', referral });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete referral (called when referred user makes first purchase or completes profile)
exports.completeReferral = async (req, res) => {
  try {
    const { referredUserId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: referredUserId },
      select: { referredBy: true }
    });

    if (!user || !user.referredBy) {
      return res.status(404).json({ error: 'No referral found' });
    }

    const referral = await prisma.referral.findUnique({
      where: {
        referrerId_referredId: {
          referrerId: user.referredBy,
          referredId: referredUserId
        }
      }
    });

    if (!referral || referral.status === 'COMPLETED') {
      return res.status(400).json({ error: 'Referral already completed or not found' });
    }

    // Award 100 points to referrer
    await prisma.user.update({
      where: { id: user.referredBy },
      data: { points: { increment: 100 } }
    });

    // Update referral status
    await prisma.referral.update({
      where: { id: referral.id },
      data: {
        status: 'COMPLETED',
        pointsAwarded: 100,
        completedAt: new Date()
      }
    });

    // Create points history
    await prisma.pointsHistory.create({
      data: {
        userId: user.referredBy,
        points: 100,
        type: 'REFERRAL',
        description: 'Referral bonus - Friend joined and completed profile',
        reference: referredUserId
      }
    });

    res.json({ message: 'Referral completed! 100 points awarded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get points history
exports.getPointsHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await prisma.pointsHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true }
    });

    res.json({
      currentPoints: user.points,
      history
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Redeem points for discount
exports.redeemPoints = async (req, res) => {
  try {
    const { points, bookingId } = req.body;
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true }
    });

    if (user.points < points) {
      return res.status(400).json({ error: 'Insufficient points' });
    }

    // Deduct points
    await prisma.user.update({
      where: { id: userId },
      data: { points: { decrement: points } }
    });

    // Create points history
    await prisma.pointsHistory.create({
      data: {
        userId,
        points: -points,
        type: 'PURCHASE',
        description: `Redeemed ${points} points for discount`,
        reference: bookingId
      }
    });

    // Calculate discount (1 point = 1 rupee)
    const discount = points;

    res.json({
      message: 'Points redeemed successfully',
      discount,
      remainingPoints: user.points - points
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
