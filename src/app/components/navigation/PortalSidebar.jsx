import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { portalProjects, supportNav, workspaceNav } from '../../data/portalSidebarData';

export function PortalSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const switcherRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const currentProject = useMemo(() => {
    const match = location.pathname.match(/^\/portal\/project\/([^/]+)/);
    const projectId = match?.[1];
    return portalProjects.find((project) => project.id === projectId) ?? portalProjects[0];
  }, [location.pathname]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  function handleProjectSelect(projectId) {
    setIsOpen(false);
    navigate(`/portal/project/${projectId}`);
  }

  return (
    <aside className="portal-sidebar">
      <div className="portal-sidebar-project" ref={switcherRef}>
        <div className="portal-sidebar-project-head">
          <p className="portal-sidebar-label">Active Project</p>
          <div className="portal-sidebar-project-actions">
            <button
              type="button"
              className={`portal-sidebar-switcher${isOpen ? ' is-open' : ''}`}
              aria-expanded={isOpen}
              aria-label="Switch project"
              onClick={() => setIsOpen((value) => !value)}
            >
              <ChevronDown size={14} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        <button
          type="button"
          className={`portal-sidebar-project-trigger${isOpen ? ' is-open' : ''}`}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="portal-sidebar-title">{currentProject.name}</span>
          <span className="portal-sidebar-subtitle">
            Ref #{currentProject.ref} - {currentProject.location}
          </span>
          <span className="portal-sidebar-status">
            <span className="portal-sidebar-status-dot" />
            <span>
              {currentProject.status} · {currentProject.progress}
            </span>
          </span>
        </button>

        <div
          className={`portal-sidebar-project-menu${isOpen ? ' is-open' : ''}`}
          aria-hidden={!isOpen}
        >
          <p className="portal-sidebar-project-menu-label">Switch Project</p>
          <div className="portal-sidebar-project-list">
            {portalProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`portal-sidebar-project-option${
                  project.id === currentProject.id ? ' is-current' : ''
                }`}
                onClick={() => handleProjectSelect(project.id)}
                tabIndex={isOpen ? 0 : -1}
              >
                <span className="portal-sidebar-project-option-name">{project.name}</span>
                <span className="portal-sidebar-project-option-meta">
                  Ref #{project.ref} - {project.location}
                </span>
                <span className="portal-sidebar-project-option-status">
                  {project.status} · {project.progress}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <nav className="portal-sidebar-nav">
        <p className="portal-sidebar-label portal-sidebar-label-workspace">Workspace</p>
        {workspaceNav.map(({ label, to, href, icon: Icon, badge }) =>
          to ? (
            <NavLink
              key={label}
              to={to}
              end={to === '/portal'}
              className={({ isActive }) =>
                `portal-sidebar-link${isActive ? ' is-active' : ''}`
              }
            >
              <Icon size={15} strokeWidth={1.6} className="portal-sidebar-link-icon" />
              <span>{label}</span>
              {badge ? <span className="portal-sidebar-badge">{badge}</span> : null}
            </NavLink>
          ) : (
            <a key={label} href={href} className="portal-sidebar-link">
              <Icon size={15} strokeWidth={1.6} className="portal-sidebar-link-icon" />
              <span>{label}</span>
            </a>
          ),
        )}
      </nav>

      <nav className="portal-sidebar-nav">
        <p className="portal-sidebar-label">Support</p>
        {supportNav.map(({ label, href, icon: Icon, badge }) => (
          <a key={label} href={href} className="portal-sidebar-link">
            <Icon size={15} strokeWidth={1.6} className="portal-sidebar-link-icon" />
            <span>{label}</span>
            {badge ? <span className="portal-sidebar-badge">{badge}</span> : null}
          </a>
        ))}
      </nav>
    </aside>
  );
}
