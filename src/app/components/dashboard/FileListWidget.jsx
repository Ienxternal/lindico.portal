export function FileListWidget({ clientEssentials }) {
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
            {clientEssentials.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </div>
        <div id="documents">
          <h3>Latest documents</h3>
          <ul className="portal-doc-list">
            {clientEssentials.documents.map(({ name, type }) => (
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
            {clientEssentials.contacts.map((contact) => (
              <li key={contact}>{contact}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
