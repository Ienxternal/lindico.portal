import { useNavigate } from 'react-router';
import { ProjectCalendar } from '../../components/dashboard/ProjectCalendar';
import { ProjectSummaryCard } from '../../components/dashboard/ProjectSummaryCard';
import { TimelineWidget } from '../../components/dashboard/TimelineWidget';
import { FileListWidget } from '../../components/dashboard/FileListWidget';

const clientProjects = [
  {
    id: 'lakeview-residence-renovation',
    label: 'Lakeview Residence Renovation - 5849.032826',
  },
  {
    id: 'north-shore-smart-home',
    label: 'North Shore Smart Home - 1942.041526',
  },
  {
    id: 'cedar-terrace-outdoor-living',
    label: 'Cedar Terrace Outdoor Living - 7721.021426',
  },
];

export function PortalDashboard() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="portal-dashboard-topbar">
        <p className="portal-kicker">Overview</p>

        <div className="portal-dashboard-select-inline">
          <p className="portal-kicker">Project</p>
          <label className="portal-dashboard-select-shell portal-dashboard-select-shell-inline">
            <select
              aria-label="Select project"
              className="portal-dashboard-select"
              defaultValue={clientProjects[0].id}
              onChange={(event) => navigate(`/portal/project/${event.target.value}`)}
            >
              {clientProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="portal-stack">
        <ProjectSummaryCard />

        <div className="portal-section-break">
          <span />
          <p>Schedule</p>
          <span />
        </div>

        <div id="schedule" className="portal-calendar-section">
          <ProjectCalendar />

          <TimelineWidget />
        </div>

        <div className="portal-section-break">
          <span />
          <p>Client Information</p>
          <span />
        </div>

        <FileListWidget />
      </div>
    </section>
  );
}
