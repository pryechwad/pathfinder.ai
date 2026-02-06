import { useState, useEffect } from 'react';
import { 
  Users, Star, Calendar, MessageCircle, Video, Clock,
  Award, BookOpen, TrendingUp, DollarSign, Eye, Bell,
  User, Trophy, Code, Briefcase, CheckCircle, ArrowRight,
  Play, FileText, Zap, Brain, Globe, Rocket, Edit, X,
  BarChart3, PieChart, Activity, Target, Settings, Mail
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useToast } from '../../contexts/ToastContext';
import { mentorAPI, bookingAPI } from '../../utils/api';

const MentorDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user.fullName || 'Mentor Name',
    email: user.email || 'mentor@example.com',
    phone: '+91 98765 43210',
    expertise: 'Full Stack Development, System Design',
    experience: '8+ years',
    company: 'Google',
    bio: 'Passionate full-stack developer with expertise in modern web technologies.',
    hourlyRate: 500,
    languages: 'English, Hindi'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [availability, setAvailability] = useState({
    monday: { available: true, startTime: '09:00', endTime: '17:00' },
    tuesday: { available: true, startTime: '09:00', endTime: '17:00' },
    wednesday: { available: true, startTime: '09:00', endTime: '17:00' },
    thursday: { available: true, startTime: '09:00', endTime: '17:00' },
    friday: { available: true, startTime: '09:00', endTime: '17:00' },
    saturday: { available: false, startTime: '09:00', endTime: '17:00' },
    sunday: { available: false, startTime: '09:00', endTime: '17:00' }
  });
  const [pricing, setPricing] = useState({
    sessionPrice: 500,
    currency: 'INR'
  });
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({
    date: '',
    time: ''
  });
  const { showSuccess, showInfo } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mentorAPI.getDashboard(user.id);
        setDashboardData(response.data);
        setBookings(response.data.mentor.bookings || []);
        setLoading(false);
        showSuccess(`Welcome back, ${user.fullName?.split(' ')[0] || 'Mentor'}! 🎯`);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
    if (user?.id) fetchData();
  }, [user]);

  const handleSetAvailability = () => {
    setShowAvailabilityModal(true);
  };

  const handleUpdatePricing = () => {
    setShowPricingModal(true);
  };

  const handleEditProfile = () => {
    setShowProfileModal(true);
  };

  const handleViewAnalytics = () => {
    setActiveTab('analytics');
  };

  const handleSaveAvailability = () => {
    setShowAvailabilityModal(false);
    showSuccess('Availability updated successfully!');
  };

  const handleSavePricing = () => {
    setShowPricingModal(false);
    showSuccess('Pricing updated successfully!');
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    showSuccess('Profile updated successfully!');
  };

  const stats = [
    { 
      label: 'Total Students', 
      value: '156', 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      change: '+12 this month'
    },
    { 
      label: 'Sessions Completed', 
      value: '89', 
      icon: Video, 
      color: 'text-purple-600', 
      bg: 'bg-gradient-to-r from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      change: '+8 this week'
    },
    { 
      label: 'Average Rating', 
      value: '4.9', 
      icon: Star, 
      color: 'text-green-600', 
      bg: 'bg-gradient-to-r from-green-500 to-green-600',
      lightBg: 'bg-green-50',
      change: '↑ 0.2 points'
    },
    { 
      label: 'Monthly Earnings', 
      value: '₹45K', 
      icon: DollarSign, 
      color: 'text-orange-600', 
      bg: 'bg-gradient-to-r from-orange-500 to-orange-600',
      lightBg: 'bg-orange-50',
      change: '+18% growth'
    }
  ];

  const recentActivities = [
    { 
      title: 'Session with Arjun Patel completed', 
      time: '1 hour ago', 
      type: 'session', 
      icon: Video,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    { 
      title: 'New booking from Priya Sharma', 
      time: '3 hours ago', 
      type: 'booking', 
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    { 
      title: 'Received 5-star review', 
      time: '5 hours ago', 
      type: 'review', 
      icon: Star,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    },
    { 
      title: 'Profile viewed 25 times', 
      time: '1 day ago', 
      type: 'view', 
      icon: Eye,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      studentName: 'Vikash Gupta',
      topic: 'React.js Advanced Concepts',
      date: 'Today',
      time: '4:00 PM',
      duration: '60 min',
      avatar: 'VG',
      status: 'confirmed'
    },
    {
      id: 2,
      studentName: 'Sneha Reddy',
      topic: 'Career Guidance',
      date: 'Tomorrow',
      time: '10:00 AM',
      duration: '45 min',
      avatar: 'SR',
      status: 'pending'
    }
  ];

  const handleReplyMessage = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    showSuccess('Reply sent successfully!');
    setShowMessageModal(false);
    setReplyText('');
    setSelectedMessage(null);
  };

  const handleAcceptBooking = (bookingId) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'CONFIRMED' }
        : booking
    ));
    showSuccess('Booking accepted successfully!');
  };

  const handleDeclineBooking = (bookingId) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'CANCELLED' }
        : booking
    ));
    showInfo('Booking declined.');
  };

  const handleRescheduleBooking = (booking) => {
    setSelectedBooking(booking);
    setRescheduleData({
      date: booking.date,
      time: booking.time
    });
    setShowRescheduleModal(true);
  };

  const handleSaveReschedule = () => {
    setBookings(prev => prev.map(booking => 
      booking.id === selectedBooking.id 
        ? { ...booking, date: rescheduleData.date, time: rescheduleData.time, status: 'CONFIRMED' }
        : booking
    ));
    setShowRescheduleModal(false);
    showSuccess('Session rescheduled successfully!');
  };

  const handleJoinSession = (sessionId) => {
    showInfo('Joining session...');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="group relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
            <div className={`absolute inset-0 ${stat.bg} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-16 h-16 ${stat.lightBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={stat.color} size={28} />
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-600 font-semibold bg-white/70 px-3 py-1 rounded-full">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-700 text-sm font-semibold">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2">
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Upcoming Sessions</h3>
                  <p className="text-gray-700 text-sm mt-1">✨ Your scheduled mentoring sessions</p>
                </div>
                <Button variant="outline" size="sm" className="bg-white/70 backdrop-blur-sm border-white/50 hover:bg-white/90 shadow-lg">
                  View All
                </Button>
              </div>
              <div className="space-y-6">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 hover:border-white/80 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1">
                    <div className="relative p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                            {session.avatar}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{session.studentName}</h4>
                            <p className="text-gray-600 text-sm">{session.topic}</p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                              <span>{session.date} • {session.time}</span>
                              <span>{session.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-green-600 to-emerald-600"
                            onClick={() => handleJoinSession(session.id)}
                          >
                            <Video className="mr-2" size={14} />
                            Join
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 overflow-hidden">
            <div className="relative">
              <h3 className="text-xl font-black bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 ${activity.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <activity.icon className={activity.color} size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 overflow-hidden">
            <div className="relative">
              <h3 className="text-xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start bg-white/60 backdrop-blur-sm border-white/60 hover:bg-teal-50 hover:border-teal-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={handleSetAvailability}
                >
                  <Calendar className="mr-3 text-teal-600" size={16} />
                  Set Availability
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start bg-white/60 backdrop-blur-sm border-white/60 hover:bg-cyan-50 hover:border-cyan-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={handleUpdatePricing}
                >
                  <DollarSign className="mr-3 text-cyan-600" size={16} />
                  Update Pricing
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start bg-white/60 backdrop-blur-sm border-white/60 hover:bg-emerald-50 hover:border-emerald-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={handleEditProfile}
                >
                  <Edit className="mr-3 text-emerald-600" size={16} />
                  Edit Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start bg-white/60 backdrop-blur-sm border-white/60 hover:bg-orange-50 hover:border-orange-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={handleViewAnalytics}
                >
                  <BarChart3 className="mr-3 text-orange-600" size={16} />
                  View Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Session Bookings</h2>
          <p className="text-gray-600">Manage your upcoming and past sessions</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  {booking.avatar}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{booking.studentName}</h4>
                  <p className="text-gray-600">{booking.studentEmail}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full font-semibold ${
                booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {booking.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold">{new Date(booking.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-semibold">{booking.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold">{booking.duration} min</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-semibold text-green-600">₹{booking.amount}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500">Topic</p>
              <p className="font-semibold">{booking.topic}</p>
            </div>
            
            <div className="flex space-x-3">
              {booking.status === 'PENDING' && (
                <>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-green-600 to-emerald-600"
                    onClick={() => handleAcceptBooking(booking.id)}
                  >
                    <CheckCircle className="mr-2" size={14} />
                    Accept
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-red-600 to-red-700"
                    onClick={() => handleDeclineBooking(booking.id)}
                  >
                    <X className="mr-2" size={14} />
                    Decline
                  </Button>
                </>
              )}
              {booking.status === 'CONFIRMED' && (
                <>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-600 to-blue-700"
                    onClick={() => handleJoinSession(booking.id)}
                  >
                    <Video className="mr-2" size={14} />
                    Join Session
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleRescheduleBooking(booking)}
                  >
                    <Calendar className="mr-2" size={14} />
                    Reschedule
                  </Button>
                </>
              )}
              {booking.status === 'CANCELLED' && (
                <Button 
                  size="sm" 
                  variant="outline"
                  disabled
                  className="opacity-50 cursor-not-allowed"
                >
                  Cancelled
                </Button>
              )}
              <Button size="sm" variant="outline">
                <MessageCircle className="mr-2" size={14} />
                Message
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Messages</h2>
          <p className="text-gray-600">Communicate with your students</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 ${
            message.status === 'unread' ? 'border-l-4 border-l-teal-500' : ''
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  {message.avatar}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{message.studentName}</h4>
                  <p className="text-gray-600 text-sm">{message.studentEmail}</p>
                  <p className="text-gray-500 text-xs">{message.timestamp}</p>
                </div>
              </div>
              {message.status === 'unread' && (
                <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
              )}
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{message.message}</p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-teal-600 to-cyan-600"
                onClick={() => handleReplyMessage(message)}
              >
                <Mail className="mr-2" size={14} />
                Reply
              </Button>
              <Button size="sm" variant="outline">
                <Calendar className="mr-2" size={14} />
                Schedule Session
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50/30 to-emerald-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/10 to-cyan-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-200/10 to-emerald-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-200/5 to-cyan-200/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 p-6 space-y-8">
        {/* Header */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                Mentor Dashboard
              </h1>
              <p className="text-gray-700 text-xl font-medium">Ready to inspire and guide students today? 🚀</p>
            </div>
            <div className="flex space-x-4">
              <Button 
                className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 hover:from-teal-600 hover:via-cyan-600 hover:to-emerald-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-bold"
                onClick={handleSetAvailability}
              >
                <Calendar className="mr-3" size={20} />
                Set Availability
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-bold"
                onClick={handleViewAnalytics}
              >
                <BarChart3 className="mr-3" size={20} />
                View Analytics
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-3 overflow-hidden">
          <nav className="relative flex space-x-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center space-x-3 py-4 px-8 rounded-2xl font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 text-white shadow-xl scale-105'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/80 backdrop-blur-sm shadow-md'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'messages' && renderMessages()}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                  <p className="text-gray-600">Track your performance and earnings</p>
                </div>
                <Button className="bg-gradient-to-r from-teal-600 to-cyan-600">
                  <FileText className="mr-2" size={16} />
                  Download Report
                </Button>
              </div>
              
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="text-blue-600" size={24} />
                    </div>
                    <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">+15%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">156</h3>
                  <p className="text-gray-600 text-sm">Total Students</p>
                </div>
                
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="text-green-600" size={24} />
                    </div>
                    <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">+22%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">₹45,000</h3>
                  <p className="text-gray-600 text-sm">This Month</p>
                </div>
                
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Star className="text-purple-600" size={24} />
                    </div>
                    <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">+0.2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">4.9</h3>
                  <p className="text-gray-600 text-sm">Avg Rating</p>
                </div>
                
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Video className="text-orange-600" size={24} />
                    </div>
                    <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">+8</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">89</h3>
                  <p className="text-gray-600 text-sm">Sessions Done</p>
                </div>
              </div>
              
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Earnings</h3>
                  <div className="space-y-4">
                    {[
                      { month: 'Jan', amount: 32000, percentage: 70 },
                      { month: 'Feb', amount: 38000, percentage: 80 },
                      { month: 'Mar', amount: 42000, percentage: 90 },
                      { month: 'Apr', amount: 45000, percentage: 100 }
                    ].map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-semibold text-gray-700 w-8">{data.month}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                            <div 
                              className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${data.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-900">₹{data.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Student Feedback</h3>
                  <div className="space-y-4">
                    {[
                      { rating: 5, count: 89, percentage: 85 },
                      { rating: 4, count: 12, percentage: 12 },
                      { rating: 3, count: 2, percentage: 2 },
                      { rating: 2, count: 1, percentage: 1 },
                      { rating: 1, count: 0, percentage: 0 }
                    ].map((data, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-semibold text-gray-700">{data.rating}</span>
                          <Star className="text-yellow-500" size={14} fill="currentColor" />
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${data.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{data.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'profile' && (
            <div className="max-w-4xl">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-12">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <User className="text-teal-600" size={40} />
                    </div>
                    <div className="text-white">
                      <h2 className="text-3xl font-bold">{profileData.fullName}</h2>
                      <p className="text-teal-100 text-lg">{profileData.expertise}</p>
                      <p className="text-teal-100">{profileData.company} • {profileData.experience}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        {isEditingProfile ? (
                          <input 
                            type="text"
                            value={profileData.fullName}
                            onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        ) : (
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.fullName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        {isEditingProfile ? (
                          <input 
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        ) : (
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expertise</label>
                        {isEditingProfile ? (
                          <input 
                            type="text"
                            value={profileData.expertise}
                            onChange={(e) => setProfileData({...profileData, expertise: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        ) : (
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.expertise}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                        {isEditingProfile ? (
                          <input 
                            type="text"
                            value={profileData.experience}
                            onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        ) : (
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.experience}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                        {isEditingProfile ? (
                          <input 
                            type="text"
                            value={profileData.company}
                            onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        ) : (
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.company}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate</label>
                        {isEditingProfile ? (
                          <input 
                            type="number"
                            value={profileData.hourlyRate}
                            onChange={(e) => setProfileData({...profileData, hourlyRate: parseInt(e.target.value)})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        ) : (
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">₹{profileData.hourlyRate}/session</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Languages</label>
                        {isEditingProfile ? (
                          <input 
                            type="text"
                            value={profileData.languages}
                            onChange={(e) => setProfileData({...profileData, languages: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        ) : (
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.languages}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                    {isEditingProfile ? (
                      <textarea 
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 h-24"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profileData.bio}</p>
                    )}
                  </div>
                  
                  <div className="mt-8 flex space-x-4">
                    {isEditingProfile ? (
                      <>
                        <Button 
                          className="bg-gradient-to-r from-teal-600 to-cyan-600"
                          onClick={handleSaveProfile}
                        >
                          Save Changes
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setIsEditingProfile(false)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          className="bg-gradient-to-r from-teal-600 to-cyan-600"
                          onClick={() => setIsEditingProfile(true)}
                        >
                          <Edit className="mr-2" size={16} />
                          Edit Profile
                        </Button>
                        <Button variant="outline">
                          Change Password
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
                <p className="text-gray-600">Manage your account preferences and notifications</p>
              </div>
              
              {/* Account Settings */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive email updates about bookings and messages</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-gray-900">SMS Notifications</h4>
                      <p className="text-sm text-gray-600">Get SMS alerts for urgent updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-gray-900">Profile Visibility</h4>
                      <p className="text-sm text-gray-600">Make your profile visible to students</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Privacy Settings */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Privacy & Security</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="mr-3 text-teal-600" size={16} />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-3 text-cyan-600" size={16} />
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-3 text-emerald-600" size={16} />
                    Download My Data
                  </Button>
                </div>
              </div>
              
              {/* Payment Settings */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Settings</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Bank Account</h4>
                    <p className="text-sm text-gray-600 mb-3">HDFC Bank • ****1234</p>
                    <Button size="sm" variant="outline">
                      Update Bank Details
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Tax Information</h4>
                    <p className="text-sm text-gray-600 mb-3">PAN: ABCDE****F</p>
                    <Button size="sm" variant="outline">
                      Update Tax Details
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Danger Zone */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-red-200 p-6">
                <h3 className="text-xl font-bold text-red-600 mb-6">Danger Zone</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">Deactivate Account</h4>
                    <p className="text-sm text-red-700 mb-3">Temporarily disable your mentor profile</p>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Deactivate Account
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">Delete Account</h4>
                    <p className="text-sm text-red-700 mb-3">Permanently delete your account and all data</p>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Availability Modal */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white sticky top-0">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Set Your Availability</h3>
                <button 
                  onClick={() => setShowAvailabilityModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {Object.entries(availability).map(([day, schedule]) => (
                <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <input 
                      type="checkbox"
                      checked={schedule.available}
                      onChange={(e) => setAvailability(prev => ({
                        ...prev,
                        [day]: { ...prev[day], available: e.target.checked }
                      }))}
                      className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <span className="font-semibold capitalize text-gray-900">{day}</span>
                  </div>
                  {schedule.available && (
                    <div className="flex items-center space-x-2">
                      <input 
                        type="time"
                        value={schedule.startTime}
                        onChange={(e) => setAvailability(prev => ({
                          ...prev,
                          [day]: { ...prev[day], startTime: e.target.value }
                        }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <span className="text-gray-500">to</span>
                      <input 
                        type="time"
                        value={schedule.endTime}
                        onChange={(e) => setAvailability(prev => ({
                          ...prev,
                          [day]: { ...prev[day], endTime: e.target.value }
                        }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowAvailabilityModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600"
                  onClick={handleSaveAvailability}
                >
                  Save Availability
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-md">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Update Pricing</h3>
                <button 
                  onClick={() => setShowPricingModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Session Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input 
                    type="number"
                    value={pricing.sessionPrice}
                    onChange={(e) => setPricing(prev => ({ ...prev, sessionPrice: parseInt(e.target.value) }))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="500"
                  />
                </div>
              </div>
              
              <div className="bg-cyan-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Pricing Guidelines</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Beginner mentors: ₹300-500/session</li>
                  <li>• Experienced mentors: ₹500-1000/session</li>
                  <li>• Expert mentors: ₹1000+/session</li>
                </ul>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowPricingModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600"
                  onClick={handleSavePricing}
                >
                  Update Price
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-md">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Reschedule Session</h3>
                <button 
                  onClick={() => setShowRescheduleModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Current Schedule</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">Student: <span className="font-medium text-gray-900">{selectedBooking?.studentName}</span></p>
                  <p className="text-gray-600">Topic: <span className="font-medium text-gray-900">{selectedBooking?.topic}</span></p>
                  <p className="text-gray-600">Date: <span className="font-medium text-gray-900">{selectedBooking?.date}</span></p>
                  <p className="text-gray-600">Time: <span className="font-medium text-gray-900">{selectedBooking?.time}</span></p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Date</label>
                <input 
                  type="date"
                  value={rescheduleData.date}
                  onChange={(e) => setRescheduleData({...rescheduleData, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Time</label>
                <select 
                  value={rescheduleData.time}
                  onChange={(e) => setRescheduleData({...rescheduleData, time: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                </select>
              </div>
              
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Student will be notified about the reschedule request.
                </p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowRescheduleModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600"
                  onClick={handleSaveReschedule}
                  disabled={!rescheduleData.date || !rescheduleData.time}
                >
                  Confirm Reschedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Reply Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-md">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Reply to {selectedMessage?.studentName}</h3>
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Original message:</p>
                <p className="text-gray-900">{selectedMessage?.message}</p>
              </div>
              
              <textarea 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 h-32 resize-none"
              />
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowMessageModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600"
                  onClick={handleSendReply}
                >
                  Send Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;