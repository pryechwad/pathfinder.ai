import { useState, useEffect } from 'react';
import { 
  BookOpen, Target, TrendingUp, Users, Award, Calendar, 
  User, Trophy, Code, Briefcase, Clock, Star, ChevronRight,
  Play, FileText, MessageCircle, Zap, Brain, Globe, Rocket,
  CheckCircle, ArrowRight, Video, Coffee, Medal, X, Edit, Search
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useToast } from '../../contexts/ToastContext';
import { studentAPI, bookingAPI, mentorAPI } from '../../utils/api';

const StudentDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showHackathonModal, setShowHackathonModal] = useState(false);
  const [showAIChatModal, setShowAIChatModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [bookedSessions, setBookedSessions] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    grade: '',
    school: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hackathonData, setHackathonData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    skills: '',
    experience: 'beginner'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    topic: '',
    duration: '60'
  });
  const [paymentData, setPaymentData] = useState({
    orderId: '',
    paymentId: '',
    amount: 0
  });
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [dashboardResponse, mentorsResponse] = await Promise.all([
          studentAPI.getDashboard(user.id),
          mentorAPI.getAll()
        ]);
        setDashboardData(dashboardResponse.data);
        setBookedSessions(dashboardResponse.data.user.bookings || []);
        setMentors(mentorsResponse.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
        setLoading(false);
      }
    };
    if (user?.id) fetchDashboardData();
  }, [user]);

  const assessmentQuestions = [
    {
      id: 1,
      question: "What is your primary career interest?",
      options: ["Technology", "Business", "Creative Arts", "Healthcare"],
      type: "single"
    },
    {
      id: 2,
      question: "Which programming languages do you know?",
      options: ["JavaScript", "Python", "Java", "C++", "None"],
      type: "multiple"
    },
    {
      id: 3,
      question: "What is your experience level?",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      type: "single"
    }
  ];

  const stats = [
    { 
      label: 'Courses Completed', 
      value: dashboardData?.stats?.coursesCompleted?.toString() || '0', 
      icon: BookOpen, 
      color: 'text-blue-600', 
      bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      change: '+2 this week'
    },
    { 
      label: 'Career Goals', 
      value: dashboardData?.stats?.careerGoals?.toString() || '0', 
      icon: Target, 
      color: 'text-purple-600', 
      bg: 'bg-gradient-to-r from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      change: 'On track'
    },
    { 
      label: 'Skill Progress', 
      value: `${dashboardData?.stats?.skillProgress || 0}%`, 
      icon: TrendingUp, 
      color: 'text-green-600', 
      bg: 'bg-gradient-to-r from-green-500 to-green-600',
      lightBg: 'bg-green-50',
      change: '+12% this month'
    },
    { 
      label: 'Mentor Sessions', 
      value: dashboardData?.stats?.mentorSessions?.toString() || '0', 
      icon: Users, 
      color: 'text-orange-600', 
      bg: 'bg-gradient-to-r from-orange-500 to-orange-600',
      lightBg: 'bg-orange-50',
      change: `${bookedSessions.filter(b => b.status === 'CONFIRMED').length} upcoming`
    }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'course_enrollment': return BookOpen;
      case 'course_completion': return CheckCircle;
      case 'session': return Video;
      case 'assessment': return Target;
      default: return Medal;
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'course_enrollment': return { color: 'text-blue-600', bg: 'bg-blue-100' };
      case 'course_completion': return { color: 'text-green-600', bg: 'bg-green-100' };
      case 'session': return { color: 'text-purple-600', bg: 'bg-purple-100' };
      case 'assessment': return { color: 'text-orange-600', bg: 'bg-orange-100' };
      default: return { color: 'text-yellow-600', bg: 'bg-yellow-100' };
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return `${Math.floor(diff / 604800)} weeks ago`;
  };

  const recentActivities = (dashboardData?.user?.activities || []).map(activity => ({
    title: activity.title,
    time: getTimeAgo(activity.timestamp),
    type: activity.type,
    icon: getActivityIcon(activity.type),
    ...getActivityColor(activity.type)
  }));

  const recommendedPaths = [
    {
      title: 'Full Stack Developer',
      match: '92%',
      description: 'Master modern web development with React, Node.js, and cloud technologies',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      salary: '₹8-15 LPA',
      demand: 'Very High',
      duration: '6 months',
      students: '12,000+',
      rating: 4.8,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Data Scientist',
      match: '78%',
      description: 'Dive into AI/ML, data analysis, and predictive modeling',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
      salary: '₹10-20 LPA',
      demand: 'High',
      duration: '8 months',
      students: '8,500+',
      rating: 4.7,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const upcomingEvents = [
    { 
      title: 'CodeStorm Hackathon 2024', 
      date: 'Dec 15-17', 
      type: 'hackathon', 
      participants: '2,500+ developers',
      prize: '₹5 Lakh',
      color: 'from-purple-500 to-indigo-500',
      icon: Code
    },
    { 
      title: 'Tech Career Fair', 
      date: 'Dec 20', 
      type: 'career', 
      participants: '100+ companies',
      prize: 'Dream Job',
      color: 'from-green-500 to-teal-500',
      icon: Briefcase
    },
    { 
      title: 'AI Workshop Series', 
      date: 'Dec 25-30', 
      type: 'workshop', 
      participants: '500+ students',
      prize: 'Certificate',
      color: 'from-orange-500 to-red-500',
      icon: Brain
    }
  ];

  const practiceProblems = [
    { 
      title: 'Array Manipulation Challenge', 
      difficulty: 'Easy', 
      solved: true, 
      points: 10,
      category: 'Data Structures',
      time: '15 min'
    },
    { 
      title: 'Binary Tree Traversal', 
      difficulty: 'Medium', 
      solved: false, 
      points: 25,
      category: 'Algorithms',
      time: '30 min'
    },
    { 
      title: 'Dynamic Programming Mastery', 
      difficulty: 'Hard', 
      solved: false, 
      points: 50,
      category: 'Advanced',
      time: '60 min'
    }
  ];

  const handleEnrollCourse = (courseTitle) => {
    showSuccess(`Successfully enrolled in ${courseTitle}!`);
  };

  const handleBookSession = (mentor) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  const { showSuccess, showInfo, showWarning } = useToast();

  const handleBookingSubmit = () => {
    if (!bookingData.date || !bookingData.time || !bookingData.topic) {
      showWarning('Please fill all required fields!');
      return;
    }
    const amount = selectedMentor.price || 500;
    setPaymentData({
      orderId: 'ORD' + Date.now(),
      paymentId: 'PAY' + Date.now(),
      amount: amount
    });
    setShowBookingModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async () => {
    try {
      const generatedPaymentId = 'PAY' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      const bookingPayload = {
        userId: user.id,
        mentorId: selectedMentor?.id || 'default-mentor-id',
        date: bookingData.date,
        time: bookingData.time,
        topic: bookingData.topic,
        duration: bookingData.duration,
        amount: paymentData.amount,
        paymentId: generatedPaymentId
      };
      
      const response = await bookingAPI.create(bookingPayload);
      
      setBookedSessions(prev => [...prev, response.data]);
      
      setShowPaymentModal(false);
      setShowSuccessModal(true);
      setPaymentData(prev => ({...prev, paymentId: generatedPaymentId}));
      showSuccess(`Session booked successfully! Order ID: ${response.data.orderId}`);
      
      // Refresh dashboard data
      const dashboardResponse = await studentAPI.getDashboard(user.id);
      setDashboardData(dashboardResponse.data);
    } catch (error) {
      console.error('Booking error:', error);
      showWarning('Failed to book session. Please try again.');
    }
  };

  const handleStartAssessment = () => {
    setShowAssessmentModal(true);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleStartTest = () => {
    setShowTestModal(true);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleRegisterHackathon = () => {
    setHackathonData({
      name: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      college: user.school || '',
      skills: '',
      experience: 'beginner'
    });
    setShowHackathonModal(true);
  };

  const handleHackathonSubmit = () => {
    if (!hackathonData.name || !hackathonData.email || !hackathonData.skills) {
      showWarning('Please fill all required fields!');
      return;
    }
    setShowHackathonModal(false);
    showSuccess('Successfully registered for hackathon!');
  };

  const handleReschedule = (booking) => {
    setSelectedBooking(booking);
    setBookingData({
      date: booking.date.split('T')[0],
      time: booking.time,
      topic: booking.topic,
      duration: booking.duration.toString()
    });
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = async () => {
    if (!bookingData.date || !bookingData.time) {
      showWarning('Please select date and time!');
      return;
    }
    try {
      await bookingAPI.updateStatus(selectedBooking.id, {
        date: bookingData.date,
        time: bookingData.time,
        topic: bookingData.topic,
        duration: parseInt(bookingData.duration)
      });
      setShowRescheduleModal(false);
      showSuccess('Session rescheduled successfully!');
      const dashboardResponse = await studentAPI.getDashboard(user.id);
      setDashboardData(dashboardResponse.data);
      setBookedSessions(dashboardResponse.data.user.bookings || []);
    } catch (error) {
      showWarning('Failed to reschedule. Please try again.');
    }
  };

  const handleViewReceipt = (booking) => {
    setSelectedBooking(booking);
    setShowReceiptModal(true);
  };

  const handleDownloadReceipt = () => {
    const printContent = document.getElementById('receipt-content');
    const originalContent = document.body.innerHTML;
    
    // Add print styles
    const printStyles = `
      <style>
        @media print {
          @page { size: A4; margin: 0; }
          body { margin: 0; padding: 20px; }
          * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
      </style>
    `;
    
    document.body.innerHTML = printStyles + printContent.outerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowAssessmentModal(false);
      setShowTestModal(false);
      showSuccess('Assessment completed successfully!');
    }
  };

  const handleScheduleSession = () => {
    // Check if there are any available mentors
    const availableMentor = mentors.find(m => m.available);
    
    if (availableMentor) {
      setSelectedMentor(availableMentor);
      setShowBookingModal(true);
    } else if (mentors.length > 0) {
      // If no mentor is available, use the first mentor
      setSelectedMentor(mentors[0]);
      setShowBookingModal(true);
    } else {
      showWarning('No mentors available at the moment. Please try again later.');
    }
  };

  const handleJoinEvent = (eventTitle) => {
    showInfo(`Registered for ${eventTitle}!`);
  };

  const handleEditProfile = () => {
    setProfileData({
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      city: user.city || '',
      grade: user.grade || '',
      school: user.school || ''
    });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    showSuccess('Profile updated successfully!');
  };

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
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Career Paths */}
        <div className="lg:col-span-2">
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-teal-100/20 to-cyan-100/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Recommended Career Paths</h3>
                  <p className="text-gray-700 text-sm mt-1">✨ Personalized based on your skills and interests</p>
                </div>
                <Button variant="outline" size="sm" className="bg-white/70 backdrop-blur-sm border-white/50 hover:bg-white/90 shadow-lg">
                  View All
                </Button>
              </div>
              <div className="space-y-8">
                {recommendedPaths.map((path, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 hover:border-white/80 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1">
                    <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${path.color} shadow-lg`}></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
                    <div className="relative p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">{path.title}</h4>
                          <p className="text-gray-600 text-sm">{path.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-2">
                            {path.match} match
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="text-yellow-500 mr-1" size={14} fill="currentColor" />
                            {path.rating}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Salary Range</p>
                          <p className="font-semibold text-green-600">{path.salary}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Duration</p>
                          <p className="font-semibold text-gray-900">{path.duration}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Students</p>
                          <p className="font-semibold text-gray-900">{path.students}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Demand</p>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            path.demand === 'Very High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {path.demand}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {path.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 hover:from-teal-600 hover:via-cyan-600 hover:to-emerald-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        onClick={() => handleEnrollCourse(path.title)}
                      >
                        <Rocket className="mr-2" size={16} />
                        Start Learning Path
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
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
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-cyan-100/30 to-emerald-100/30 rounded-full blur-2xl"></div>
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
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-tr from-teal-100/30 to-cyan-100/30 rounded-full blur-2xl"></div>
            <div className="relative">
              <h3 className="text-xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start bg-white/60 backdrop-blur-sm border-white/60 hover:bg-teal-50 hover:border-teal-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                  onClick={handleStartAssessment}
                >
                  <Target className="mr-3 text-teal-600 flex-shrink-0" size={16} />
                  <span className="truncate">Take Career Assessment</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start bg-white/60 backdrop-blur-sm border-white/60 hover:bg-cyan-50 hover:border-cyan-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                  onClick={handleScheduleSession}
                >
                  <Calendar className="mr-3 text-cyan-600 flex-shrink-0" size={16} />
                  <span className="truncate">Schedule Session</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start bg-white/60 backdrop-blur-sm border-white/60 hover:bg-emerald-50 hover:border-emerald-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                  onClick={() => showInfo('Certificates page opened!')}
                >
                  <Award className="mr-3 text-emerald-600 flex-shrink-0" size={16} />
                  <span className="truncate">View Certificates</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start bg-white/60 backdrop-blur-sm border-white/60 hover:bg-orange-50 hover:border-orange-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                  onClick={handleStartTest}
                >
                  <Code className="mr-3 text-orange-600 flex-shrink-0" size={16} />
                  <span className="truncate">Practice Problems</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Compact Profile Header */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500">
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
              <User className="text-teal-600" size={40} />
            </div>
          </div>
        </div>
        
        <div className="pt-16 px-6 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-black text-gray-900">{user.fullName || 'Student Name'}</h2>
              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                <span>{user.grade ? `Grade ${user.grade}` : 'Grade Not Set'}</span>
                <span>•</span>
                <span>{user.city || 'Location Not Set'}</span>
              </div>
            </div>
            {!isEditingProfile && (
              <Button size="sm" className="bg-gradient-to-r from-teal-600 to-cyan-600" onClick={handleEditProfile}>
                <Edit className="mr-2" size={14} />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Compact Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-6">
          <h3 className="text-lg font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">Personal Info</h3>
          {isEditingProfile && (
            <div className="flex gap-2 mb-4">
              <Button size="sm" className="bg-gradient-to-r from-teal-600 to-cyan-600" onClick={handleSaveProfile}>Save</Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
            </div>
          )}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Email</label>
              {isEditingProfile ? (
                <input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              ) : (
                <p className="text-sm text-gray-900 font-medium">{user.email}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Phone</label>
              {isEditingProfile ? (
                <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              ) : (
                <p className="text-sm text-gray-900 font-medium">{user.phone || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">School</label>
              {isEditingProfile ? (
                <input type="text" value={profileData.school} onChange={(e) => setProfileData({...profileData, school: e.target.value})} className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              ) : (
                <p className="text-sm text-gray-900 font-medium">{user.school || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-6">
          <h3 className="text-lg font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">Quick Stats</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-teal-50 rounded-xl">
              <p className="text-2xl font-black text-teal-600">{dashboardData?.user?.courses?.length || 0}</p>
              <p className="text-xs text-gray-600 mt-1">Courses</p>
            </div>
            <div className="text-center p-3 bg-cyan-50 rounded-xl">
              <p className="text-2xl font-black text-cyan-600">{bookedSessions.length}</p>
              <p className="text-xs text-gray-600 mt-1">Sessions</p>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-xl">
              <p className="text-2xl font-black text-emerald-600">{dashboardData?.stats?.skillProgress || 0}%</p>
              <p className="text-xs text-gray-600 mt-1">Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Bookings */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 px-6 py-4">
          <h3 className="text-xl font-bold text-white">Your Bookings</h3>
        </div>
        
        <div className="p-6">
          {bookedSessions.length > 0 ? (
            <div className="space-y-3">
              {bookedSessions.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{booking.mentor?.fullName || 'Mentor'}</h4>
                      <p className="text-sm text-gray-600">{booking.topic}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                      booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 text-xs mb-3">
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-semibold">{new Date(booking.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time</p>
                      <p className="font-semibold">{booking.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-semibold">{booking.duration}m</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-semibold text-green-600">₹{booking.amount}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {booking.status === 'CONFIRMED' && (
                      <>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 text-xs">
                          <Video className="mr-1" size={12} />
                          Join
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs" onClick={() => handleReschedule(booking)}>
                          <Calendar className="mr-1" size={12} />
                          Reschedule
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline" className="text-xs text-teal-600" onClick={() => handleViewReceipt(booking)}>
                      <FileText className="mr-1" size={12} />
                      Receipt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="mx-auto text-gray-400 mb-3" size={40} />
              <p className="text-gray-600 mb-3">No bookings yet</p>
              <Button size="sm" className="bg-gradient-to-r from-teal-600 to-cyan-600" onClick={handleScheduleSession}>
                Schedule Session
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderHackathons = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hackathons & Events</h2>
          <p className="text-gray-600">Participate in exciting competitions and workshops</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-purple-700" onClick={handleRegisterHackathon}>
          <Trophy className="mr-2" size={16} />
          Register for Event
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className={`h-32 bg-gradient-to-r ${event.color} flex items-center justify-center`}>
              <event.icon className="text-white" size={48} />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                  event.type === 'hackathon' ? 'bg-purple-100 text-purple-700' :
                  event.type === 'career' ? 'bg-green-100 text-green-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
                <span className="text-sm font-semibold text-gray-600">{event.date}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{event.participants}</p>
              <p className="text-sm font-semibold text-green-600 mb-4">Prize: {event.prize}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleJoinEvent(event.title)}
              >
                Register Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMentors = () => {
    const filteredMentors = mentors.filter(mentor => 
      mentor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise?.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase())) ||
      mentor.company?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Expert Mentors</h2>
          <p className="text-gray-600">Learn from industry professionals</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-green-700">
          <Users className="mr-2" size={16} />
          Find More Mentors
        </Button>
      </div>
      
      {/* Search Bar */}
      <div className="max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mentors by name, expertise, company..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.slice(0, 6).map((mentor, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {mentor.name?.substring(0, 2).toUpperCase() || 'M'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.expertise?.[0] || mentor.title}</p>
                <p className="text-xs text-gray-500">{mentor.experience} at {mentor.company}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-500" size={16} fill="currentColor" />
                <span className="text-sm font-semibold">{mentor.rating}</span>
                <span className="text-xs text-gray-500">({mentor.sessions} sessions)</span>
              </div>
              <span className="text-sm font-bold text-green-600">₹{mentor.price}/session</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                mentor.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {mentor.available ? 'Available Now' : 'Busy'}
              </span>
              <Button 
                variant={mentor.available ? 'primary' : 'outline'} 
                size="sm"
                disabled={!mentor.available}
                onClick={() => mentor.available && handleBookSession(mentor)}
                className={mentor.available ? 'bg-gradient-to-r from-blue-600 to-blue-700' : ''}
              >
                {mentor.available ? 'Book Session' : 'Notify Me'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

  const renderPractice = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Practice Arena</h2>
          <p className="text-gray-600">Sharpen your coding skills with challenges</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-600 to-orange-700">
          <Code className="mr-2" size={16} />
          View All Problems
        </Button>
      </div>
      
      <div className="space-y-4">
        {practiceProblems.map((problem, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  problem.solved ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {problem.solved ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : (
                    <Code className="text-gray-600" size={24} />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{problem.title}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-sm text-gray-600">{problem.category}</span>
                    <span className="text-sm text-gray-500">⏱️ {problem.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600 mb-2">{problem.points} pts</div>
                <Button 
                  variant={problem.solved ? 'outline' : 'primary'} 
                  size="sm"
                  className={!problem.solved ? 'bg-gradient-to-r from-blue-600 to-blue-700' : ''}
                  onClick={() => showInfo(`Opening ${problem.title}...`)}
                >
                  {problem.solved ? 'Review Solution' : 'Start Solving'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTracking = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Monthly Progress Tracking</h2>
          <p className="text-gray-600">Track your learning progress month by month</p>
        </div>
        <Button className="bg-gradient-to-r from-teal-600 to-cyan-600">
          <Calendar className="mr-2" size={16} />
          Download Report
        </Button>
      </div>
      
      {/* Month-wise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(() => {
          const currentDate = new Date();
          const months = [];
          const colors = [
            { border: 'border-teal-500', text: 'text-teal-600' },
            { border: 'border-cyan-500', text: 'text-cyan-600' },
            { border: 'border-emerald-500', text: 'text-emerald-600' }
          ];
          
          for (let i = 0; i < 3; i++) {
            const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const monthName = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            const isCurrent = i === 0;
            
            // Calculate stats for this month from bookings and activities
            const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
            const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
            
            const monthBookings = bookedSessions.filter(b => {
              const bookingDate = new Date(b.date || b.createdAt);
              return bookingDate >= monthStart && bookingDate <= monthEnd;
            });
            
            const monthActivities = (dashboardData?.user?.activities || []).filter(a => {
              const activityDate = new Date(a.timestamp);
              return activityDate >= monthStart && activityDate <= monthEnd;
            });
            
            const coursesCount = monthActivities.filter(a => a.type === 'course_enrollment').length;
            const completedCount = monthActivities.filter(a => a.type === 'course_completion').length;
            const sessionsCount = monthBookings.filter(b => b.status === 'COMPLETED').length;
            const hoursCount = sessionsCount * 1; // Assuming 1 hour per session
            
            months.push(
              <div key={i} className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${colors[i].border}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{monthName}</h3>
                  <span className={`text-sm ${colors[i].text} font-semibold`}>
                    {isCurrent ? 'Current' : 'Completed'}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Courses</span>
                    <span className={`font-bold ${colors[i].text}`}>{coursesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed</span>
                    <span className={`font-bold ${colors[i].text}`}>{completedCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hours</span>
                    <span className={`font-bold ${colors[i].text}`}>{hoursCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sessions</span>
                    <span className={`font-bold ${colors[i].text}`}>{sessionsCount}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4">
                  View Report
                </Button>
              </div>
            );
          }
          
          return months;
        })()}
      </div>
      
      {/* Overall Progress */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Overall Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Skills Progress</h4>
            <div className="space-y-4">
              {(dashboardData?.user?.courses || []).slice(0, 2).map((enrollment, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{enrollment.course?.title || 'Course'}</span>
                    <span className="text-sm font-semibold">{enrollment.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${idx === 0 ? 'bg-teal-600' : 'bg-cyan-600'}`} style={{width: `${enrollment.progress || 0}%`}}></div>
                  </div>
                </div>
              ))}
              {(!dashboardData?.user?.courses || dashboardData.user.courses.length === 0) && (
                <p className="text-sm text-gray-500">No courses enrolled yet</p>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Achievements</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Award className="text-yellow-500" size={20} />
                <span className="text-sm text-gray-700">JavaScript Basics</span>
              </div>
              <div className="flex items-center space-x-3">
                <Trophy className="text-yellow-600" size={20} />
                <span className="text-sm text-gray-700">First Hackathon</span>
              </div>
              <div className="flex items-center space-x-3">
                <Medal className="text-orange-500" size={20} />
                <span className="text-sm text-gray-700">5 Day Streak</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Total Stats</h4>
            <div className="space-y-3">
              <div className="text-center p-3 bg-teal-50 rounded-lg">
                <div className="text-2xl font-bold text-teal-600">{dashboardData?.user?.courses?.length || 0}</div>
                <div className="text-sm text-gray-600">Total Courses</div>
              </div>
              <div className="text-center p-3 bg-cyan-50 rounded-lg">
                <div className="text-2xl font-bold text-cyan-600">{dashboardData?.stats?.mentorSessions || 0}</div>
                <div className="text-sm text-gray-600">Total Sessions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'hackathons', label: 'Events', icon: Trophy },
    { id: 'mentors', label: 'Mentors', icon: Users },
    { id: 'practice', label: 'Practice', icon: Code },
    { id: 'tracking', label: 'Monthly Track', icon: Calendar }
  ];

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
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-teal-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>
          
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                Your Career Adventure Starts Here 🚀
              </h1>
              <p className="text-gray-700 text-xl font-medium">Your career journey begins now 🌟</p>
            </div>
            <div className="flex space-x-4">
              <Button 
                className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 hover:from-teal-600 hover:via-cyan-600 hover:to-emerald-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-bold whitespace-nowrap"
                onClick={handleScheduleSession}
              >
                <Calendar className="mr-3" size={20} />
                Schedule Session
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-bold whitespace-nowrap"
                onClick={() => setShowAIChatModal(true)}
              >
                <Brain className="mr-3" size={20} />
                Ask AI Mentor
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-3 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-50/30 via-cyan-50/30 to-emerald-50/30"></div>
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
                <tab.icon size={18} className={activeTab === tab.id ? '' : 'group-hover:scale-110 transition-transform'} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'hackathons' && renderHackathons()}
          {activeTab === 'mentors' && renderMentors()}
          {activeTab === 'practice' && renderPractice()}
          {activeTab === 'tracking' && renderTracking()}
        </div>
      </div>
      
      {/* Mentor Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-md my-8 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white relative sticky top-0">
              <button 
                onClick={() => setShowBookingModal(false)}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl font-bold mb-2">Book Session</h3>
              <p className="text-blue-100">with {selectedMentor?.name}</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Auto-filled Profile Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Student Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{user.fullName || 'Student'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grade:</span>
                    <span className="font-medium">{user.grade || 'Not set'}</span>
                  </div>
                </div>
              </div>
              
              {/* Mentor Info */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Mentor Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expertise:</span>
                    <span className="font-medium">{selectedMentor?.expertise}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-green-600">{selectedMentor?.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium flex items-center">
                      <Star className="text-yellow-500 mr-1" size={14} fill="currentColor" />
                      {selectedMentor?.rating}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Booking Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date *</label>
                  <input 
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Time *</label>
                  <select 
                    value={bookingData.time}
                    onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose time slot</option>
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
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Session Topic *</label>
                  <input 
                    type="text"
                    value={bookingData.topic}
                    onChange={(e) => setBookingData({...bookingData, topic: e.target.value})}
                    placeholder="e.g., React.js basics, Career guidance, Portfolio review"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <select 
                    value={bookingData.duration}
                    onChange={(e) => setBookingData({...bookingData, duration: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                  onClick={handleBookingSubmit}
                >
                  Book Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-md my-8 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white sticky top-0">
              <h3 className="text-2xl font-bold mb-2">Payment Details</h3>
              <p className="text-teal-100">Complete your session booking</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-teal-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mentor:</span>
                    <span className="font-medium">{selectedMentor?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{bookingData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{bookingData.duration} minutes</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-900 font-semibold">Total Amount:</span>
                    <span className="font-bold text-teal-600 text-lg">₹{paymentData.amount}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Order ID</label>
                  <input 
                    type="text"
                    value={paymentData.orderId}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl">
                    <option>UPI Payment</option>
                    <option>Credit/Debit Card</option>
                    <option>Net Banking</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                  onClick={handlePaymentSubmit}
                >
                  Pay ₹{paymentData.amount}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-md my-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white text-center sticky top-0">
              <CheckCircle className="mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-2">Booking Successful!</h3>
              <p className="text-green-100">Your session has been booked</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Booking Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{paymentData.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-medium">{paymentData.paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-medium text-green-600">₹{paymentData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">Confirmed</span>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                onClick={() => {
                  setShowSuccessModal(false);
                  setBookingData({ date: '', time: '', topic: '', duration: '60' });
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Assessment Modal */}
      {showAssessmentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white sticky top-0">
              <h3 className="text-2xl font-bold mb-2">Career Assessment</h3>
              <p className="text-teal-100">Question {currentQuestion + 1} of {assessmentQuestions.length}</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {assessmentQuestions[currentQuestion]?.question}
                </h4>
                
                <div className="space-y-3">
                  {assessmentQuestions[currentQuestion]?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(assessmentQuestions[currentQuestion].id, option)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                        answers[assessmentQuestions[currentQuestion].id] === option
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setShowAssessmentModal(false)}
                >
                  Exit
                </Button>
                <Button 
                  className="bg-gradient-to-r from-teal-600 to-cyan-600"
                  onClick={handleNextQuestion}
                  disabled={!answers[assessmentQuestions[currentQuestion]?.id]}
                >
                  {currentQuestion < assessmentQuestions.length - 1 ? 'Next' : 'Submit'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Test Modal */}
      {showTestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white sticky top-0">
              <h3 className="text-2xl font-bold mb-2">Practice Test</h3>
              <p className="text-orange-100">Question {currentQuestion + 1} of {assessmentQuestions.length}</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {assessmentQuestions[currentQuestion]?.question}
                </h4>
                
                <div className="space-y-3">
                  {assessmentQuestions[currentQuestion]?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(assessmentQuestions[currentQuestion].id, option)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                        answers[assessmentQuestions[currentQuestion].id] === option
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setShowTestModal(false)}
                >
                  Exit
                </Button>
                <Button 
                  className="bg-gradient-to-r from-orange-600 to-red-600"
                  onClick={handleNextQuestion}
                  disabled={!answers[assessmentQuestions[currentQuestion]?.id]}
                >
                  {currentQuestion < assessmentQuestions.length - 1 ? 'Next' : 'Submit'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hackathon Registration Modal */}
      {showHackathonModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-md my-8 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white sticky top-0">
              <button 
                onClick={() => setShowHackathonModal(false)}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl font-bold mb-2">Register for Hackathon</h3>
              <p className="text-purple-100">Join the coding competition</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text"
                  value={hackathonData.name}
                  onChange={(e) => setHackathonData({...hackathonData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input 
                  type="email"
                  value={hackathonData.email}
                  onChange={(e) => setHackathonData({...hackathonData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel"
                  value={hackathonData.phone}
                  onChange={(e) => setHackathonData({...hackathonData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">College/University</label>
                <input 
                  type="text"
                  value={hackathonData.college}
                  onChange={(e) => setHackathonData({...hackathonData, college: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Technical Skills *</label>
                <textarea 
                  value={hackathonData.skills}
                  onChange={(e) => setHackathonData({...hackathonData, skills: e.target.value})}
                  placeholder="e.g., JavaScript, Python, React, Node.js"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 h-20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                <select 
                  value={hackathonData.experience}
                  onChange={(e) => setHackathonData({...hackathonData, experience: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowHackathonModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={handleHackathonSubmit}
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Chat Modal */}
      {showAIChatModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-2xl h-[600px] flex flex-col">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">AI Career Mentor</h3>
                  <p className="text-purple-100">Get personalized career guidance</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAIChatModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-4 rounded-2xl bg-white shadow-md">
                    <p className="text-gray-800">👋 Hi! I'm your AI Career Mentor. I can help you with:</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
                      <li>• Career path recommendations</li>
                      <li>• Skill development guidance</li>
                      <li>• Course suggestions</li>
                      <li>• Interview preparation tips</li>
                    </ul>
                    <p className="mt-3 text-gray-800">What would you like to know?</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-3xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything about your career..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                />
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
                  <MessageCircle size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-md">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white rounded-t-3xl">
              <button 
                onClick={() => setShowRescheduleModal(false)}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl font-bold mb-2">Reschedule Session</h3>
              <p className="text-orange-100">Choose a new date and time</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-orange-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Current Booking</h4>
                <div className="text-sm space-y-1">
                  <p><span className="text-gray-600">Mentor:</span> <span className="font-medium">{selectedBooking?.mentor?.fullName || 'Mentor'}</span></p>
                  <p><span className="text-gray-600">Topic:</span> <span className="font-medium">{selectedBooking?.topic}</span></p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Date *</label>
                <input 
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Time *</label>
                <select 
                  value={bookingData.time}
                  onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Choose time slot</option>
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
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowRescheduleModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  onClick={handleRescheduleSubmit}
                >
                  Reschedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Receipt Modal */}
      {showReceiptModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white rounded-t-3xl flex items-center justify-between">
              <h3 className="text-2xl font-bold">Payment Receipt</h3>
              <button onClick={() => setShowReceiptModal(false)} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8" id="receipt-content" style={{maxWidth: '800px', margin: '0 auto'}}>
              {/* Receipt Header */}
              <div className="text-center mb-8 border-b-2 border-gray-200 pb-6">
                <h1 className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">PathFinder AI</h1>
                <p className="text-gray-600">Career Guidance & Mentorship Platform</p>
                <p className="text-sm text-gray-500 mt-2">Receipt #{selectedBooking.orderId}</p>
              </div>
              
              {/* Booking Details */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-600 mb-3">STUDENT DETAILS</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">Name:</span> <span className="font-semibold">{user.fullName}</span></p>
                    <p><span className="text-gray-600">Email:</span> <span className="font-semibold">{user.email}</span></p>
                    <p><span className="text-gray-600">Phone:</span> <span className="font-semibold">{user.phone || 'N/A'}</span></p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-gray-600 mb-3">MENTOR DETAILS</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">Name:</span> <span className="font-semibold">{selectedBooking.mentor?.fullName || 'Mentor'}</span></p>
                    <p><span className="text-gray-600">Expertise:</span> <span className="font-semibold">{selectedBooking.mentor?.expertise?.[0] || 'General Guidance'}</span></p>
                    <p><span className="text-gray-600">Company:</span> <span className="font-semibold">{selectedBooking.mentor?.company || 'N/A'}</span></p>
                  </div>
                </div>
              </div>
              
              {/* Session Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="text-sm font-bold text-gray-600 mb-4">SESSION DETAILS</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-semibold">{new Date(selectedBooking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Time</p>
                    <p className="font-semibold">{selectedBooking.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-semibold">{selectedBooking.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="font-semibold text-green-600">{selectedBooking.status}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Topic</p>
                    <p className="font-semibold">{selectedBooking.topic}</p>
                  </div>
                </div>
              </div>
              
              {/* Payment Details */}
              <div className="border-t-2 border-gray-200 pt-6 mb-6">
                <h4 className="text-sm font-bold text-gray-600 mb-4">PAYMENT DETAILS</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono font-semibold">{selectedBooking.orderId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-mono font-semibold">{selectedBooking.paymentId || `PAY${selectedBooking.orderId.slice(3)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Date:</span>
                    <span className="font-semibold">{new Date(selectedBooking.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-semibold">Online Payment</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-gray-600">Session Fee:</span>
                    <span className="font-semibold">₹{selectedBooking.amount}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold bg-teal-50 p-3 rounded-lg">
                    <span className="text-teal-700">Total Amount Paid:</span>
                    <span className="text-teal-700">₹{selectedBooking.amount}</span>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="text-center text-xs text-gray-500 border-t pt-4">
                <p>Thank you for choosing PathFinder AI!</p>
                <p className="mt-1">For any queries, contact us at support@pathfinder.ai</p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex gap-3 print:hidden">
              <Button variant="outline" className="flex-1" onClick={() => setShowReceiptModal(false)}>Close</Button>
              <Button className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600" onClick={handleDownloadReceipt}>
                <FileText className="mr-2" size={16} />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;