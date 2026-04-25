import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router';
import { isAdminUser } from '../../lib/auth/permissions';

export function AdminRoute({ children }) {
  const { isLoading, isAuthenticated, user } = useAuth0();

  if (isLoading) {
    return <div className="portal-loading">Checking admin access...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!isAdminUser(user)) {
    return <Navigate to="/portal" replace />;
  }

  return children;
}
