import { SignUp } from '@clerk/clerk-react';
import { useParams } from 'react-router';

export function AcceptInvitePage() {
  const { token } = useParams();

  return (
    <section className="portal-panel">
      <p className="portal-kicker">Accept Invite</p>
      <h1>Join your project workspace.</h1>
      <p className="portal-copy">
        This route is now Clerk-ready. The next step is validating the invite token
        against your database and binding it to the correct project membership.
      </p>
      <div className="portal-token-box">
        <span>Invite token</span>
        <strong>{token}</strong>
      </div>
      <div className="portal-auth-card">
        <SignUp
          routing="virtual"
          signInUrl="/sign-in"
          forceRedirectUrl="/portal"
        />
      </div>
    </section>
  );
}
