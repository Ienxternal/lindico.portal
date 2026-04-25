import { CalendarDays, MapPinHouse, MessageSquareMore, Share2 } from 'lucide-react';
import { projectManagerContact, projectSummaryDetails } from '../../data/portalDashboardData';
import { ContactSaveControl } from './ContactSaveControl';

export function ProjectSummaryCard() {
  async function handleShareProject() {
    const shareUrl = `${window.location.origin}/portal/project/lakeview-residence-renovation`;
    const shareData = {
      title: 'Lakeview Residence Renovation',
      text: 'Project portal access for Lakeview Residence Renovation',
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Ignore clipboard failures for now since the button is still useful as a visible action.
    }
  }

  return (
    <article className="portal-info-pair">
      <section className="portal-info-pane">
        <div className="portal-card-head">
          <div>
            <p className="portal-card-kicker">Active Project</p>
            <h2 className="portal-card-title">Project Details</h2>
          </div>
        </div>
        <div className="portal-info-summary">
          <div className="portal-info-summary-head">
            <p className="portal-info-summary-kicker">Overview</p>
            <div className="portal-share-tooltip-wrap">
              <button
                type="button"
                className="portal-share-button"
                aria-label="Share project details"
                onClick={handleShareProject}
              >
                <Share2 size={16} strokeWidth={1.8} />
              </button>
              <span className="portal-share-tooltip" aria-hidden="true">
                Share This Project!
              </span>
            </div>
          </div>
          <p className="portal-info-summary-title">{projectSummaryDetails.overviewTitle}</p>
          <p className="portal-info-summary-text">{projectSummaryDetails.overviewText}</p>
        </div>
        <div className="portal-info-grid">
          {projectSummaryDetails.infoGrid.map(([label, value, sub]) => (
            <div key={label} className="portal-info-grid-card">
              <p className="portal-info-grid-label">{label}</p>
              <p className="portal-info-grid-value">{value}</p>
              <p className="portal-info-grid-sub">{sub}</p>
            </div>
          ))}
        </div>
        <div className="portal-info-flow">
          {projectSummaryDetails.infoFlow.map(([label, date, value]) => (
            <div key={label} className="portal-info-flow-row">
              <span className="portal-info-label">{label}</span>
              <div className="portal-info-flow-content">
                <p className="portal-info-value">{value}</p>
                <p className="portal-info-flow-date">{date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="portal-info-divider" />

      <section className="portal-info-pane">
        <div className="portal-card-head">
          <div>
            <p className="portal-card-kicker">Lead Contact</p>
            <h2 className="portal-card-title">Project Manager</h2>
          </div>
        </div>
        <div className="portal-contact-card">
          <div className="portal-contact-hero">
            <div className="portal-contact-hero-main">
              <div className="portal-contact-avatar">AN</div>
              <div className="portal-contact-identity">
                <p className="portal-contact-name">Alex Nguyen, PMP</p>
                <div className="portal-contact-role-row">
                  <p className="portal-contact-role">Project Director - LindiCo.</p>
                  {/* <ContactSaveControl
                    className="is-role"
                    label="Save Contact"
                    filename={projectManagerContact.filename}
                    mecard={projectManagerContact.mecard}
                    vcard={projectManagerContact.vcard}
                  /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="portal-contact-list">
            {projectSummaryDetails.contactRows.map(([label, value]) => (
              <div key={label} className="portal-contact-row">
                <span>{label}</span>
                <p>{value}</p>
              </div>
            ))}
            <div className="portal-contact-row portal-contact-row-onsite">
              <span>Next On Site</span>
              <div className="portal-contact-onsite">
                <div className="portal-contact-onsite-meta">
                  <span className="portal-contact-inline-icon" aria-hidden="true">
                    <MapPinHouse size={13} strokeWidth={1.8} />
                  </span>
                  <span className="portal-contact-onsite-date">Tue, Apr 28</span>
                </div>
                <p className="portal-contact-onsite-title">10:30 AM walkthrough</p>
              </div>
            </div>
          </div>
          <div className="portal-contact-actions">
            <button type="button" className="portal-contact-action-button">
              <CalendarDays size={18} strokeWidth={1.8} />
              <span>Schedule Meeting</span>
            </button>
            <button type="button" className="portal-contact-action-button is-secondary">
              <MessageSquareMore size={18} strokeWidth={1.8} />
              <span>Request Update</span>
            </button>
            <div className="portal-contact-actions-save">
              <ContactSaveControl
                className="is-actions"
                label="Save Contact"
                filename={projectManagerContact.filename}
                mecard={projectManagerContact.mecard}
                vcard={projectManagerContact.vcard}
              />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
