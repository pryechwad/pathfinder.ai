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

  forgotPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) throw error;
    return { data: { message: 'Password reset email sent!' } };
  },

  resetPassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
    return { data: { message: 'Password updated successfully!' } };
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
    const { data: user, error: userError } = await supabase
      .from('users')
      .select(`
        *,
        courses:course_enrollments(
          *,
          course:courses(*)
        ),
        bookings(
          *,
          mentor:mentors(*)
        ),
        activities(*),
        goals:career_goals(*)
      `)
      .eq('id', userId)
      .single();
    
    if (userError) throw userError;
    
    const stats = {
      coursesCompleted: user.courses?.filter(c => c.completed).length || 0,
      careerGoals: user.goals?.length || 0,
      skillProgress: user.courses?.reduce((acc, c) => acc + (c.progress || 0), 0) / (user.courses?.length || 1) || 0,
      mentorSessions: user.bookings?.length || 0
    };
    
    return { data: { user, stats } };
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
  updateProgress: async () => {
    return { data: {} };
  },
  getActivities: async () => {
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
    const { data: mentor, error } = await supabase
      .from('mentors')
      .select(`
        *,
        bookings(
          *,
          user:users(*)
        )
      `)
      .eq('id', mentorId)
      .single();
    
    if (error) throw error;
    
    // Add computed fields for bookings
    const bookingsWithDetails = (mentor.bookings || []).map(booking => ({
      ...booking,
      studentName: booking.user?.full_name || 'Student',
      studentEmail: booking.user?.email || '',
      avatar: booking.user?.full_name?.substring(0, 2).toUpperCase() || 'ST'
    }));
    
    return { data: { mentor: { ...mentor, bookings: bookingsWithDetails } } };
  }
};

export const bookingAPI = {
  create: async (data) => {
    const orderId = 'ORD' + Date.now();
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([{
        user_id: data.userId,
        mentor_id: data.mentorId,
        date: data.date,
        time: data.time,
        topic: data.topic,
        duration: parseInt(data.duration),
        amount: data.amount,
        order_id: orderId,
        payment_id: data.paymentId,
        status: 'CONFIRMED'
      }])
      .select()
      .single();
    
    if (error) throw error;
    return { data: { ...booking, orderId } };
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
