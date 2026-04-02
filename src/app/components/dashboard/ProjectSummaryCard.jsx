export function ProjectSummaryCard() {
  return (
    <article className="portal-card portal-summary-card">
      <div className="portal-summary-head">
        <div>
          <p className="portal-card-kicker">Project summary</p>
          <h2>Lakeview Residence Renovation</h2>
        </div>
        <span className="portal-status-pill">In Construction</span>
      </div>

      <p className="portal-card-copy">
        Your project is moving through finish coordination and site execution. This
        dashboard is designed to show only the information you need, when you need it.
      </p>

      <div className="portal-stat-grid">
        <div>
          <span>Current phase</span>
          <strong>Millwork + Lighting Install</strong>
        </div>
        <div>
          <span>Next milestone</span>
          <strong>Client walkthrough on April 12</strong>
        </div>
        <div>
          <span>Lead contact</span>
          <strong>Sarah Collins, Project Lead</strong>
        </div>
        <div>
          <span>Completion target</span>
          <strong>June 2026</strong>
        </div>
      </div>
    </article>
  );
}
