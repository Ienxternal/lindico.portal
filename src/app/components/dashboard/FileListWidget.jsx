export function FileListWidget() {
  return (
    <article className="portal-card">
      <div className="portal-card-head">
        <div>
          <p className="portal-card-kicker">Client Essentials</p>
          <h2 className="portal-card-title">What you likely need next</h2>
        </div>
      </div>

      <div className="portal-client-info-grid">
        <div>
          <h3>Upcoming decisions</h3>
          <ul>
            <li>Confirm dining fixture finish</li>
            <li>Approve primary bath mirror package</li>
            <li>Review outdoor heater placement</li>
          </ul>
        </div>
        <div id="documents">
          <h3>Latest documents</h3>
          <ul className="portal-doc-list">
            {[
              { name: 'Lighting submittal package', type: 'PDF' },
              { name: 'Updated project schedule', type: 'PDF' },
              { name: 'Cabinet hardware sample sheet', type: 'XLSX' },
            ].map(({ name, type }) => (
              <li key={name} className="portal-doc-item">
                <span className={`portal-doc-badge portal-doc-badge--${type.toLowerCase()}`}>{type}</span>
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div id="contacts">
          <h3>Key contacts</h3>
          <ul>
            <li>Sarah Collins, Project Lead</li>
            <li>Marcus Hale, Site Superintendent</li>
            <li>LindiCo Studio, Client Support</li>
          </ul>
        </div>
      </div>
    </article>
  );
}
