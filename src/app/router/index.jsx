import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router';
import { AuthLayout } from '../layouts/AuthLayout';
import { PortalLayout } from '../layouts/PortalLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AdminRoute } from '../components/auth/AdminRoute';
import { SignInPage } from '../routes/auth/SignInPage';
import { SignUpPage } from '../routes/auth/SignUpPage';
import { AcceptInvitePage } from '../routes/auth/AcceptInvitePage';
import { PortalDashboard } from '../routes/client/PortalDashboard';
import { PortalProject } from '../routes/client/PortalProject';
import { AdminDashboard } from '../routes/admin/AdminDashboard';
import { AdminProjects } from '../routes/admin/AdminProjects';
import { AdminNewProject } from '../routes/admin/AdminNewProject';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/accept-invite/:token/*" element={<AcceptInvitePage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <PortalLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/portal" element={<PortalDashboard />} />
          <Route path="/portal/project/:projectId" element={<PortalProject />} />
        </Route>

        <Route
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/projects/new" element={<AdminNewProject />} />
        </Route>

        <Route path="*" element={<Navigate to="/portal" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
