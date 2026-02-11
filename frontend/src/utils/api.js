// Temporary compatibility layer for old API calls
// TODO: Migrate all components to use Supabase hooks directly

import { supabase } from '../lib/supabase';

export const authAPI = {
  signup: async (data) => {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          fullName: data.fullName,
          phone: data.phone,
          city: data.city,
          grade: data.grade,
          school: data.school
        }
      }
    });
    if (error) throw error;
    return { data: { token: authData.session?.access_token, user: authData.user } };
  },

  login: async (data) => {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });
    if (error) throw error;
    return { data: { token: authData.session?.access_token, user: authData.user } };
  },

  mentorSignup: async (data) => {
    const { data: mentor, error } = await supabase
      .from('mentors')
      .insert([{
        email: data.email,
        name: data.name,
        title: data.title,
        company: data.company,
        experience: data.experience,
        price: data.price || 2000,
        location: data.location,
        bio: data.bio,
        expertise: [],
        languages: ['English']
      }])
      .select()
      .single();
    
    if (error) throw error;
    return { data: { token: 'temp-token', mentor } };
  },

  mentorLogin: async (data) => {
    const { data: mentor, error } = await supabase
      .from('mentors')
      .select('*')
      .eq('email', data.email)
      .single();
    
    if (error) throw error;
    return { data: { token: 'temp-token', mentor } };
  }
};

export const studentAPI = {
  getDashboard: async (userId) => {
    return { data: {} };
  },
  getCourses: async () => {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) throw error;
    return { data };
  },
  enrollCourse: async (data) => {
    const { error } = await supabase.from('course_enrollments').insert([data]);
    if (error) throw error;
    return { data: {} };
  },
  updateProgress: async (enrollmentId, data) => {
    return { data: {} };
  },
  getActivities: async (userId) => {
    return { data: [] };
  }
};

export const mentorAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from('mentors').select('*');
    if (error) throw error;
    return { data };
  },
  getDashboard: async (mentorId) => {
    return { data: {} };
  }
};

export const bookingAPI = {
  create: async (data) => {
    const { error } = await supabase.from('bookings').insert([data]);
    if (error) throw error;
    return { data: {} };
  },
  getUserBookings: async (userId) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, mentor:mentors(*)')
      .eq('userId', userId);
    if (error) throw error;
    return { data };
  },
  getMentorBookings: async (mentorId) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, user:users(*)')
      .eq('mentorId', mentorId);
    if (error) throw error;
    return { data };
  },
  updateStatus: async (id, data) => {
    const { error } = await supabase
      .from('bookings')
      .update(data)
      .eq('id', id);
    if (error) throw error;
    return { data: {} };
  }
};

export const careerGoalAPI = {
  getAll: async (userId) => {
    const { data, error } = await supabase
      .from('career_goals')
      .select('*')
      .eq('userId', userId);
    if (error) throw error;
    return { data };
  },
  create: async (data) => {
    const { error } = await supabase.from('career_goals').insert([data]);
    if (error) throw error;
    return { data: {} };
  },
  update: async (id, data) => {
    const { error } = await supabase
      .from('career_goals')
      .update(data)
      .eq('id', id);
    if (error) throw error;
    return { data: {} };
  }
};

export const hackathonAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from('hackathons').select('*');
    if (error) throw error;
    return { data };
  }
};

export const contactAPI = {
  submit: async (data) => {
    const { error } = await supabase.from('contacts').insert([data]);
    if (error) throw error;
    return { data: {} };
  }
};

export default {
  authAPI,
  studentAPI,
  mentorAPI,
  bookingAPI,
  careerGoalAPI,
  hackathonAPI,
  contactAPI
};
