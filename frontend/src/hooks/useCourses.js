import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export const useCourses = (filters = {}) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: async () => {
      let query = supabase.from('courses').select('*');
      
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.level) {
        query = query.eq('level', filters.level);
      }
      
      const { data, error } = await query.order('rating', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useCourse = (id) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, courseId }) => {
      const { data, error } = await supabase
        .from('course_enrollments')
        .insert([{ user_id: userId, course_id: courseId }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['enrollments']);
    },
  });
};

export const useUserCourses = (userId) => {
  return useQuery({
    queryKey: ['enrollments', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course_enrollments')
        .select('*, course:courses(*)')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};
