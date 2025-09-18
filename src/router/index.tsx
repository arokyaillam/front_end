// router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthPage } from '../components/auth/auth-page';
import { DashboardPage } from '../components/dashboard/dashboard-page';
import { ProtectedRoute } from './protected-route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/broker',
    element: (
      <ProtectedRoute>
        <div>Broker Connection Page (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: '/portfolio',
    element: (
      <ProtectedRoute>
        <div>Portfolio Page (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: '/orders',
    element: (
      <ProtectedRoute>
        <div>Orders Page (Coming Soon)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

// Export protected route as well
export { ProtectedRoute } from './protected-route';