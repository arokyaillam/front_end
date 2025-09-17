// hooks/use-auth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/eden-client';
import { useAuthStore } from '../store/auth-store';

// Type definitions (Backend-ல இருந்து infer ஆகும்)
type SignupData = {
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

export function useAuth() {
  const queryClient = useQueryClient();
  const { token, setToken, clearToken } = useAuthStore();

  /**
   * 1. Signup Mutation
   */
  const signupMutation = useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await api.auth.signup.post(data);
      if (response.error) throw new Error(response.error as string);
      return response.data;
    },
    onSuccess: () => {
      // Signup success-க்கு அப்புறம் login page-க்கு redirect பண்ணலாம்
      console.log('Signup successful!');
    },
    onError: (error) => {
      console.error('Signup error:', error);
    },
  });

  /**
   * 2. Login Mutation
   */
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await api.auth.login.post(data);
      if (response.error) throw new Error(response.error as string);
      return response.data;
    },
    onSuccess: (data) => {
      // Token save பண்ணுன்டு, user data cache பண்ணலாம்
      if (data && 'token' in data) {
        setToken(data.token);
        queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  /**
   * 3. User Profile Query (Protected)
   */
  const profileQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      if (!token) throw new Error('No token available');
      
      const response = await api.auth.me.get({
        headers: { authorization: `Bearer ${token}` }
      });
      
      if (response.error) throw new Error(response.error as string);
      return response.data;
    },
    enabled: !!token, // Token இருந்தால் மட்டும் run பண்ணு
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  /**
   * 4. Logout Function
   */
  const logout = () => {
    clearToken();
    queryClient.clear(); // All cached data clear பண்ணு
  };

  return {
    // States
    isAuthenticated: !!token,
    user: profileQuery.data,
    token,
    
    // Mutations
    signup: signupMutation,
    login: loginMutation,
    logout,
    
    // Queries
    profile: profileQuery,
    
    // Loading states
    isSignupLoading: signupMutation.isPending,
    isLoginLoading: loginMutation.isPending,
    isProfileLoading: profileQuery.isLoading,
  };
}