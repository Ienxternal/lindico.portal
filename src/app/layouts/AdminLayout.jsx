import { Outlet } from 'react-router';
import { AdminSidebar } from '../components/navigation/AdminSidebar';
import { PortalHeader } from '../components/navigation/PortalHeader';

export function AdminLayout() {
  return (
    <div className="portal-app-layout">
      <PortalHeader
        eyebrow="Admin Workspace"
        title="Operations Dashboard"
      />
      <div className="portal-app-body">
        <AdminSidebar />
        <main className="portal-app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
