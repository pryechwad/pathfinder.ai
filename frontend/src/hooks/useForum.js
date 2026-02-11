import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export const useForumPosts = (categoryId) => {
  return useQuery({
    queryKey: ['forum-posts', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('forum_posts')
        .select('*, user:users(full_name), category:forum_categories(name), comments:forum_comments(count)');
      
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useForumPost = (id) => {
  return useQuery({
    queryKey: ['forum-post', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*, user:users(full_name), category:forum_categories(name), comments:forum_comments(*, user:users(full_name))')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData) => {
      const { data, error } = await supabase
        .from('forum_posts')
        .insert([postData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['forum-posts']);
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentData) => {
      const { data, error } = await supabase
        .from('forum_comments')
        .insert([commentData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['forum-post', data.post_id]);
    },
  });
};

export const useVotePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, userId, voteType }) => {
      const { data, error } = await supabase
        .from('forum_votes')
        .upsert([{ post_id: postId, user_id: userId, vote_type: voteType }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['forum-posts']);
    },
  });
};
