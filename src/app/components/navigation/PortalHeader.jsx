import { UserButton } from '@clerk/clerk-react';

export function PortalHeader({
  eyebrow = 'Project Access',
  title = 'Client Portal',
}) {
  return (
    <header className="portal-header">
      <div className="portal-header-side">
        <a href="/" className="portal-header-brand">
          LINDICO
        </a>
      </div>
      <div className="portal-header-center">
        <div className="portal-header-title-block">
          <p className="portal-header-title">{title}</p>
        </div>
      </div>
      <div className="portal-header-side portal-header-user">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
}
