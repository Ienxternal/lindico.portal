import { Link } from 'react-router';

export function PortalSidebar() {
  return (
    <aside className="portal-sidebar">
      <nav className="portal-sidebar-nav">
        <p className="portal-sidebar-label">Workspace</p>
        <Link to="/portal">Dashboard</Link>
        <Link to="/portal/project/sample-project">Project</Link>
        <a href="#documents">Documents</a>
        <a href="#schedule">Schedule</a>
      </nav>

      <div className="portal-sidebar-divider" />

      <nav className="portal-sidebar-nav">
        <p className="portal-sidebar-label">Support</p>
        <a href="#contacts">Team</a>
        <a href="#decisions">Approvals</a>
      </nav>

      <div className="portal-sidebar-note">
        <p>Project Access</p>
        <span>Secure updates, files, and next steps in one place.</span>
      </div>
    </aside>
  );
}
