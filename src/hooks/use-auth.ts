// lib/types.ts

// Auth related types
export interface User {
  userId: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SignupResponse {
  userId: string;
  email: string;
}

export interface ProfileResponse {
  userId: string;
  email: string;
}

// API Response wrapper
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string | unknown;
}

// Error types
export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

// React Query imports
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { api } from '../lib/eden-client';
import { useAuthStore } from '../store/auth-store';

export function useAuth() {
  const { token, setToken, setUser, logout: storeLogout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await api.auth.login.post(data);
      if (res.data && 'error' in res.data) throw new Error(res.data.error);
      if (!res.data || !('token' in res.data)) throw new Error('Invalid response');
      return res.data as LoginResponse;
    },
    onSuccess: (data) => {
      setToken(data.token);
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupRequest) => {
      const res = await api.auth.signup.post(data);
      if (res.data && 'error' in res.data) throw new Error(res.data.error);
      if (!res.data || !('userId' in res.data)) throw new Error('Invalid response');
      return res.data as SignupResponse;
    },
  });

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.auth.me.get({
        headers: { authorization: `Bearer ${token}` }
      });
      if (res.data && 'error' in res.data) throw new Error(res.data.error);
      if (!res.data || !('userId' in res.data)) throw new Error('Invalid response');
      return res.data as ProfileResponse;
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (profileQuery.data) {
      setUser(profileQuery.data);
    }
  }, [profileQuery.data, setUser]);

  return {
    login: loginMutation,
    signup: signupMutation,
    user: profileQuery.data,
    logout: storeLogout,
    isLoginLoading: loginMutation.isPending,
    isSignupLoading: signupMutation.isPending,
    isProfileLoading: profileQuery.isLoading,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
  };
}