import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export function AcceptInvitePage() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const [searchParams] = useSearchParams();
  const invitation = searchParams.get('invitation');
  const organization = searchParams.get('organization');
  const organizationName = searchParams.get('organization_name');

  useEffect(() => {
    if (!invitation || !organization || isLoading || isAuthenticated) {
      return;
    }

    void loginWithRedirect({
      appState: { returnTo: '/portal' },
      authorizationParams: {
        invitation,
        organization,
        screen_hint: 'signup',
      },
    });
  }, [invitation, organization, isAuthenticated, isLoading, loginWithRedirect]);

  if (!invitation || !organization) {
    return (
      <section className="portal-panel">
        <p className="portal-kicker">Accept Invite</p>
        <h1>Invitation link is incomplete.</h1>
        <p className="portal-copy">
          This invitation URL is missing the required Auth0 invitation details.
        </p>
      </section>
    );
  }

  return (
    <section className="portal-panel">
      <p className="portal-kicker">Accept Invite</p>
      <h1>Join your project workspace.</h1>
      <p className="portal-copy">
        Redirecting you to the secure invitation flow for{' '}
        <strong>{organizationName || organization}</strong>.
      </p>
      <div className="portal-token-box">
        <span>Invitation</span>
        <strong>{invitation}</strong>
      </div>
    </section>
  );
}
