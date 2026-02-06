import { useState } from 'react';
import { User, GraduationCap, Mail, Lock, Phone, School, MapPin, UserCheck, ArrowLeft, Brain } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import { authAPI } from '../../utils/api';
import { useToast } from '../../contexts/ToastContext';

const Login = ({ onLogin, role, onBack }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    name: '',
    title: '',
    company: '',
    experience: '',
    grade: '',
    phone: '',
    school: '',
    city: '',
    location: '',
    bio: ''
  });
  const [errors, setErrors] = useState({});

  const grades = [
    { value: '8', label: 'Grade 8' },
    { value: '9', label: 'Grade 9' },
    { value: '10', label: 'Grade 10' },
    { value: '11', label: 'Grade 11' },
    { value: '12', label: 'Grade 12' },
    { value: 'fresher', label: 'Fresher' },
    { value: 'final_year', label: 'Final Year' },
    { value: 'experienced', label: 'Experienced' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (isSignUp && role === 'student') {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.grade) newErrors.grade = 'Grade is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.school) newErrors.school = 'School/College name is required';
      if (!formData.city) newErrors.city = 'City is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    try {
      let response;
      
      if (role === 'student') {
        if (isSignUp) {
          response = await authAPI.signup(formData);
          console.log('Signup successful:', response.data);
          showSuccess('Account created successfully!');
        } else {
          response = await authAPI.login({ email: formData.email, password: formData.password });
          console.log('Login successful:', response.data);
          showSuccess('Welcome back!');
        }
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLogin({ ...response.data.user, userType: 'student' });
      } else {
        if (isSignUp) {
          response = await authAPI.mentorSignup({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            title: formData.title,
            company: formData.company,
            experience: formData.experience,
            price: 2000,
            location: formData.location,
            bio: formData.bio
          });
          console.log('Mentor signup successful:', response.data);
          showSuccess('Mentor account created successfully!');
        } else {
          response = await authAPI.mentorLogin({ email: formData.email, password: formData.password });
          console.log('Mentor login successful:', response.data);
          showSuccess('Welcome back!');
        }
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('mentor', JSON.stringify(response.data.mentor));
        onLogin({ ...response.data.mentor, userType: 'mentor' });
      }
    } catch (error) {
      console.error('Auth error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Authentication failed';
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50/30 to-emerald-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/10 to-cyan-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-200/10 to-emerald-200/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <button 
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 mb-6 group"
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
              <span>Back to Home</span>
            </button>
            
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Brain className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                PathFinder AI
              </h1>
            </div>
            <p className="text-gray-600">Your career guidance companion</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600 mb-6">
                {isSignUp ? 'Join as a' : 'Sign in as a'} <span className="font-semibold text-teal-600 capitalize">{role}</span>
              </p>
              
              {/* Role Display */}
              <div className="flex items-center justify-center space-x-3 bg-teal-50 rounded-2xl p-4 mb-6">
                {role === 'student' ? (
                  <GraduationCap className="text-teal-600" size={24} />
                ) : (
                  <User className="text-teal-600" size={24} />
                )}
                <span className="text-teal-700 font-semibold capitalize">{role} Login</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && role === 'mentor' && (
                <>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-12"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      name="title"
                      placeholder="Job Title (e.g. Senior Software Engineer)"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      name="experience"
                      placeholder="Years of Experience (e.g. 5 years)"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="pl-12"
                      required
                    />
                  </div>
                  <div className="relative">
                    <textarea
                      name="bio"
                      placeholder="Short bio about yourself"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      rows="3"
                    />
                  </div>
                </>
              )}
              {isSignUp && role === 'student' && (
                <>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="text"
                      name="fullName"
                      placeholder="Full Name (e.g. Aarav Sharma)"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      error={errors.fullName}
                      className="pl-12"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Grade <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                        errors.grade ? 'border-red-500' : ''
                      }`}
                      required
                    >
                      <option value="">Select Grade</option>
                      {grades.map((grade) => (
                        <option key={grade.value} value={grade.value}>
                          {grade.label}
                        </option>
                      ))}
                    </select>
                    {errors.grade && <p className="text-sm text-red-500 mt-1">{errors.grade}</p>}
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (e.g. +91 98765 43210)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      className="pl-12"
                      required
                    />
                  </div>

                  <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="text"
                      name="school"
                      placeholder="School / College Name (e.g. Delhi Public School)"
                      value={formData.school}
                      onChange={handleInputChange}
                      error={errors.school}
                      className="pl-12"
                      required
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                      className="pl-12"
                      required
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  className="pl-12"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  className="pl-12"
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : `Sign In as ${role === 'student' ? 'Student' : 'Mentor'}`)}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>

            {!isSignUp && (
              <div className="mt-4 text-center">
                <a href="#" className="text-teal-600 hover:text-teal-700 text-sm">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;