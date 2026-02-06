import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowLogin(true);
  };

  const handleLogin = (userData) => {
    const userWithRole = { ...userData, role: selectedRole };
    setUser(userWithRole);
    localStorage.setItem('user', JSON.stringify(userWithRole));
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    setShowLogin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const handleBackToLanding = () => {
    setShowLogin(false);
    setSelectedRole(null);
  };

  return (
    <ToastProvider>
      <div className="App">
        {user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : showLogin ? (
          <Login 
            onLogin={handleLogin} 
            role={selectedRole}
            onBack={handleBackToLanding}
          />
        ) : (
          <LandingPage onRoleSelect={handleRoleSelect} />
        )}
      </div>
    </ToastProvider>
  );
}

export default App;
