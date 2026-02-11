import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import EmailConfirmed from './pages/EmailConfirmed';
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
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/email-confirmed" element={<EmailConfirmed />} />
            <Route path="/" element={
              user ? (
                <Dashboard user={user} onLogout={handleLogout} />
              ) : showLogin ? (
                <Login 
                  onLogin={handleLogin} 
                  role={selectedRole}
                  onBack={handleBackToLanding}
                />
              ) : (
                <LandingPage onRoleSelect={handleRoleSelect} />
              )
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
