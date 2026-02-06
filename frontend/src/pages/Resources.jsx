import { useState } from 'react';
import { 
  BookOpen, Video, FileText, Code, Globe, Download,
  Star, Clock, Users, Play, ExternalLink, Search,
  Filter, Bookmark, Heart, Share2
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useToast } from '../contexts/ToastContext';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { showSuccess, showInfo } = useToast();

  const categories = [
    { id: 'all', label: 'All Resources', count: 156 },
    { id: 'courses', label: 'Courses', count: 45 },
    { id: 'videos', label: 'Videos', count: 67 },
    { id: 'articles', label: 'Articles', count: 23 },
    { id: 'tools', label: 'Tools', count: 21 }
  ];

  const resources = [
    {
      id: 1,
      title: 'Complete React.js Masterclass',
      description: 'Learn React from basics to advanced concepts with hands-on projects',
      type: 'course',
      category: 'courses',
      duration: '12 hours',
      rating: 4.8,
      students: '15,420',
      instructor: 'Priya Sharma',
      price: 'Free',
      thumbnail: 'https://via.placeholder.com/300x200/3B82F6/white?text=React',
      tags: ['React', 'JavaScript', 'Frontend'],
      difficulty: 'Intermediate',
      updated: '2 days ago'
    },
    {
      id: 2,
      title: 'Python for Data Science',
      description: 'Master Python programming for data analysis and machine learning',
      type: 'course',
      category: 'courses',
      duration: '18 hours',
      rating: 4.9,
      students: '22,150',
      instructor: 'Rahul Kumar',
      price: '₹999',
      thumbnail: 'https://via.placeholder.com/300x200/8B5CF6/white?text=Python',
      tags: ['Python', 'Data Science', 'ML'],
      difficulty: 'Beginner',
      updated: '1 week ago'
    },
    {
      id: 3,
      title: 'JavaScript ES6+ Features Explained',
      description: 'Deep dive into modern JavaScript features and best practices',
      type: 'video',
      category: 'videos',
      duration: '45 min',
      rating: 4.7,
      views: '89,230',
      instructor: 'Anita Singh',
      price: 'Free',
      thumbnail: 'https://via.placeholder.com/300x200/F59E0B/white?text=JS',
      tags: ['JavaScript', 'ES6', 'Programming'],
      difficulty: 'Intermediate',
      updated: '3 days ago'
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      description: 'Essential design principles every developer should know',
      type: 'article',
      category: 'articles',
      duration: '8 min read',
      rating: 4.6,
      views: '12,450',
      author: 'Design Team',
      price: 'Free',
      thumbnail: 'https://via.placeholder.com/300x200/EC4899/white?text=Design',
      tags: ['UI/UX', 'Design', 'Principles'],
      difficulty: 'Beginner',
      updated: '5 days ago'
    },
    {
      id: 5,
      title: 'VS Code Extensions Pack',
      description: 'Essential VS Code extensions for web development',
      type: 'tool',
      category: 'tools',
      downloads: '50,000+',
      rating: 4.9,
      author: 'Dev Tools Team',
      price: 'Free',
      thumbnail: 'https://via.placeholder.com/300x200/10B981/white?text=VSCode',
      tags: ['VS Code', 'Extensions', 'Productivity'],
      difficulty: 'All Levels',
      updated: '1 day ago'
    },
    {
      id: 6,
      title: 'Git & GitHub Mastery',
      description: 'Version control essentials for modern development',
      type: 'course',
      category: 'courses',
      duration: '6 hours',
      rating: 4.8,
      students: '18,750',
      instructor: 'Tech Mentor',
      price: 'Free',
      thumbnail: 'https://via.placeholder.com/300x200/6B7280/white?text=Git',
      tags: ['Git', 'GitHub', 'Version Control'],
      difficulty: 'Beginner',
      updated: '1 week ago'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleBookmark = (resourceTitle) => {
    showSuccess(`${resourceTitle} bookmarked!`);
  };

  const handleShare = (resourceTitle) => {
    showInfo(`Sharing ${resourceTitle}...`);
  };

  const handleEnroll = (resourceTitle) => {
    showSuccess(`Enrolled in ${resourceTitle}!`);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'video': return Video;
      case 'article': return FileText;
      case 'tool': return Code;
      default: return Globe;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Learning Resources
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Curated collection of courses, videos, articles, and tools to accelerate your learning journey
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
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <div key={resource.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <TypeIcon className="text-white" size={48} />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => handleBookmark(resource.title)}
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30"
                    >
                      <Bookmark className="text-white" size={16} />
                    </button>
                    <button
                      onClick={() => handleShare(resource.title)}
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30"
                    >
                      <Share2 className="text-white" size={16} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 uppercase font-semibold">{resource.type}</span>
                    <span className="text-xs text-gray-500">{resource.updated}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-500" size={14} fill="currentColor" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{resource.duration || `${resource.downloads} downloads`}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{resource.students || resource.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* Instructor/Author */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        by <span className="font-semibold">{resource.instructor || resource.author}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${resource.price === 'Free' ? 'text-green-600' : 'text-blue-600'}`}>
                        {resource.price}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700"
                      onClick={() => handleEnroll(resource.title)}
                    >
                      <Play className="mr-2" size={16} />
                      {resource.type === 'course' ? 'Enroll' : resource.type === 'tool' ? 'Download' : 'View'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Featured Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Want to contribute?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Share your knowledge with the community. Submit your courses, articles, or tools to help others learn.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Submit Resource
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;