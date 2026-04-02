export function FileListWidget() {
  return (
    <article className="portal-card">
      <div className="portal-card-header">
        <div>
          <p className="portal-card-kicker">Client essentials</p>
          <h2>What you likely need next</h2>
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
          <ul>
            <li>Lighting submittal package</li>
            <li>Updated project schedule PDF</li>
            <li>Cabinet hardware sample sheet</li>
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
