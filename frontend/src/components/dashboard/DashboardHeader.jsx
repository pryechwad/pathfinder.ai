import { useState } from 'react';
import { Bell, Search, User, LogOut, Brain, Home, BookOpen, FileText, Trophy, Users as UsersIcon } from 'lucide-react';
import Button from '../ui/Button';
import AIMentor from '../ui/AIMentor';
import { useToast } from '../../contexts/ToastContext';

const DashboardHeader = ({ user, onLogout, currentPage, onNavigate }) => {
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [isMentorMinimized, setIsMentorMinimized] = useState(false);
  const { showInfo } = useToast();

  const studentNavigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'career-path', label: 'Career Path', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'hackathons', label: 'Hackathons', icon: Trophy },
    { id: 'mentors', label: 'Mentors', icon: UsersIcon }
  ];

  const mentorNavigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'My Students', icon: UsersIcon },
    { id: 'sessions', label: 'Sessions', icon: BookOpen },
    { id: 'earnings', label: 'Earnings', icon: Trophy },
    { id: 'resources', label: 'Resources', icon: FileText }
  ];

  const navigationItems = (user?.userType === 'mentor' || user?.role === 'mentor') 
    ? mentorNavigationItems 
    : studentNavigationItems;

  const handleNavigation = (pageId) => {
    onNavigate(pageId);
  };

  const handleOpenMentor = () => {
    setIsMentorOpen(true);
    setIsMentorMinimized(false);
  };

  const handleCloseMentor = () => {
    setIsMentorOpen(false);
    setIsMentorMinimized(false);
  };

  const handleMinimizeMentor = () => {
    setIsMentorMinimized(true);
    setIsMentorOpen(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PathFinder AI
            </h1>
            
            {/* Button-style Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* AI Mentor Button - Prominent */}
            <Button
              onClick={handleOpenMentor}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg animate-pulse"
              size="sm"
            >
              <Brain className="mr-2" size={16} />
              Ask AI Mentor
            </Button>

            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button 
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => showInfo('You have 3 new notifications!')}
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="text-white" size={16} />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-600 capitalize">{user?.userType}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-gray-600 hover:text-red-500"
              >
                <LogOut size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Minimized AI Mentor Button */}
      {isMentorMinimized && (
        <button
          onClick={handleOpenMentor}
          className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 animate-bounce"
        >
          <Brain size={24} />
        </button>
      )}

      {/* AI Mentor Component */}
      <AIMentor
        isOpen={isMentorOpen}
        onClose={handleCloseMentor}
        onMinimize={handleMinimizeMentor}
      />
    </>
  );
};

export default DashboardHeader;