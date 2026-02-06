import { useState } from 'react';
import { 
  Users, Star, Calendar, MessageCircle, Video, Clock,
  Award, BookOpen, TrendingUp, Filter, Search,
  MapPin, DollarSign, CheckCircle, Heart, Share2
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useToast } from '../contexts/ToastContext';

const Mentors = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookedMentors, setBookedMentors] = useState(new Set()); // Track booked mentors
  const { showSuccess, showInfo } = useToast();

  const filters = [
    { id: 'all', label: 'All Mentors', count: 24 },
    { id: 'available', label: 'Available Now', count: 12 },
    { id: 'top-rated', label: 'Top Rated', count: 8 },
    { id: 'premium', label: 'Premium', count: 6 }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Priya Sharma',
      title: 'Senior Full Stack Developer',
      company: 'Google',
      expertise: ['React', 'Node.js', 'System Design', 'Career Guidance'],
      experience: '8+ years',
      rating: 4.9,
      reviews: 156,
      sessions: 320,
      price: 500,
      location: 'Bangalore, India',
      languages: ['English', 'Hindi'],
      available: true,
      nextSlot: 'Today 3:00 PM',
      responseTime: '< 2 hours',
      image: 'PS',
      color: 'from-blue-500 to-cyan-500',
      bio: 'Passionate full-stack developer with expertise in modern web technologies.',
      achievements: ['Google Developer Expert', 'Tech Speaker', 'Open Source Contributor'],
      specialties: ['Career Transition', 'Technical Interviews', 'System Design'],
      isPremium: true
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      title: 'Data Science Lead',
      company: 'Microsoft',
      expertise: ['Python', 'Machine Learning', 'Data Analysis', 'AI'],
      experience: '10+ years',
      rating: 4.8,
      reviews: 203,
      sessions: 450,
      price: 700,
      location: 'Hyderabad, India',
      languages: ['English', 'Hindi', 'Telugu'],
      available: false,
      nextSlot: 'Tomorrow 10:00 AM',
      responseTime: '< 4 hours',
      image: 'RK',
      color: 'from-purple-500 to-pink-500',
      bio: 'Data Science expert helping students master ML/AI concepts.',
      achievements: ['Microsoft MVP', 'Kaggle Grandmaster', 'AI Research Publications'],
      specialties: ['Machine Learning', 'Data Science Career', 'Research Guidance'],
      isPremium: true
    },
    {
      id: 3,
      name: 'Anita Singh',
      title: 'Senior UI/UX Designer',
      company: 'Adobe',
      expertise: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
      experience: '6+ years',
      rating: 4.7,
      reviews: 89,
      sessions: 180,
      price: 400,
      location: 'Mumbai, India',
      languages: ['English', 'Hindi', 'Marathi'],
      available: true,
      nextSlot: 'Today 5:00 PM',
      responseTime: '< 1 hour',
      image: 'AS',
      color: 'from-pink-500 to-rose-500',
      bio: 'Creative designer passionate about creating user-centered designs.',
      achievements: ['Adobe Certified Expert', 'Design Awards Winner', 'UX Community Leader'],
      specialties: ['Portfolio Review', 'Design Thinking', 'Career Guidance'],
      isPremium: false
    }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'available' && mentor.available) ||
      (activeFilter === 'top-rated' && mentor.rating >= 4.8) ||
      (activeFilter === 'premium' && mentor.isPremium);
    
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleBookSession = (mentorName, mentorId) => {
    // Mark mentor as booked
    setBookedMentors(prev => new Set([...prev, mentorId]));
    showSuccess(`Session booked with ${mentorName}!`);
  };

  const handleSendMessage = (mentorName) => {
    showInfo(`Opening chat with ${mentorName}...`);
  };

  const handleViewProfile = (mentor) => {
    setSelectedMentor(mentor);
  };

  const handleFavorite = (mentorName) => {
    showSuccess(`${mentorName} added to favorites!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Expert Mentors
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with industry experts and accelerate your career growth with personalized guidance
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search mentors by name, skill, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeFilter === filter.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Mentor Header */}
              <div className={`h-24 bg-gradient-to-r ${mentor.color} flex items-center justify-center relative`}>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
                  {mentor.image}
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  {mentor.isPremium && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-semibold">
                      Premium
                    </span>
                  )}
                  <button
                    onClick={() => handleFavorite(mentor.name)}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30"
                  >
                    <Heart className="text-white" size={16} />
                  </button>
                </div>
              </div>

              {/* Mentor Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    bookedMentors.has(mentor.id) ? 'bg-orange-100 text-orange-700' :
                    mentor.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {bookedMentors.has(mentor.id) ? 'Booked by You' : 
                     mentor.available ? 'Available' : 'Busy'}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1">{mentor.title}</p>
                <p className="text-sm font-semibold text-blue-600 mb-3">{mentor.company}</p>

                {/* Rating and Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-500" size={16} fill="currentColor" />
                    <span className="text-sm font-semibold">{mentor.rating}</span>
                    <span className="text-xs text-gray-500">({mentor.reviews} reviews)</span>
                  </div>
                  <span className="text-sm text-gray-600">{mentor.sessions} sessions</span>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.expertise.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{mentor.expertise.length - 3}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="mr-2" size={14} />
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2" size={14} />
                    <span>Response: {mentor.responseTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2" size={14} />
                    <span>Next: {mentor.nextSlot}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-green-600">₹{mentor.price}/session</span>
                  <span className="text-xs text-gray-500">{mentor.experience}</span>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Button 
                      className={`flex-1 ${
                        bookedMentors.has(mentor.id) ? 'bg-gray-400' :
                        mentor.available ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-400'
                      }`}
                      disabled={bookedMentors.has(mentor.id) || !mentor.available}
                      onClick={() => {
                        if (!bookedMentors.has(mentor.id) && mentor.available) {
                          handleBookSession(mentor.name, mentor.id);
                        }
                      }}
                    >
                      <Calendar className="mr-2" size={16} />
                      {bookedMentors.has(mentor.id) ? 'Already Booked' :
                       mentor.available ? 'Book Session' : 'Notify Me'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSendMessage(mentor.name)}
                    >
                      <MessageCircle size={16} />
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleViewProfile(mentor)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Mentor Profile Modal */}
        {selectedMentor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className={`bg-gradient-to-r ${selectedMentor.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-gray-700">
                      {selectedMentor.image}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedMentor.name}</h2>
                      <p className="text-white/80">{selectedMentor.title}</p>
                      <p className="text-white/80">{selectedMentor.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMentor(null)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600">{selectedMentor.bio}</p>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Achievements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.achievements.map((achievement, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.specialties.map((specialty, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedMentor.rating}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedMentor.sessions}</div>
                    <div className="text-sm text-gray-600">Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedMentor.reviews}</div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <Button 
                    className={`flex-1 ${
                      bookedMentors.has(selectedMentor.id) ? 'bg-gray-400' :
                      selectedMentor.available ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-400'
                    }`}
                    disabled={bookedMentors.has(selectedMentor.id) || !selectedMentor.available}
                    onClick={() => {
                      if (!bookedMentors.has(selectedMentor.id) && selectedMentor.available) {
                        handleBookSession(selectedMentor.name, selectedMentor.id);
                        setSelectedMentor(null);
                      }
                    }}
                  >
                    <Calendar className="mr-2" size={16} />
                    {bookedMentors.has(selectedMentor.id) ? 'Already Booked' :
                     `Book Session - ₹${selectedMentor.price}`}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleSendMessage(selectedMentor.name);
                      setSelectedMentor(null);
                    }}
                  >
                    <MessageCircle className="mr-2" size={16} />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentors;