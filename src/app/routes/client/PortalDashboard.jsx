import { useEffect, useRef, useState } from 'react';
import { ProjectCalendar } from '../../components/dashboard/ProjectCalendar';
import { ProjectOverviewCard } from '../../components/dashboard/ProjectOverviewCard';
import { ProjectSummaryCard } from '../../components/dashboard/ProjectSummaryCard';
import { RecentActivityCard } from '../../components/dashboard/RecentActivityCard';
import { FileListWidget } from '../../components/dashboard/FileListWidget';
import { requiredActions } from '../../data/portalDashboardData';

export function PortalDashboard() {
  const actionsRef = useRef(null);
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  useEffect(() => {
    function handlePointerDown(event) {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setIsActionsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <section className="portal-page-shell">
      <header className="portal-page-header">
        <div>
          <p className="portal-page-eyebrow">Dashboard - April 2026</p>
          <h1 className="portal-page-title">Welcome back, Tira!</h1>
        </div>

        <div className="portal-page-header-meta">
          <div className="portal-page-action-menu" ref={actionsRef}>
            <button
              type="button"
              className={`portal-page-header-todo${isActionsOpen ? ' is-open' : ''}`}
              aria-expanded={isActionsOpen}
              onClick={() => setIsActionsOpen((value) => !value)}
            >
              <span>Client Actions</span>
              <span className="portal-page-header-action-count">
                {requiredActions.length}
                <span className="portal-page-header-pending-dot" />
              </span>
            </button>

            <div className={`portal-page-action-popover${isActionsOpen ? ' is-open' : ''}`}>
              <div className="portal-page-action-popover-head">
                <p>Required Actions</p>
                <span>{requiredActions.length} open</span>
              </div>
              <div className="portal-page-action-list">
                {requiredActions.slice(0, 4).map(([type, title]) => (
                  <button key={title} type="button" className="portal-page-action-item">
                    <span className="portal-page-action-type">{type}</span>
                    <span className="portal-page-action-title">{title}</span>
                  </button>
                ))}
              </div>
              {requiredActions.length > 4 ? (
                <button type="button" className="portal-page-action-view-all">
                  View all actions
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div className="portal-stack">
        <ProjectSummaryCard />

        <div className="portal-dashboard-feature-row">
          <ProjectOverviewCard />
          <RecentActivityCard />
        </div>

        <div id="schedule" className="portal-calendar-section">
          <ProjectCalendar />
        </div>

        <FileListWidget />
      </div>
    </section>
  );
}
