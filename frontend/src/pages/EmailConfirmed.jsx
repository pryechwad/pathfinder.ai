import { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const EmailConfirmed = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50/30 to-emerald-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/10 to-cyan-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-200/10 to-emerald-200/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Brain className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                PathFinder AI
              </h1>
            </div>
          </div>

          {/* Success Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="text-white" size={48} />
            </div>

            {/* Success Message */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Email Verified Successfully!
            </h2>
            
            <p className="text-gray-600 text-lg mb-6">
              Your email has been confirmed. You can now access all features of PathFinder AI.
            </p>

            {/* Features List */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-4">You now have access to:</p>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-white" size={14} />
                  </div>
                  <span className="text-gray-700 text-sm">AI-Powered Career Guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-white" size={14} />
                  </div>
                  <span className="text-gray-700 text-sm">Expert Mentor Sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-white" size={14} />
                  </div>
                  <span className="text-gray-700 text-sm">500+ Premium Courses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-white" size={14} />
                  </div>
                  <span className="text-gray-700 text-sm">Community Forums & Study Groups</span>
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                Redirecting to login in <span className="font-bold text-xl">{countdown}</span> seconds...
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/')}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Go to Login
                <ArrowRight className="ml-2" size={20} />
              </Button>
              
              <p className="text-sm text-gray-500">
                Ready to start your career journey!
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Need help? Contact us at{' '}
              <a href="mailto:support@pathfinder.ai" className="text-teal-600 hover:text-teal-700 font-semibold">
                support@pathfinder.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmed;
