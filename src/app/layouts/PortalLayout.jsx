import { Outlet } from 'react-router';
import { PortalSidebar } from '../components/navigation/PortalSidebar';
import { PortalHeader } from '../components/navigation/PortalHeader';

export function PortalLayout() {
  return (
    <div className="portal-app-layout">
      <PortalHeader
        eyebrow="Project Access"
        title="Client Portal"
      />
      <div className="portal-app-body">
        <PortalSidebar />
        <main className="portal-app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
