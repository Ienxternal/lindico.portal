import { SignUp } from '@clerk/clerk-react';

export function SignUpPage() {
  return (
    <section className="portal-panel">
      <p className="portal-kicker">Sign Up</p>
      <h1>Create your LindiCo portal access.</h1>
      <p className="portal-copy">
        Complete your account setup to review project details, files, and next steps.
      </p>
      <div className="portal-auth-card">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          forceRedirectUrl="/portal"
        />
      </div>
    </section>
  );
}
