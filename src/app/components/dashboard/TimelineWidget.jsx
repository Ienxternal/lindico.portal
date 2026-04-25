const timelineItems = [
  ['Apr 09', 'Site closed', 'Exterior material delivery and staging'],
  ['Apr 12', 'Sarah Collins', 'Client walkthrough on site at 10:00 AM'],
  ['Apr 18', 'Miguel Ramos', 'Out of office'],
  ['Apr 24', 'Electrical team', 'Lighting aiming and final controls'],
];

export function TimelineWidget() {
  return (
    <aside className="portal-timeline-rail">
      <div className="portal-card-header portal-timeline-header">
        <div className="portal-timeline-heading">
          <h2>Timeline</h2>
        </div>
      </div>

      <div className="portal-schedule-list">
        {timelineItems.map(([date, person, note]) => (
          <div key={`${date}-${person}`} className="portal-schedule-item">
            <div className="portal-schedule-entry">
              <div className="portal-schedule-date">{date}</div>
              <p>{person}</p>
              <span>{note}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
