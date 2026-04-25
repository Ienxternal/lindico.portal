import { useAuth0 } from '@auth0/auth0-react';
import { LogOut } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

function getInitials(name, email) {
  const source = name || email || 'LP';
  const parts = source.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function PortalHeader({ title = 'Client Portal' }) {
  const { user, logout } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const initials = useMemo(
    () => getInitials(user?.name, user?.email),
    [user?.email, user?.name],
  );

  useEffect(() => {
    function handlePointerDown(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

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
        <div className="portal-header-menu" ref={menuRef}>
          <button
            type="button"
            className="portal-header-avatar-button"
            aria-expanded={isMenuOpen}
            aria-label="Open account menu"
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            <span className="portal-header-avatar-fallback">{initials}</span>
          </button>

          {isMenuOpen ? (
            <div className="portal-header-menu-popover">
              <div className="portal-header-menu-profile">
                <strong>{user?.name || 'Portal User'}</strong>
                <span>{user?.email || 'Signed in'}</span>
              </div>
              <button
                type="button"
                className="portal-header-menu-action"
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin + '/sign-in' },
                  })
                }
              >
                <LogOut size={14} strokeWidth={1.8} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
