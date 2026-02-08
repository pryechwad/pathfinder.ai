import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error
      error.message = 'Network error. Please check your internet connection.';
    } else if (error.response.status === 401) {
      // Unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('mentor');
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  mentorSignup: (data) => api.post('/auth/mentor/signup', data),
  mentorLogin: (data) => api.post('/auth/mentor/login', data),
};

// Student Dashboard API
export const studentAPI = {
  getDashboard: (userId) => api.get(`/student/dashboard/${userId}`),
  getCourses: () => api.get('/courses'),
  enrollCourse: (data) => api.post('/courses/enroll', data),
  updateProgress: (enrollmentId, data) => api.patch(`/courses/progress/${enrollmentId}`, data),
  getActivities: (userId) => api.get(`/activities/${userId}`),
};

// Mentor API
export const mentorAPI = {
  getAll: () => api.get('/mentors'),
  getDashboard: (mentorId) => api.get(`/mentor/dashboard/${mentorId}`),
};

// Booking API
export const bookingAPI = {
  create: (data) => api.post('/bookings', data),
  getUserBookings: (userId) => api.get(`/bookings/user/${userId}`),
  getMentorBookings: (mentorId) => api.get(`/bookings/mentor/${mentorId}`),
  updateStatus: (id, data) => api.patch(`/bookings/${id}`, data),
};

// Career Goals API
export const careerGoalAPI = {
  getAll: (userId) => api.get(`/career-goals/${userId}`),
  create: (data) => api.post('/career-goals', data),
  update: (id, data) => api.patch(`/career-goals/${id}`, data),
};

// Hackathon API
export const hackathonAPI = {
  getAll: () => api.get('/hackathons'),
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
};

export default api;
