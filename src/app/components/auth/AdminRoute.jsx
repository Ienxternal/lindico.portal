import { useAuth, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router';
import { isAdminUser } from '../../lib/auth/permissions';

export function AdminRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return <div className="portal-loading">Checking admin access...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!isAdminUser(user)) {
    return <Navigate to="/portal" replace />;
  }

  return children;
}
