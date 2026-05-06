export function RecentActivityCard({ activities }) {
  return (
    <article className="portal-card portal-recent-card">
      <div className="portal-card-head">
        <div>
          <p className="portal-card-kicker">Updates</p>
          <h2 className="portal-card-title">Recent Activity</h2>
        </div>
      </div>

      <div className="portal-activity-list">
        {activities.map(([initials, color, name, action, time]) => (
          <div key={`${initials}-${time}`} className="portal-activity-row">
            <span
              className="portal-activity-avatar"
              style={{ backgroundColor: color }}
            >
              {initials}
            </span>
            <div>
              <div className="portal-activity-line">
                <strong>{name}</strong>
                <span className="portal-activity-action">{action}</span>
              </div>
              <span>{time}</span>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="portal-recent-activity-view">
        View all Updates
      </button>
    </article>
  );
}
