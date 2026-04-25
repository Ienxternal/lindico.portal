export function ProjectActivity() {
  return (
    <article className="portal-card">
      <div className="portal-card-head">
        <div>
          <p className="portal-card-kicker">Updates</p>
          <h2 className="portal-card-title">Recent activity</h2>
        </div>
      </div>
      <div className="portal-activity-list">
        {[
          ['SC', 'Sarah Collins uploaded revised lighting specs', '2h ago'],
          ['JR', 'James Reid marked rough electrical inspection complete', 'Yesterday'],
          ['EH', 'E. Harrison requested approval on landscape fixture finish', 'Apr 17'],
          ['TM', 'Tim Marsh added site photos from the kitchen install', 'Apr 16'],
        ].map(([initials, message, time]) => (
          <div key={message} className="portal-activity-row">
            <span className="portal-activity-avatar">{initials}</span>
            <div>
              <p>{message}</p>
              <span>{time}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
