import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

export function SignUpPage() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void loginWithRedirect({
        appState: { returnTo: '/portal' },
        authorizationParams: {
          screen_hint: 'signup',
        },
      });
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return (
    <section className="portal-panel">
      <p className="portal-kicker">Sign Up</p>
      <h1>Create your LindiCo portal access.</h1>
      <p className="portal-copy">
        Redirecting you to complete your account setup securely.
      </p>
    </section>
  );
}
