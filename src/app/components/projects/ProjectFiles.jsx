export function ProjectFiles() {
  return (
    <article className="portal-card">
      <div className="portal-card-head">
        <div>
          <p className="portal-card-kicker">Documents</p>
          <h2 className="portal-card-title">Project files</h2>
        </div>
      </div>
      <div className="portal-resource-list">
        {[
          ['Lighting submittal package', 'PDF · Updated April 16'],
          ['Finish schedule revision 03', 'XLSX · Shared with client'],
          ['Primary suite millwork drawings', 'PDF · Ready for review'],
          ['Kitchen appliance cut sheets', 'ZIP · Vendor attachments'],
        ].map(([title, meta]) => (
          <div key={title} className="portal-resource-row">
            <div>
              <p>{title}</p>
              <span>{meta}</span>
            </div>
            <button type="button" className="portal-inline-action">
              View
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}
