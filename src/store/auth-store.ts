// store/auth-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// User type (backend-ல இருந்து infer ஆகும்)
type User = {
  userId: string;
  email: string;
};

// Auth Store State
interface AuthState {
  // State
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearToken: () => void;
  logout: () => void;
}

/**
 * Zustand Auth Store with LocalStorage Persistence
 * JWT token அடி localStorage-ல் persist பண்ணும்
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial State
      token: null,
      user: null,
      isAuthenticated: false,

      // Actions
      setToken: (token: string) => {
        set({ 
          token, 
          isAuthenticated: true 
        });
      },

      setUser: (user: User) => {
        set({ user });
      },

      clearToken: () => {
        set({ 
          token: null, 
          isAuthenticated: false,
          user: null 
        });
      },

      logout: () => {
        set({ 
          token: null, 
          user: null, 
          isAuthenticated: false 
        });
      },
    }),
    {
      name: 'trading-auth', // localStorage key
      storage: createJSONStorage(() => localStorage),
      
      // Only persist token, not user data (security)
      partialize: (state) => ({ 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Selectors (Performance optimization)
export const useToken = () => useAuthStore((state) => state.token);
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);