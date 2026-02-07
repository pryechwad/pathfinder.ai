import { useState, useEffect } from 'react';
import { Users, Plus, Video, Calendar, Search, X, Send, MessageCircle, Share2, Copy, Check } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function StudyGroups() {
  const [groups, setGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    category: '',
    maxMembers: 50,
    isPrivate: false,
    meetingLink: ''
  });

  useEffect(() => {
    fetchGroups();
    fetchMyGroups();
  }, [searchQuery]);

  const fetchGroups = async () => {
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      const response = await axios.get(`${API_URL}/study-groups`, { params });
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const fetchMyGroups = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/study-groups/my-groups`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyGroups(response.data);
    } catch (error) {
      console.error('Error fetching my groups:', error);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await axios.post(`${API_URL}/study-groups`, newGroup, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setShowCreateGroup(false);
      setNewGroup({ name: '', description: '', category: '', maxMembers: 50, isPrivate: false, meetingLink: '' });
      fetchGroups();
      fetchMyGroups();
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/study-groups/${groupId}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchGroups();
      fetchMyGroups();
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  const handleShareGroup = () => {
    const shareText = `🎓 Join me on PathFinder AI!

I'm part of the "${selectedGroup.name}" study group for ${selectedGroup.category}.

📚 ${selectedGroup.description}

👥 ${selectedGroup.memberCount}/${selectedGroup.maxMembers} members

Join our collaborative learning platform and let's grow together!

🔗 ${window.location.origin}/study-groups?group=${selectedGroup.id}`;
    
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = ['Data Science', 'Engineering', 'Medical', 'Business', 'Creative Arts', 'Law', 'General'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Study Groups</h1>
          <p className="text-gray-600">Join collaborative learning spaces and grow together</p>
        </div>

        {/* Search and Create */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search study groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={() => setShowCreateGroup(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-purple-700"
          >
            <Plus size={20} />
            Create Group
          </button>
        </div>

        {/* My Groups */}
        {myGroups.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">My Study Groups</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myGroups.map((group) => (
                <div 
                  key={group.id} 
                  onClick={() => setSelectedGroup(group)}
                  className="bg-white rounded-lg shadow-md p-6 border-2 border-purple-200 cursor-pointer hover:border-purple-400 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Users className="text-purple-600" size={24} />
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      {group.userRole}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{group.memberCount}/{group.maxMembers} members</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">{group.category}</span>
                  </div>
                  {group.meetingLink && (
                    <a
                      href={group.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                    >
                      <Video size={16} />
                      Join Meeting
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Groups */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Discover Study Groups</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.filter(group => !myGroups.some(mg => mg.id === group.id)).map((group) => (
              <div key={group.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                  <Users className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{group.memberCount}/{group.maxMembers} members</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">{group.category}</span>
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  Created by {group.creator.fullName}
                </div>
                <button
                  onClick={() => handleJoinGroup(group.id)}
                  disabled={group.isFull}
                  className={`w-full py-2 rounded-lg ${
                    group.isFull
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {group.isFull ? 'Group Full' : 'Join Group'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Group Chat Modal */}
        {selectedGroup && (
          <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={() => setSelectedGroup(null)}>
            <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 shrink-0 relative z-10">
                <div className="flex-1 min-w-0 pr-4">
                  <h2 className="text-2xl font-bold text-gray-900 truncate">{selectedGroup.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedGroup.memberCount} members • {selectedGroup.category}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleShareGroup(); }}
                    className="px-4 py-2 bg-white hover:bg-gray-50 rounded-lg transition flex items-center gap-2 text-purple-600 border border-purple-200 shadow-sm"
                  >
                    {copied ? <Check size={18} /> : <Share2 size={18} />}
                    <span className="text-sm font-medium">{copied ? 'Copied!' : 'Share'}</span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedGroup(null); }}
                    className="p-2 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* Members Sidebar */}
                <div className="w-64 border-r p-4 overflow-y-auto">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Users size={18} />
                    Members
                  </h3>
                  {selectedGroup.members?.map((member) => (
                    <div key={member.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded mb-1">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                        {member.user.fullName[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{member.user.fullName}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="text-center text-gray-500 py-8">
                      <MessageCircle size={48} className="mx-auto mb-2 text-gray-400" />
                      <p>Start chatting with your group members!</p>
                      <p className="text-sm mt-2">Share ideas, ask questions, and collaborate</p>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t bg-white">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        onKeyPress={(e) => e.key === 'Enter' && setMessage('')}
                      />
                      <button 
                        onClick={() => setMessage('')}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                    {selectedGroup.meetingLink && (
                      <a
                        href={selectedGroup.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-2"
                      >
                        <Video size={16} />
                        Join Video Meeting
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Group Modal */}
        {showCreateGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowCreateGroup(false)}>
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-bold mb-4">Create Study Group</h2>
              <form onSubmit={handleCreateGroup}>
                <input
                  type="text"
                  placeholder="Group Name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-4"
                  required
                />
                <textarea
                  placeholder="Group Description"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-4 h-24"
                  required
                />
                <select
                  value={newGroup.category}
                  onChange={(e) => setNewGroup({ ...newGroup, category: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-4"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Max Members"
                  value={newGroup.maxMembers}
                  onChange={(e) => setNewGroup({ ...newGroup, maxMembers: parseInt(e.target.value) })}
                  className="w-full p-3 border rounded-lg mb-4"
                  min="2"
                  max="100"
                />
                <input
                  type="url"
                  placeholder="Meeting Link (optional)"
                  value={newGroup.meetingLink}
                  onChange={(e) => setNewGroup({ ...newGroup, meetingLink: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-4"
                />
                <label className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    checked={newGroup.isPrivate}
                    onChange={(e) => setNewGroup({ ...newGroup, isPrivate: e.target.checked })}
                  />
                  <span>Make this group private</span>
                </label>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
                  >
                    Create Group
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateGroup(false)}
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
