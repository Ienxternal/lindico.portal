export function ProjectOverviewCard({ overview }) {
  return (
    <article className="portal-card portal-overview-card">
      <div className="portal-card-head">
        <div>
          <p className="portal-card-kicker">Project Status</p>
          <h2 className="portal-card-title">Overall Completion</h2>
        </div>
      </div>

      <div className="portal-overview-body">
        <div className="portal-overview-hero">
          <div className="portal-overview-percent">{overview.percent}%</div>
          <div className="portal-overview-meta">
            <p className="portal-overview-label">{overview.label}</p>
            <p className="portal-overview-sub">{overview.sub}</p>
          </div>
        </div>

        <div className="portal-progress-list">
          {overview.progressTracks.map(([label, percent, done, active]) => (
            <div key={label} className="portal-progress-row">
              <div className="portal-progress-head">
                <span className="portal-progress-name">
                  {done ? <span className="portal-progress-check">/</span> : null}
                  {active ? <span className="portal-progress-dot" /> : null}
                  {label}
                </span>
                <span className="portal-progress-percent">{percent}%</span>
              </div>
              <div className="portal-progress-bar">
                <span
                  className={`portal-progress-fill${done ? ' is-done' : active ? ' is-active' : ''}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
