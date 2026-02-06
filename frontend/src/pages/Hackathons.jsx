import { useState } from 'react';
import { 
  Trophy, Calendar, Users, MapPin, Clock, Star,
  Award, Code, Zap, Target, ArrowRight, Play,
  CheckCircle, Gift, Medal, Crown
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useToast } from '../contexts/ToastContext';

const Hackathons = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { showSuccess, showInfo } = useToast();

  const upcomingEvents = [
    {
      id: 1,
      title: 'CodeStorm Hackathon 2024',
      description: 'Build innovative solutions for real-world problems in 48 hours',
      date: 'Dec 15-17, 2024',
      time: '9:00 AM - 6:00 PM',
      location: 'Online & Bangalore',
      participants: '2,500+ developers',
      prize: '₹5 Lakh',
      difficulty: 'All Levels',
      category: 'Web Development',
      organizer: 'TechCorp',
      registrationDeadline: 'Dec 10, 2024',
      color: 'from-purple-500 to-indigo-500',
      icon: Code,
      tags: ['React', 'Node.js', 'AI/ML', 'Blockchain'],
      status: 'Open',
      registered: false
    },
    {
      id: 2,
      title: 'AI Innovation Challenge',
      description: 'Create AI-powered applications to solve social challenges',
      date: 'Dec 20-22, 2024',
      time: '10:00 AM - 8:00 PM',
      location: 'Delhi & Online',
      participants: '1,800+ participants',
      prize: '₹3 Lakh',
      difficulty: 'Intermediate',
      category: 'Artificial Intelligence',
      organizer: 'AI Foundation',
      registrationDeadline: 'Dec 15, 2024',
      color: 'from-blue-500 to-cyan-500',
      icon: Zap,
      tags: ['Python', 'TensorFlow', 'OpenAI', 'Computer Vision'],
      status: 'Open',
      registered: true
    }
  ];

  const pastEvents = [
    {
      id: 5,
      title: 'DevFest Hackathon 2024',
      description: 'Google Developer community hackathon',
      date: 'Nov 15-17, 2024',
      participants: '2,000+ developers',
      prize: '₹2 Lakh',
      winner: 'Team Alpha',
      myRank: 15,
      color: 'from-gray-400 to-gray-500',
      icon: Trophy,
      status: 'Completed'
    }
  ];

  const myEvents = upcomingEvents.filter(event => event.registered);

  const handleRegister = (eventTitle) => {
    showSuccess(`Successfully registered for ${eventTitle}!`);
  };

  const handleViewDetails = (eventTitle) => {
    showInfo(`Opening details for ${eventTitle}...`);
  };

  const renderUpcoming = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className={`h-32 bg-gradient-to-r ${event.color} flex items-center justify-center relative`}>
              <event.icon className="text-white" size={48} />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                  event.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  event.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  event.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {event.difficulty}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                  event.registered ? 'bg-green-100 text-green-700' : 'bg-white/20 text-white'
                }`}>
                  {event.registered ? 'Registered' : event.status}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 uppercase font-semibold">{event.category}</span>
                <span className="text-xs text-gray-500">{event.organizer}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2" size={16} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2" size={16} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-2" size={16} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="mr-2" size={16} />
                  <span>{event.participants}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="text-yellow-500" size={20} />
                  <span className="font-bold text-green-600 text-lg">{event.prize}</span>
                </div>
                <span className="text-xs text-gray-500">Deadline: {event.registrationDeadline}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex space-x-2">
                {!event.registered ? (
                  <Button 
                    className={`flex-1 bg-gradient-to-r ${event.color}`}
                    onClick={() => handleRegister(event.title)}
                  >
                    <Trophy className="mr-2" size={16} />
                    Register Now
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    className="flex-1 border-green-300 text-green-600"
                    disabled
                  >
                    <CheckCircle className="mr-2" size={16} />
                    Registered
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(event.title)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPast = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {pastEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className={`h-24 bg-gradient-to-r ${event.color} flex items-center justify-center`}>
              <event.icon className="text-white" size={32} />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-900">{event.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Prize Pool</p>
                  <p className="font-semibold text-green-600">{event.prize}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Winner</p>
                  <p className="font-semibold text-gray-900">{event.winner}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">My Rank</p>
                  <p className="font-semibold text-blue-600">#{event.myRank}</p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                View Results
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMyEvents = () => (
    <div className="space-y-6">
      {myEvents.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {myEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-green-200">
              <div className={`h-24 bg-gradient-to-r ${event.color} flex items-center justify-center`}>
                <event.icon className="text-white" size={32} />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2" size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2" size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-600 to-green-700">
                  <Play className="mr-2" size={16} />
                  Join Event
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Trophy className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No registered events</h3>
          <p className="text-gray-600 mb-4">Register for upcoming hackathons to see them here</p>
          <Button onClick={() => setActiveTab('upcoming')}>
            Browse Events
          </Button>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Events', count: upcomingEvents.length },
    { id: 'my-events', label: 'My Events', count: myEvents.length },
    { id: 'past', label: 'Past Events', count: pastEvents.length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Hackathons & Competitions
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Participate in exciting hackathons, win amazing prizes, and showcase your skills to the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Trophy className="text-purple-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">15+</h3>
            <p className="text-gray-600 text-sm">Events Participated</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Award className="text-green-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">3</h3>
            <p className="text-gray-600 text-sm">Prizes Won</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="text-blue-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
            <p className="text-gray-600 text-sm">Average Rating</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Crown className="text-orange-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">#8</h3>
            <p className="text-gray-600 text-sm">Best Rank</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-2">
          <nav className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="animate-fade-in">
          {activeTab === 'upcoming' && renderUpcoming()}
          {activeTab === 'my-events' && renderMyEvents()}
          {activeTab === 'past' && renderPast()}
        </div>
      </div>
    </div>
  );
};

export default Hackathons;