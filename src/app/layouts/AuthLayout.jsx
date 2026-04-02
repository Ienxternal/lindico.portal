import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <main className="portal-auth-layout">
      <section className="portal-auth-shell">
        <Outlet />
      </section>
    </main>
  );
}
