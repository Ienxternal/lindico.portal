import { SignIn } from '@clerk/clerk-react';

export function SignInPage() {
  return (
    <section className="portal-panel">
      <p className="portal-kicker">Sign In</p>
      <h1>Welcome back to your project portal.</h1>
      <p className="portal-copy">
        Access project updates, approvals, files, and communication in one secure place.
      </p>
      <div className="portal-auth-card">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          forceRedirectUrl="/portal"
        />
      </div>
    </section>
  );
}
