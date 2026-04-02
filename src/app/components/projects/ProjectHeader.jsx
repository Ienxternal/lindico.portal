function formatProjectName(projectId = '') {
  return projectId
    .split('-')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export function ProjectHeader({ projectId }) {
  return (
    <header className="portal-section-header">
      <p className="portal-kicker">Project</p>
      <h1 className="portal-page-title">{formatProjectName(projectId)}</h1>
      <p className="portal-copy">
        Live files, milestones, and coordination details for this project will appear here.
      </p>
    </header>
  );
}
