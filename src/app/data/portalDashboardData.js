export const requiredActions = [
  ['Approval', 'Approve marble specification v2'],
  ['Review', 'Review exterior lighting options'],
  ['Schedule', 'Confirm walkthrough availability'],
  ['Upload', 'Upload appliance warranty documents'],
  ['Decision', 'Select final cabinet hardware finish'],
];

export const projectManagerContact = {
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
};

export const projectSummaryDetails = {
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
};
