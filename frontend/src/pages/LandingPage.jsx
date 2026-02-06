import { useState, useEffect } from 'react';
import { 
  BookOpen, Users, Target, TrendingUp, Star, Play, 
  ArrowRight, Sparkles, Brain, Rocket, Award, Globe,
  Code, Briefcase, MessageCircle, Video, CheckCircle, X, Mail, Search
} from 'lucide-react';
import Button from '../components/ui/Button';
import { contactAPI } from '../utils/api';
import ChatBot from '../components/ChatBot';

const LandingPage = ({ onRoleSelect }) => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [currentStory, setCurrentStory] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const animatedTexts = [
    "Transform Your Career",
    "Learn from Experts", 
    "Build Your Future",
    "Master New Skills"
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Learning",
      description: "Access 500+ courses across tech, business, and creative fields with lifetime updates",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Industry Experts",
      description: "Learn directly from professionals at Google, Microsoft, Amazon, and top startups",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Guaranteed Results",
      description: "95% of our students land their dream jobs within 6 months or get full refund",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Code,
      title: "Real-World Projects",
      description: "Build portfolio-worthy projects that impress recruiters and showcase your skills",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Students", icon: Users },
    { number: "500+", label: "Expert Mentors", icon: Award },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "100+", label: "Companies", icon: Briefcase }
  ];

  const successStories = [
    {
      name: "Anonymous",
      role: "Full Stack Developer at Google",
      image: "A1",
      story: "PathFinder AI helped me transition from mechanical engineering to tech. Got placed at Google within 6 months!",
      rating: 5
    },
    {
      name: "Anonymous",
      role: "Data Scientist at Microsoft",
      image: "A2",
      story: "The mentorship program was game-changing. My mentor guided me through every step of my career transition.",
      rating: 5
    },
    {
      name: "Anonymous",
      role: "UI/UX Designer at Adobe",
      image: "A3",
      story: "From zero design knowledge to landing my dream job at Adobe. The courses and projects were incredible!",
      rating: 5
    },
    {
      name: "Anonymous",
      role: "Software Engineer at Amazon",
      image: "A4",
      story: "The AI-powered career guidance helped me identify my strengths and land my dream role at Amazon!",
      rating: 5
    },
    {
      name: "Anonymous",
      role: "Product Manager at Flipkart",
      image: "A5",
      story: "Switched from finance to tech product management. The structured learning path made it possible!",
      rating: 5
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);
    
    const storyInterval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }, 4000);
    
    return () => {
      clearInterval(textInterval);
      clearInterval(storyInterval);
    };
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactAPI.submit(contactForm);
      alert('Thank you for contacting us! We will get back to you soon.');
      setShowContactModal(false);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      alert('Failed to submit contact form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50/30 to-emerald-50/30 relative overflow-hidden">
      <ChatBot />
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/10 to-cyan-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-200/10 to-emerald-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-200/5 to-cyan-200/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Brain className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                PathFinder AI
              </h1>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" onClick={() => setShowAboutModal(true)}>
                About Us
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowContactModal(true)}>
                Contact
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg">
                <Sparkles className="text-teal-600" size={20} />
                <span className="text-gray-700 font-semibold">India's #1 Career Platform</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  {animatedTexts[currentText]}
                </span>
                <br />
                <span className="text-gray-900">with AI Power</span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of students who transformed their careers with personalized mentorship, 
                expert-led courses, and AI-powered career guidance.
              </p>

              {/* Career Command Center Section */}
              <div className="mb-20">
                <h2 className="text-6xl font-black mb-6">
                  <span className="text-gray-900">Your Career </span>
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Command Center.
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                  Search any career role or track your multi-month growth with our 12-month odyssey track.
                </p>

                {/* Search Bar */}
                <div className="max-w-3xl mx-auto mb-8">
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search any job role (e.g. AI Engineer, Surgeon, Pilot)..."
                      className="w-full pl-14 pr-6 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-lg"
                    />
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="flex items-center justify-center gap-3 flex-wrap mb-16">
                  <span className="text-gray-600 font-semibold text-sm">POPULAR:</span>
                  {['#CivilServices', '#DataScientist', '#FashionDesigner', '#Lawyer'].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 bg-white border border-indigo-200 text-indigo-600 rounded-full text-sm font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Selection Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                {/* Student Button */}
                <div 
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 p-1 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => onRoleSelect('student')}
                >
                  <div className="relative bg-white rounded-xl px-6 py-3 group-hover:bg-transparent transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300">
                        <BookOpen className="text-white" size={16} />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
                        Join as Student
                      </h3>
                      <ArrowRight className="text-gray-400 group-hover:text-white transition-all duration-300" size={16} />
                    </div>
                  </div>
                </div>
                
                {/* Mentor Button */}
                <div 
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 p-1 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => onRoleSelect('mentor')}
                >
                  <div className="relative bg-white rounded-xl px-6 py-3 group-hover:bg-transparent transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300">
                        <Users className="text-white" size={16} />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
                        Join as Mentor
                      </h3>
                      <ArrowRight className="text-gray-400 group-hover:text-white transition-all duration-300" size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Video Button */}
              <div className="flex justify-center mb-12">
                <button className="group flex items-center space-x-4 bg-white/90 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="text-white ml-1" size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-gray-900">Watch Demo</p>
                    <p className="text-gray-600">See how it works</p>
                  </div>
                </button>
              </div>

              {/* Product Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    icon: BookOpen,
                    title: "AI-Powered Learning",
                    description: "Personalized course recommendations based on your goals",
                    color: "from-blue-500 to-cyan-500",
                    delay: "0ms"
                  },
                  {
                    icon: Users,
                    title: "Expert Mentorship",
                    description: "1-on-1 guidance from industry professionals",
                    color: "from-purple-500 to-pink-500",
                    delay: "100ms"
                  },
                  {
                    icon: Target,
                    title: "Career Assessment",
                    description: "Discover your perfect career path with smart tests",
                    color: "from-green-500 to-emerald-500",
                    delay: "200ms"
                  },
                  {
                    icon: Award,
                    title: "Industry Recognition",
                    description: "Certificates valued by top companies",
                    color: "from-orange-500 to-red-500",
                    delay: "300ms"
                  }
                ].map((card, index) => (
                  <div 
                    key={index}
                    className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in"
                    style={{ animationDelay: card.delay }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="relative p-6 text-center">
                      <div className={`w-14 h-14 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mx-auto mb-4`}>
                        <card.icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <stat.icon className="text-teal-600" size={28} />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-semibold text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                Why Choose PathFinder AI?
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Everything you need to accelerate your career growth in one platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6`}>
                      <feature.icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-gray-700">Real students, real transformations</p>
            </div>

            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentStory * 100}%)` }}>
                {successStories.map((story, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {story.image}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{story.name}</h4>
                          <p className="text-gray-600">{story.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed text-lg">"{story.story}"</p>
                      <div className="flex space-x-1">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="text-yellow-500" size={20} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-8">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStory(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentStory === index 
                        ? 'bg-teal-600 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-cyan-600/5"></div>
              <div className="relative">
                <Rocket className="mx-auto text-teal-600 mb-6" size={64} />
                <h2 className="text-4xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                  Ready to Transform Your Career?
                </h2>
                <p className="text-xl text-gray-700 mb-8">
                  Join thousands of students who are already building their dream careers
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 hover:from-teal-600 hover:via-cyan-600 hover:to-emerald-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-bold"
                    onClick={() => onRoleSelect('student')}
                  >
                    Start Learning Today
                  </Button>
                  <Button 
                    variant="outline"
                    className="px-8 py-4 text-lg font-bold border-2 border-teal-600 text-teal-600 hover:bg-teal-50"
                  >
                    Explore Courses
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-white/20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Brain className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                PathFinder AI
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Empowering careers through AI-powered learning and mentorship
            </p>
            <div className="flex justify-center space-x-6 text-gray-500">
              <a href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-teal-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-teal-600 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>

      {/* About Us Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col transform animate-scale-in">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-8 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">About PathFinder AI</h2>
                <button 
                  onClick={() => setShowAboutModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-6 overflow-y-auto">
              <div className="transform transition-all duration-500 hover:scale-[1.01]">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="mr-3 text-teal-600" size={28} />
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  PathFinder AI is dedicated to transforming career education through personalized AI-powered guidance and expert mentorship. We believe every student deserves access to quality career guidance and the opportunity to learn from industry professionals.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="mr-3 text-cyan-600" size={28} />
                  What We Offer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-5 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <Brain className="text-teal-600 mb-2" size={24} />
                    <h4 className="font-bold text-teal-900 mb-2">AI-Powered Learning</h4>
                    <p className="text-gray-700 text-sm">Personalized course recommendations based on your career goals and learning style.</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-5 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <Users className="text-cyan-600 mb-2" size={24} />
                    <h4 className="font-bold text-cyan-900 mb-2">Expert Mentorship</h4>
                    <p className="text-gray-700 text-sm">Connect with 500+ industry professionals from top companies worldwide.</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-5 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <Target className="text-emerald-600 mb-2" size={24} />
                    <h4 className="font-bold text-emerald-900 mb-2">Career Assessment</h4>
                    <p className="text-gray-700 text-sm">Discover your perfect career path with our advanced AI assessment tools.</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <Code className="text-blue-600 mb-2" size={24} />
                    <h4 className="font-bold text-blue-900 mb-2">Real Projects</h4>
                    <p className="text-gray-700 text-sm">Build portfolio-worthy projects that impress recruiters.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-teal-50 via-cyan-50 to-emerald-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                  <TrendingUp className="mr-3 text-emerald-600" size={28} />
                  Our Impact
                </h3>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="transform transition-all duration-300 hover:scale-110">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Users className="text-teal-600" size={24} />
                    </div>
                    <div className="text-4xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">50K+</div>
                    <p className="text-gray-600 font-semibold">Students Empowered</p>
                  </div>
                  <div className="transform transition-all duration-300 hover:scale-110">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <TrendingUp className="text-emerald-600" size={24} />
                    </div>
                    <div className="text-4xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">95%</div>
                    <p className="text-gray-600 font-semibold">Success Rate</p>
                  </div>
                  <div className="transform transition-all duration-300 hover:scale-110">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Award className="text-cyan-600" size={24} />
                    </div>
                    <div className="text-4xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">500+</div>
                    <p className="text-gray-600 font-semibold">Expert Mentors</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Why Choose Us?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={20} />
                    <span>Industry-recognized certifications valued by top companies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={20} />
                    <span>Lifetime access to course materials and updates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={20} />
                    <span>24/7 support from our dedicated team</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={20} />
                    <span>Money-back guarantee if not satisfied</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col transform animate-scale-in">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-8 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Contact Us</h2>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-teal-100 mt-2">We'd love to hear from you! Send us a message.</p>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="transform transition-all duration-300 hover:scale-[1.02]">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                    <input 
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:scale-[1.02]">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input 
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                  <input 
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 h-32 resize-none transition-all duration-300"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>
                
                <div className="bg-gradient-to-r from-teal-50 via-cyan-50 to-emerald-50 rounded-xl p-5 border-2 border-teal-100 transform transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <MessageCircle className="mr-2 text-teal-600" size={20} />
                    Other Ways to Reach Us
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-center"><Mail className="mr-2 text-cyan-600" size={16} /><strong>Email:</strong> <span className="ml-2">support@pathfinder.ai</span></p>
                    <p className="flex items-center"><Globe className="mr-2 text-emerald-600" size={16} /><strong>Phone:</strong> <span className="ml-2">+91 98765 43210</span></p>
                    <p className="flex items-center"><Globe className="mr-2 text-teal-600" size={16} /><strong>Address:</strong> <span className="ml-2">Bangalore, Karnataka, India</span></p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="flex-1 transform transition-all duration-300 hover:scale-105 border-2 border-gray-300 hover:border-teal-500"
                    onClick={() => setShowContactModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Mail className="mr-2" size={16} />
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;