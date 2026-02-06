const prisma = require('../config/database');

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, mentorId, date, time, topic, duration, amount } = req.body;
    
    const booking = await prisma.booking.create({
      data: {
        userId,
        mentorId,
        date: new Date(date),
        time,
        topic,
        duration: parseInt(duration),
        amount: parseInt(amount),
        orderId: 'ORD' + Date.now(),
        status: 'CONFIRMED'
      },
      include: { mentor: true, user: true }
    });
    
    await prisma.mentor.update({
      where: { id: mentorId },
      data: { sessions: { increment: 1 } }
    });
    
    await prisma.activity.create({
      data: {
        userId,
        type: 'session_booking',
        title: 'Booked Mentor Session',
        description: `Booked session with ${booking.mentor.name}`
      }
    });
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Get User Bookings
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { mentor: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Get Mentor Bookings
exports.getMentorBookings = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const bookings = await prisma.booking.findMany({
      where: { mentorId },
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Update Booking Status
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: { mentor: true, user: true }
    });
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
};
