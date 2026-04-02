import { Link } from 'react-router';

export function AdminSidebar() {
  return (
    <aside className="portal-sidebar">
      <p className="portal-sidebar-brand">LindiCo Admin</p>
      <nav className="portal-sidebar-nav">
        <Link to="/admin">Overview</Link>
        <Link to="/admin/projects">Projects</Link>
        <Link to="/admin/projects/new">New Project</Link>
      </nav>
    </aside>
  );
}
