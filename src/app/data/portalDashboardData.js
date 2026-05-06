export const defaultPortalProjectId = 'lakeview-residence-renovation';

export const portalDashboardProjects = {
  'lakeview-residence-renovation': {
    dashboardEyebrow: 'Lakeview Residence Renovation · April 2026',
    dashboardTitle: 'Welcome back, Tira!',
    requiredActions: [
      ['Approval', 'Approve marble specification v2'],
      ['Review', 'Review exterior lighting options'],
      ['Schedule', 'Confirm walkthrough availability'],
      ['Upload', 'Upload appliance warranty documents'],
      ['Decision', 'Select final cabinet hardware finish'],
    ],
    projectManagerContact: {
      displayInitials: 'AN',
      displayName: 'Alex Nguyen, PMP',
      displayRole: 'Project Director - LindiCo.',
      nextOnSiteDate: 'Tue, Apr 28',
      nextOnSiteTitle: '10:30 AM walkthrough',
      filename: 'alex-nguyen-lindico.vcf',
      mecard: ['MECARD:', 'N:Nguyen,Alex', 'TEL:(651) 000-0000', 'EMAIL:a.nguyen@lindico.us', ';'].join(';'),
      vcard: [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:Alex Nguyen, PMP',
        'N:Nguyen;Alex;;;PMP',
        'ORG:LindiCo',
        'TITLE:Project Director',
        'TEL;TYPE=CELL:(651) 000-0000',
        'EMAIL;TYPE=INTERNET:a.nguyen@lindico.us',
        'ADR;TYPE=WORK:;;123 Main Street;Minneapolis;MN;;;United States',
        'NOTE:Project Manager for Lakeview Residence Kitchen & Bath Renovation',
        'END:VCARD',
      ].join('\n'),
    },
    projectSummaryDetails: {
      overviewTitle: 'Lakeview Residence Kitchen & Bath Renovation',
      overviewText:
        'A full interior renovation focused on the kitchen, primary bath, and adjacent living spaces, with upgraded finishes, custom millwork, and layered lighting throughout. The work is designed to improve day-to-day function while bringing a warmer, more tailored feel across the home’s primary shared rooms and private retreat spaces.',
      infoGrid: [
        ['Location', 'Lakeview, IL', '6,200 sq ft - Full Interior Scope'],
        ['Timeline', 'Jan 2026 -> Jun 2026', '71 days remaining to completion'],
      ],
      infoFlow: [
        ['Current', 'Apr 22', 'Landscape consultation'],
        ['Next', 'Apr 24', 'Quarterly progress review'],
      ],
      contactRows: [
        ['Mobile', '(651) 000-0000'],
        ['Email', 'a.nguyen@lindico.us'],
        ['Office', '123 Main Street, Minneapolis, MN'],
        ['Hours', 'Mon - Fri - 8 am - 6 pm CT'],
      ],
    },
    overview: {
      percent: 62,
      label: 'Overall Complete',
      sub: 'Target completion by June 2026',
      progressTracks: [
        ['Planning & Design', 100, true, false],
        ['Procurement', 92, true, false],
        ['On-Site Work', 68, false, true],
        ['Final Styling', 24, false, false],
      ],
    },
    recentActivity: [
      ['AN', '#9cb6e9', 'Alex Nguyen', 'updated the project portal', '2h ago'],
      ['SC', '#b09770', 'Alex Nguyen', 'uploaded Marble Specifications v2.pdf', '2h ago'],
      ['JR', '#4a7a5a', 'James Reid', 'marked Electrical Inspection as complete', 'Yesterday'],
      ['EH', '#6d52b8', 'E. Harrison', 'commented on the project timeline', 'Yesterday'],
    ],
    clientEssentials: {
      decisions: [
        'Confirm dining fixture finish',
        'Approve primary bath mirror package',
        'Review outdoor heater placement',
      ],
      documents: [
        { name: 'Lighting submittal package', type: 'PDF' },
        { name: 'Updated project schedule', type: 'PDF' },
        { name: 'Cabinet hardware sample sheet', type: 'XLSX' },
      ],
      contacts: [
        'Sarah Collins, Project Lead',
        'Marcus Hale, Site Superintendent',
        'LindiCo Studio, Client Support',
      ],
    },
  },
  'north-shore-smart-home': {
    dashboardEyebrow: 'North Shore Smart Home · May 2026',
    dashboardTitle: 'Welcome back, Tira!',
    requiredActions: [
      ['Approval', 'Approve theater acoustic panel finish'],
      ['Review', 'Review lighting keypad engraving set'],
      ['Schedule', 'Confirm AV training availability'],
      ['Decision', 'Select pool house millwork stain'],
    ],
    projectManagerContact: {
      displayInitials: 'MC',
      displayName: 'Maya Chen, PMP',
      displayRole: 'Project Director - LindiCo.',
      nextOnSiteDate: 'Thu, May 14',
      nextOnSiteTitle: '2:00 PM systems coordination',
      filename: 'maya-chen-lindico.vcf',
      mecard: ['MECARD:', 'N:Chen,Maya', 'TEL:(312) 555-0144', 'EMAIL:m.chen@lindico.us', ';'].join(';'),
      vcard: [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:Maya Chen, PMP',
        'N:Chen;Maya;;;PMP',
        'ORG:LindiCo',
        'TITLE:Project Director',
        'TEL;TYPE=CELL:(312) 555-0144',
        'EMAIL;TYPE=INTERNET:m.chen@lindico.us',
        'ADR;TYPE=WORK:;;401 W Huron Street;Chicago;IL;;;United States',
        'NOTE:Project Manager for North Shore Smart Home',
        'END:VCARD',
      ].join('\n'),
    },
    projectSummaryDetails: {
      overviewTitle: 'North Shore Smart Home + Wellness Suite',
      overviewText:
        'A whole-home modernization pairing clean architectural updates with integrated lighting, media, climate, and wellness systems. The current phase is centered on concealed technology, quieter detailing, and a polished handoff experience across the main residence and pool house.',
      infoGrid: [
        ['Location', 'North Shore, IL', '8,400 sq ft - Whole Home Technology Scope'],
        ['Timeline', 'Mar 2026 -> Sep 2026', '128 days remaining to completion'],
      ],
      infoFlow: [
        ['Current', 'May 6', 'Lighting keypad review'],
        ['Next', 'May 9', 'Theater millwork coordination'],
      ],
      contactRows: [
        ['Mobile', '(312) 555-0144'],
        ['Email', 'm.chen@lindico.us'],
        ['Office', '401 W Huron Street, Chicago, IL'],
        ['Hours', 'Mon - Fri - 8 am - 6 pm CT'],
      ],
    },
    overview: {
      percent: 18,
      label: 'Overall Complete',
      sub: 'Target completion by September 2026',
      progressTracks: [
        ['Discovery + Engineering', 100, true, false],
        ['Procurement', 36, false, true],
        ['Infrastructure Prep', 22, false, false],
        ['Install + Calibration', 8, false, false],
      ],
    },
    recentActivity: [
      ['MC', '#8ca6dd', 'Maya Chen', 'uploaded revised keypad elevations', '1h ago'],
      ['JR', '#4a7a5a', 'Jordan Rivera', 'confirmed low-voltage rough-in dates', 'Today'],
      ['AL', '#b09770', 'A. Lee', 'commented on the theater finish package', 'Yesterday'],
      ['TM', '#c28347', 'Taylor Moss', 'shared pool house wiring markup', 'Yesterday'],
    ],
    clientEssentials: {
      decisions: [
        'Approve theater acoustic panel finish',
        'Confirm wellness suite steam controls',
        'Review pool house lighting scenes',
      ],
      documents: [
        { name: 'Keypad engraving schedule', type: 'PDF' },
        { name: 'AV rack coordination set', type: 'PDF' },
        { name: 'Fixture control matrix', type: 'XLSX' },
      ],
      contacts: [
        'Maya Chen, Project Lead',
        'Jordan Rivera, Systems Superintendent',
        'LindiCo Studio, Client Support',
      ],
    },
  },
  'cedar-terrace-exterior-deck': {
    dashboardEyebrow: 'Cedar Terrace Exterior Deck · July 2026',
    dashboardTitle: 'Welcome back, Tira!',
    requiredActions: [
      ['Approval', 'Approve final decking stain sample'],
      ['Review', 'Review outdoor lounge furniture layout'],
      ['Schedule', 'Confirm final evening lighting review'],
      ['Decision', 'Select pergola drapery hardware finish'],
    ],
    projectManagerContact: {
      displayInitials: 'SH',
      displayName: 'Sofia Hart, PMP',
      displayRole: 'Project Director - LindiCo.',
      nextOnSiteDate: 'Wed, Jul 15',
      nextOnSiteTitle: '4:00 PM deck styling review',
      filename: 'sofia-hart-lindico.vcf',
      mecard: ['MECARD:', 'N:Hart,Sofia', 'TEL:(847) 555-0188', 'EMAIL:s.hart@lindico.us', ';'].join(';'),
      vcard: [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:Sofia Hart, PMP',
        'N:Hart;Sofia;;;PMP',
        'ORG:LindiCo',
        'TITLE:Project Director',
        'TEL;TYPE=CELL:(847) 555-0188',
        'EMAIL;TYPE=INTERNET:s.hart@lindico.us',
        'ADR;TYPE=WORK:;;225 N Green Street;Chicago;IL;;;United States',
        'NOTE:Project Manager for Cedar Terrace Exterior Deck',
        'END:VCARD',
      ].join('\n'),
    },
    projectSummaryDetails: {
      overviewTitle: 'Cedar Terrace Exterior Deck + Entertaining Pavilion',
      overviewText:
        'A refined exterior living project centered on a new deck, covered dining pavilion, layered landscape lighting, and hospitality-focused styling. The current phase is focused on final finishes, furniture placement, and evening ambiance so the terrace feels effortless for summer hosting.',
      infoGrid: [
        ['Location', 'Cedar Terrace, IL', '2,900 sq ft - Exterior Living Scope'],
        ['Timeline', 'Apr 2026 -> Aug 2026', '34 days remaining to completion'],
      ],
      infoFlow: [
        ['Current', 'Jul 12', 'Deck stain review'],
        ['Next', 'Jul 15', 'Furniture placement styling'],
      ],
      contactRows: [
        ['Mobile', '(847) 555-0188'],
        ['Email', 's.hart@lindico.us'],
        ['Office', '225 N Green Street, Chicago, IL'],
        ['Hours', 'Mon - Fri - 8 am - 6 pm CT'],
      ],
    },
    overview: {
      percent: 84,
      label: 'Overall Complete',
      sub: 'Target completion by August 2026',
      progressTracks: [
        ['Structural + Framing', 100, true, false],
        ['Lighting + Utilities', 100, true, false],
        ['Finishes + Stain', 88, false, true],
        ['Styling + Punch List', 54, false, false],
      ],
    },
    recentActivity: [
      ['SH', '#93a7d2', 'Sofia Hart', 'uploaded revised deck stain samples', '45m ago'],
      ['JR', '#4a7a5a', 'James Reid', 'confirmed pergola drapery hardware delivery', 'Today'],
      ['TM', '#c28347', 'Taylor Moss', 'shared terrace furniture layout markup', 'Yesterday'],
      ['EH', '#6d52b8', 'E. Harrison', 'commented on exterior lighting warmth', 'Yesterday'],
    ],
    clientEssentials: {
      decisions: [
        'Approve final decking stain sample',
        'Confirm terrace lounge furniture grouping',
        'Review pergola drapery hardware finish',
      ],
      documents: [
        { name: 'Deck stain comparison board', type: 'PDF' },
        { name: 'Terrace furniture placement plan', type: 'PDF' },
        { name: 'Exterior lighting fixture schedule', type: 'XLSX' },
      ],
      contacts: [
        'Sofia Hart, Project Lead',
        'James Reid, Site Superintendent',
        'LindiCo Studio, Client Support',
      ],
    },
  },
};

export function getPortalDashboardData(projectId) {
  return (
    portalDashboardProjects[projectId] ??
    portalDashboardProjects[defaultPortalProjectId]
  );
}
