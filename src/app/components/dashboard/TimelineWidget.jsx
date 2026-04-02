import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const timelineItems = [
  ['Apr 09', 'Site closed', 'Exterior material delivery and staging'],
  ['Apr 12', 'Sarah Collins', 'Client walkthrough on site at 10:00 AM'],
  ['Apr 18', 'Miguel Ramos', 'Out of office'],
  ['Apr 24', 'Electrical team', 'Lighting aiming and final controls'],
];

export function TimelineWidget() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`portal-timeline-rail ${isCollapsed ? 'is-collapsed' : ''}`}>
      <div className="portal-card-header portal-timeline-header">
        <button
          type="button"
          className="portal-timeline-heading"
          onClick={() => setIsCollapsed((value) => !value)}
        >
          <h2>Timeline</h2>
        </button>
        <button
          type="button"
          aria-label={isCollapsed ? 'Expand timeline' : 'Collapse timeline'}
          className="portal-timeline-toggle"
          onClick={() => setIsCollapsed((value) => !value)}
        >
          {isCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      <div className="portal-schedule-list">
        {timelineItems.map(([date, person, note]) => (
          <div key={`${date}-${person}`} className="portal-schedule-item">
            <div className="portal-schedule-entry">
              <div className="portal-schedule-date">{date}</div>
              {isCollapsed ? (
                <span className="portal-schedule-badge">1</span>
              ) : (
                <>
                  <p>{person}</p>
                  <span>{note}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
