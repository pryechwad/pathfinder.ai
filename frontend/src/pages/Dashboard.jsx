import { useState, useEffect } from 'react';
import { BookOpen, FileText, Trophy, Users as UsersIcon } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import MentorDashboard from '../components/dashboard/MentorDashboard';
import CareerPath from './CareerPath';
import Resources from './Resources';
import Hackathons from './Hackathons';
import Mentors from './Mentors';
import MonthlyAssessment from './MonthlyAssessment';
import AptitudeModules from './AptitudeModules';

const Dashboard = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState(() => {
    return sessionStorage.getItem('currentPage') || 'dashboard';
  });

  useEffect(() => {
    sessionStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
  };

  const renderCurrentPage = () => {
    const userRole = user.userType || user.role;
    
    if (userRole === 'mentor') {
      switch (currentPage) {
        case 'students':
          return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50/30 to-emerald-50/30 p-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center py-20">
                  <UsersIcon className="mx-auto text-teal-600 mb-4" size={64} />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                    My Students
                  </h2>
                  <p className="text-gray-600 text-lg">Manage your student relationships and track their progress</p>
                </div>
              </div>
            </div>
          );
        case 'sessions':
          return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50/30 to-emerald-50/30 p-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center py-20">
                  <BookOpen className="mx-auto text-teal-600 mb-4" size={64} />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                    My Sessions
                  </h2>
                  <p className="text-gray-600 text-lg">View and manage all your mentoring sessions</p>
                </div>
              </div>
            </div>
          );
        case 'earnings':
          return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50/30 to-emerald-50/30 p-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center py-20">
                  <Trophy className="mx-auto text-teal-600 mb-4" size={64} />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                    Earnings & Analytics
                  </h2>
                  <p className="text-gray-600 text-lg">Track your earnings and performance metrics</p>
                </div>
              </div>
            </div>
          );
        case 'resources':
          return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50/30 to-emerald-50/30 p-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center py-20">
                  <FileText className="mx-auto text-teal-600 mb-4" size={64} />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                    Mentor Resources
                  </h2>
                  <p className="text-gray-600 text-lg">Access teaching materials and mentor guidelines</p>
                </div>
              </div>
            </div>
          );
        case 'dashboard':
        default:
          return <MentorDashboard user={user} />;
      }
    } else {
      // Student pages
      switch (currentPage) {
        case 'career-path':
          return <CareerPath onNavigate={handleNavigation} />;
        case 'monthly-assessment':
          return <MonthlyAssessment />;
        case 'aptitude-modules':
          return <AptitudeModules />;
        case 'resources':
          return <Resources />;
        case 'hackathons':
          return <Hackathons />;
        case 'mentors':
          return <Mentors />;
        case 'dashboard':
        default:
          return <StudentDashboard user={user} />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        user={user} 
        onLogout={onLogout} 
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default Dashboard;