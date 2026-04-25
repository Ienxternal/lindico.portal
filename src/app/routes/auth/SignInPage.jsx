import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function SignInPage() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();
  const returnTo = location.state?.from || '/portal';

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void loginWithRedirect({
        appState: { returnTo },
        authorizationParams: {
          screen_hint: 'login',
        },
      });
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, returnTo]);

  return (
    <section className="portal-panel">
      <p className="portal-kicker">Sign In</p>
      <h1>Welcome back to your project portal.</h1>
      <p className="portal-copy">
        Redirecting you to the secure sign-in experience.
      </p>
    </section>
  );
}
