// router/protected-route.tsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, token } = useAuthStore();
  
  if (!isAuthenticated || !token) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}