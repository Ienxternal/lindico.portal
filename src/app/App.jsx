import { ClerkProvider } from '@clerk/clerk-react';
import { AppRouter } from './router';
import { getClerkPublishableKey } from './lib/auth/clerk';

export default function App() {
  const publishableKey = getClerkPublishableKey();

  if (!publishableKey) {
    return (
      <main className="portal-auth-layout">
        <section className="portal-panel">
          <p className="portal-kicker">Portal Setup</p>
          <h1>Add your Clerk publishable key to continue.</h1>
          <p className="portal-copy">
            Set <code>VITE_CLERK_PUBLISHABLE_KEY</code> in an environment file for the
            portal app, then restart the dev server to enable authentication.
          </p>
        </section>
      </main>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <AppRouter />
    </ClerkProvider>
  );
}
