function formatProjectName(projectId = '') {
  return projectId
    .split('-')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export function ProjectHeader({ projectId }) {
  return (
    <header className="portal-page-header portal-section-header">
      <div>
        <p className="portal-page-eyebrow">Project Workspace</p>
        <h1 className="portal-page-title">{formatProjectName(projectId)}</h1>
        <div className="portal-page-meta">
          <span>Live files</span>
          <span className="portal-page-meta-sep">·</span>
          <span>Approvals</span>
          <span className="portal-page-meta-sep">·</span>
          <span>Coordination updates</span>
        </div>
      </div>
      <span className="portal-status-pill">Client View</span>
    </header>
  );
}
