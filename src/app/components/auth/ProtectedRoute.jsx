import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router';

export function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return <div className="portal-loading">Loading portal session...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    );
  }

  return children;
}
