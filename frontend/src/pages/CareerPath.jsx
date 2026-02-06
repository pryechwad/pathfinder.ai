import { useState } from 'react';
import { 
  Search, Calendar, Briefcase, ArrowRight,
  Code, Palette, BarChart, Shield, Globe,
  Star, TrendingUp
} from 'lucide-react';

const CareerPath = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPath, setSelectedPath] = useState(null);

  const careerPaths = [
    {
      id: 1,
      title: 'Full Stack Developer',
      description: 'Build end-to-end web applications with modern technologies',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      salary: '₹8-15 LPA',
      demand: 'Very High',
      growth: '+22%',
      duration: '6 months',
      students: '12,000+',
      rating: 4.8,
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'HTML/CSS']
    },
    {
      id: 2,
      title: 'Data Scientist',
      description: 'Analyze data and build ML models to solve business problems',
      icon: BarChart,
      color: 'from-purple-500 to-pink-500',
      salary: '₹10-20 LPA',
      demand: 'High',
      growth: '+31%',
      duration: '8 months',
      students: '8,500+',
      rating: 4.7,
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics', 'Pandas']
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      description: 'Create beautiful and user-friendly digital experiences',
      icon: Palette,
      color: 'from-pink-500 to-rose-500',
      salary: '₹6-12 LPA',
      demand: 'High',
      growth: '+18%',
      duration: '5 months',
      students: '6,200+',
      rating: 4.6,
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems']
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      description: 'Streamline development and deployment processes',
      icon: Shield,
      color: 'from-green-500 to-teal-500',
      salary: '₹12-18 LPA',
      demand: 'Very High',
      growth: '+25%',
      duration: '7 months',
      students: '4,800+',
      rating: 4.9,
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Linux', 'Terraform']
    },
    {
      id: 5,
      title: 'Product Manager',
      description: 'Drive product strategy and work with cross-functional teams',
      icon: Briefcase,
      color: 'from-orange-500 to-red-500',
      salary: '₹15-25 LPA',
      demand: 'High',
      growth: '+19%',
      duration: '6 months',
      students: '3,500+',
      rating: 4.5,
      skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'SQL']
    },
    {
      id: 6,
      title: 'Digital Marketing',
      description: 'Grow businesses through digital channels and strategies',
      icon: Globe,
      color: 'from-indigo-500 to-purple-500',
      salary: '₹5-10 LPA',
      demand: 'High',
      growth: '+15%',
      duration: '4 months',
      students: '9,200+',
      rating: 4.4,
      skills: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Analytics']
    }
  ];

  const popularRoles = [
    { id: 1, name: 'Civil Services', tag: '#CivilServices' },
    { id: 2, name: 'Data Scientist', tag: '#DataScientist' },
    { id: 3, name: 'Fashion Designer', tag: '#FashionDesigner' },
    { id: 4, name: 'Lawyer', tag: '#Lawyer' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-12 pt-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">
            Your Career <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Command Center.</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Search any career role or track your multi-month growth with our 12-month odyssey track.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any job role (e.g. AI Engineer, Surgeon, Pilot)..."
              className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-lg"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all">
              Find Role
            </button>
          </div>

          {/* Popular Tags */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-gray-500 font-medium">Popular:</span>
            {popularRoles.map((role) => (
              <button
                key={role.id}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                {role.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
          
          {/* Monthly Assessment Card */}
          <div 
            onClick={() => onNavigate('monthly-assessment')}
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="w-full h-48 mb-6 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop" 
                alt="Monthly Assessment"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Monthly Assessment</h2>
            <p className="text-gray-600 mb-6">
              A sequential 12-month growth journey designed for Classes 8-12.
            </p>
            <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              OPEN ODYSSEY TRACK <ArrowRight size={20} />
            </button>
          </div>

          {/* Aptitude Modules Card */}
          <div 
            onClick={() => onNavigate('aptitude-modules')}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all text-white cursor-pointer"
          >
            <div className="w-full h-48 mb-6 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop" 
                alt="Aptitude Modules"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <h2 className="text-2xl font-bold mb-3">Aptitude Modules</h2>
            <p className="text-white/90 mb-6">
              Scientific evaluations to unlock your comprehensive Master Blueprint.
            </p>
            <button className="text-white font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              UNLOCK BLUEPRINT <ArrowRight size={20} />
            </button>
          </div>

        </div>

        {/* Career Paths Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-4">Explore Career Paths</h2>
          <p className="text-gray-600 text-center mb-12">Choose from our curated career paths designed for success</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths.map((path) => (
              <div key={path.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`h-32 bg-gradient-to-r ${path.color} flex items-center justify-center relative`}>
                  <path.icon className="text-white" size={48} />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="text-white fill-white" size={16} />
                      <span className="text-white font-semibold text-sm">{path.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">{path.title}</h3>
                  <p className="text-gray-600 text-sm">{path.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Salary</p>
                      <p className="font-semibold text-gray-900">{path.salary}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-900">{path.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Demand</p>
                      <p className="font-semibold text-green-600">{path.demand}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="text-green-500" size={16} />
                      <span className="font-semibold text-green-600">{path.growth}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {path.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                    {path.skills.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        +{path.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    Start Learning <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CareerPath;
