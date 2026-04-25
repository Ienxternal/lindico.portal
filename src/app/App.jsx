import { Auth0Provider } from '@auth0/auth0-react';
import { AppRouter } from './router';
import {
  getAuth0ClientId,
  getAuth0Domain,
  getAuth0Audience,
} from './lib/auth/auth0';

export default function App() {
  const domain = getAuth0Domain();
  const clientId = getAuth0ClientId();
  const audience = getAuth0Audience();

  if (!domain || !clientId) {
    return (
      <main className="portal-auth-layout">
        <section className="portal-panel">
          <p className="portal-kicker">Portal Setup</p>
          <h1>Add your Auth0 configuration to continue.</h1>
          <p className="portal-copy">
            Set <code>VITE_AUTH0_DOMAIN</code> and <code>VITE_AUTH0_CLIENT_ID</code> in
            your environment file, then restart the dev server.
          </p>
        </section>
      </main>
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      onRedirectCallback={(appState) => {
        window.location.replace(appState?.returnTo || '/portal');
      }}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/auth/callback`,
        audience: audience || undefined,
      }}
      cacheLocation="localstorage"
      useRefreshTokens
    >
      <AppRouter />
    </Auth0Provider>
  );
}
