import { useState, useEffect } from 'react';
import { Heart, Eye, Briefcase, Plus, TrendingUp } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function SuccessStories() {
  const [stories, setStories] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState('');
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [newStory, setNewStory] = useState({
    title: '',
    content: '',
    careerPath: '',
    company: '',
    position: '',
    image: ''
  });

  useEffect(() => {
    fetchStories();
  }, [selectedCareer]);

  const fetchStories = async () => {
    try {
      const params = {};
      if (selectedCareer) params.careerPath = selectedCareer;
      const response = await axios.get(`${API_URL}/success-stories`, { params });
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const handleCreateStory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/success-stories`, newStory, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowCreateStory(false);
      setNewStory({ title: '', content: '', careerPath: '', company: '', position: '', image: '' });
      alert('Your story has been submitted for review!');
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };

  const handleLike = async (storyId) => {
    try {
      await axios.post(`${API_URL}/success-stories/${storyId}/like`);
      fetchStories();
    } catch (error) {
      console.error('Error liking story:', error);
    }
  };

  const careerPaths = [
    'Data Science', 'Software Engineering', 'Medical', 'Business', 
    'Law', 'Creative Arts', 'Civil Services', 'Research'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Success Stories</h1>
          <p className="text-gray-600">Get inspired by alumni who achieved their dreams</p>
        </div>

        {/* Share Story Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowCreateStory(true)}
            className="bg-green-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 shadow-lg"
          >
            <Plus size={20} />
            Share Your Success Story
          </button>
        </div>

        {/* Career Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCareer('')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              !selectedCareer ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border'
            }`}
          >
            All Stories
          </button>
          {careerPaths.map((career) => (
            <button
              key={career}
              onClick={() => setSelectedCareer(career)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCareer === career ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              {career}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              {story.image && (
                <img src={story.image} alt={story.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                {story.isFeatured && (
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full mb-3">
                    ⭐ Featured Story
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {story.position} at {story.company}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{story.content}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button
                      onClick={() => handleLike(story.id)}
                      className="flex items-center gap-1 hover:text-red-500"
                    >
                      <Heart size={16} />
                      {story.likes}
                    </button>
                    <span className="flex items-center gap-1">
                      <Eye size={16} />
                      {story.views}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {story.careerPath}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {story.user.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{story.user.fullName}</div>
                      <div className="text-xs text-gray-500">{story.user.city}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Story Modal */}
        {showCreateStory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Share Your Success Story</h2>
              <form onSubmit={handleCreateStory}>
                <input
                  type="text"
                  placeholder="Story Title"
                  value={newStory.title}
                  onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-4"
                  required
                />
                <textarea
                  placeholder="Tell your journey... How did you achieve your goals?"
                  value={newStory.content}
                  onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-4 h-32"
                  required
                />
                <select
                  value={newStory.careerPath}
                  onChange={(e) => setNewStory({ ...newStory, careerPath: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-4"
                  required
                >
                  <option value="">Select Career Path</option>
                  {careerPaths.map((career) => (
                    <option key={career} value={career}>{career}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Current Company"
                  value={newStory.company}
                  onChange={(e) => setNewStory({ ...newStory, company: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-4"
                />
                <input
                  type="text"
                  placeholder="Current Position"
                  value={newStory.position}
                  onChange={(e) => setNewStory({ ...newStory, position: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-4"
                />
                <input
                  type="url"
                  placeholder="Image URL (optional)"
                  value={newStory.image}
                  onChange={(e) => setNewStory({ ...newStory, image: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-4"
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                  >
                    Submit Story
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateStory(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
