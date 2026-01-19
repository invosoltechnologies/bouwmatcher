'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'react-hot-toast';
import {
  signUpProfessionalAction,
  signInAction,
  signOutAction,
  getCurrentUserAction,
  getProfessionalProfileAction,
  updateProfessionalProfileAction,
  getOAuthUrlAction,
  sendPasswordResetAction,
  resetPasswordAction,
} from '@/app/actions/auth';

/**
 * Hook for user authentication mutations
 */
export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Sign up mutation
  const signUp = useMutation({
    mutationFn: signUpProfessionalAction,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
    },
  });

  // Sign in mutation
  const signIn = useMutation({
    mutationFn: signInAction,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
    },
  });

  // Sign out mutation
  const signOut = useMutation({
    mutationFn: signOutAction,
    onSuccess: () => {
      queryClient.clear(); // Clear all queries on logout
      router.push('/auth/login');
    },
  });

  // OAuth sign in
  const signInWithOAuth = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      const result = await getOAuthUrlAction(provider);

      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        toast.error(result.error || 'Failed to initiate OAuth sign in');
      }
    } catch (error) {
      toast.error('An error occurred during OAuth sign in');
      console.error('OAuth error:', error);
    }
  };

  // Forgot password mutation
  const forgotPassword = useMutation({
    mutationFn: sendPasswordResetAction,
  });

  // Reset password mutation
  const resetPassword = useMutation({
    mutationFn: resetPasswordAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return {
    signUp,
    signIn,
    signOut,
    signInWithOAuth,
    forgotPassword,
    resetPassword,
  };
}

/**
 * Hook to get current user
 */
export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUserAction,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get professional profile
 */
export function useProfile(userId?: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getProfessionalProfileAction(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to update professional profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfessionalProfileAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
