const sampleAttachmentPreview =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 90'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0%' stop-color='#e8dcc7'/>" +
      "<stop offset='100%' stop-color='#c8d9c7'/>" +
      "</linearGradient></defs>" +
      "<rect width='120' height='90' fill='url(#g)'/>" +
      "<circle cx='88' cy='26' r='10' fill='#f6f0e6'/>" +
      "<path d='M12 70l26-28 18 18 14-12 38 22H12z' fill='#7e9c84' opacity='.9'/>" +
      "<path d='M12 72l18-16 10 10 18-18 22 18 28 6H12z' fill='#b09770' opacity='.72'/>" +
      "<rect x='0.5' y='0.5' width='119' height='89' rx='4' fill='none' stroke='rgba(120,102,74,.22)'/>" +
    "</svg>",
  );

const lakeviewCalendarEvents = [
  {
    id: 1,
    name: 'Material delivery',
    time: '9:00 AM',
    datetime: '2026-04-09T09:00:00',
    assignee: 'TM',
    status: 'complete',
    type: 'Delivery',
    location: 'Lakeview Residence',
    detail: 'Exterior material delivery and staging for current finish work.',
    attendees: [
      { initials: 'SC', name: 'Sarah Collins', title: 'Project Manager' },
      { initials: 'TM', name: 'Trade Lead', title: 'Delivery Coordination' },
      { initials: 'EH', name: 'Client Representative', title: 'Review + approvals' },
    ],
  },
  {
    id: 2,
    name: 'Client walkthrough',
    time: '10:00 AM',
    datetime: '2026-04-12T10:00:00',
    assignee: 'SC',
    status: 'complete',
    type: 'Walkthrough',
    location: 'On Site',
    detail: 'Client review of millwork coordination, fixture placements, and next approvals.',
    attendees: [
      { initials: 'SC', name: 'Sarah Collins', title: 'Project Manager' },
      { initials: 'SC', name: 'Lead Host', title: 'Walkthrough Lead' },
      { initials: 'EH', name: 'Client Representative', title: 'Review + approvals' },
    ],
  },
  {
    id: 3,
    name: 'Marble slab installation',
    time: '1:00 PM',
    datetime: '2026-04-17T13:00:00',
    assignee: 'TM',
    status: 'active',
    tag: 'Current',
    type: 'Installation',
    location: 'Primary Bath',
    detail: 'Final slab install and seam review with trade coordination on site.',
    attendees: [
      { initials: 'SC', name: 'Sarah Collins', title: 'Project Manager' },
      { initials: 'TM', name: 'Trade Lead', title: 'Stone Installation' },
      { initials: 'EH', name: 'Client Representative', title: 'Finish review' },
    ],
  },
  {
    id: 4,
    name: 'Landscape consultation',
    time: '11:00 AM',
    datetime: '2026-04-22T11:00:00',
    assignee: 'EH',
    status: 'upcoming',
    tag: 'In 3 days',
    type: 'Consultation',
    location: 'Garden Terrace',
    detail: 'Review exterior planting layout, uplighting placement, and final fixture finish.',
    attendees: [
      { initials: 'SC', name: 'Sarah Collins', title: 'Project Manager' },
      { initials: 'EH', name: 'Trade Lead', title: 'Consultation Lead' },
      { initials: 'EH', name: 'Client Representative', title: 'Review + approvals' },
    ],
    comments: [
      {
        id: '4-a',
        author: 'EH',
        role: 'Client',
        timeLabel: '1h ago',
        body: 'Can we please review two warmer uplighting options against the original bronze finish?',
      },
      {
        id: '4-b',
        author: 'SC',
        role: 'Project Manager',
        timeLabel: '45m ago',
        body: 'Yes, we will bring both finish samples and note the visual difference during the consultation.',
        attachments: [
          {
            id: '4-b-1',
            name: 'uplighting-options.jpg',
            type: 'image/jpeg',
            url: sampleAttachmentPreview,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Quarterly progress review',
    time: '3:00 PM',
    datetime: '2026-04-24T15:00:00',
    assignee: 'SC',
    status: 'planned',
    type: 'Review',
    location: 'Client Portal Meeting',
    detail: 'Share schedule progress, budget summary, and upcoming milestones.',
    attendees: [
      { initials: 'SC', name: 'Sarah Collins', title: 'Project Manager' },
      { initials: 'SC', name: 'Meeting Lead', title: 'Quarterly Review' },
      { initials: 'EH', name: 'Client Representative', title: 'Review + approvals' },
    ],
    comments: [
      {
        id: '5-a',
        author: 'SC',
        role: 'Project Manager',
        timeLabel: 'Today',
        body: 'We will include the updated contingency summary before the review so approvals can happen on the call.',
      },
    ],
  },
  {
    id: 6,
    name: 'Flooring installation complete',
    time: '12:00 PM',
    datetime: '2026-05-03T12:00:00',
    assignee: 'TM',
    status: 'planned',
    type: 'Milestone',
    location: 'Main Level',
    detail: 'Confirm wood flooring install completion and close out punch items.',
    attendees: [
      { initials: 'SC', name: 'Sarah Collins', title: 'Project Manager' },
      { initials: 'TM', name: 'Trade Lead', title: 'Flooring Milestone' },
      { initials: 'EH', name: 'Client Representative', title: 'Progress review' },
    ],
    comments: [
      {
        id: '6-a',
        author: 'EH',
        role: 'Client',
        timeLabel: 'Yesterday',
        body: 'Please upload progress photos once the final stain tone is confirmed.',
      },
    ],
  },
  {
    id: 7,
    name: 'Exterior lighting setup',
    time: '9:00 AM',
    datetime: '2026-05-18T09:00:00',
    assignee: 'JR',
    status: 'planned',
    type: 'Installation',
    location: 'Exterior Scope',
    detail: 'Install and aim exterior architectural lighting across entry and landscape zones.',
    attendees: [
      { initials: 'SC', name: 'Sarah Collins', title: 'Project Manager' },
      { initials: 'JR', name: 'Trade Lead', title: 'Lighting Installation' },
      { initials: 'EH', name: 'Client Representative', title: 'Fixture review' },
    ],
    comments: [
      {
        id: '7-a',
        author: 'JR',
        role: 'Site Lead',
        timeLabel: '2d ago',
        body: 'We should verify fixture brightness at the front walk after dusk and flag any shielding adjustments.',
        attachments: [
          {
            id: '7-a-1',
            name: 'front-walk-lighting.jpg',
            type: 'image/jpeg',
            url: sampleAttachmentPreview,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: 'Punch list walkthrough',
    time: '11:00 AM',
    datetime: '2026-06-01T11:00:00',
    assignee: 'SC',
    status: 'planned',
    type: 'Walkthrough',
    location: 'On Site',
    detail: 'Review close-out items, finish notes, and final corrections before handover.',
    attendees: [
      { initials: 'SC', name: 'Sarah Collins', title: 'Project Manager' },
      { initials: 'SC', name: 'Walkthrough Lead', title: 'Punch List Review' },
      { initials: 'EH', name: 'Client Representative', title: 'Closeout review' },
    ],
  },
];

const northShoreCalendarEvents = [
  {
    id: 101,
    name: 'Systems rough-in review',
    time: '8:30 AM',
    datetime: '2026-05-02T08:30:00',
    assignee: 'JR',
    status: 'complete',
    type: 'Site Review',
    location: 'Main Residence',
    detail: 'Review low-voltage rough-in, rack clearances, and concealed speaker placements.',
    attendees: [
      { initials: 'MC', name: 'Maya Chen', title: 'Project Manager' },
      { initials: 'JR', name: 'Jordan Rivera', title: 'Systems Superintendent' },
      { initials: 'EH', name: 'Client Representative', title: 'Scope review' },
    ],
  },
  {
    id: 102,
    name: 'Lighting keypad review',
    time: '11:00 AM',
    datetime: '2026-05-06T11:00:00',
    assignee: 'MC',
    status: 'active',
    tag: 'Current',
    type: 'Review',
    location: 'Library + Great Room',
    detail: 'Finalize engraving language, keypad placements, and wall finish coordination.',
    attendees: [
      { initials: 'MC', name: 'Maya Chen', title: 'Project Manager' },
      { initials: 'AL', name: 'A. Lee', title: 'Design Lead' },
      { initials: 'EH', name: 'Client Representative', title: 'Approval review' },
    ],
    comments: [
      {
        id: '102-a',
        author: 'AL',
        role: 'Design Lead',
        timeLabel: '35m ago',
        body: 'We will bring the revised engraved keypad samples in both satin brass and blackened bronze.',
      },
    ],
  },
  {
    id: 103,
    name: 'Theater millwork coordination',
    time: '2:00 PM',
    datetime: '2026-05-09T14:00:00',
    assignee: 'AL',
    status: 'upcoming',
    tag: 'In 3 days',
    type: 'Coordination',
    location: 'Lower Level Theater',
    detail: 'Coordinate screen wall depth, acoustic panel spacing, and concealed ventilation details.',
    attendees: [
      { initials: 'MC', name: 'Maya Chen', title: 'Project Manager' },
      { initials: 'AL', name: 'A. Lee', title: 'Design Lead' },
      { initials: 'JR', name: 'Jordan Rivera', title: 'Field Coordination' },
    ],
    comments: [
      {
        id: '103-a',
        author: 'MC',
        role: 'Project Manager',
        timeLabel: '1h ago',
        body: 'Please bring the latest equipment rack section and the acoustic panel mockup elevations.',
        attachments: [
          {
            id: '103-a-1',
            name: 'theater-section.jpg',
            type: 'image/jpeg',
            url: sampleAttachmentPreview,
          },
        ],
      },
    ],
  },
  {
    id: 104,
    name: 'Pool house wiring walk',
    time: '9:30 AM',
    datetime: '2026-05-14T09:30:00',
    assignee: 'JR',
    status: 'planned',
    type: 'Walkthrough',
    location: 'Pool House',
    detail: 'Confirm final circuiting, concealed speakers, and exterior scene controls before close-in.',
    attendees: [
      { initials: 'MC', name: 'Maya Chen', title: 'Project Manager' },
      { initials: 'JR', name: 'Jordan Rivera', title: 'Systems Superintendent' },
      { initials: 'TM', name: 'Taylor Moss', title: 'Electrical Coordination' },
    ],
  },
  {
    id: 105,
    name: 'Wellness suite controls demo',
    time: '1:00 PM',
    datetime: '2026-05-20T13:00:00',
    assignee: 'MC',
    status: 'planned',
    type: 'Demo',
    location: 'Wellness Wing',
    detail: 'Review steam, lighting, and climate scenes with the client before final programming.',
    attendees: [
      { initials: 'MC', name: 'Maya Chen', title: 'Project Manager' },
      { initials: 'JR', name: 'Jordan Rivera', title: 'Systems Superintendent' },
      { initials: 'EH', name: 'Client Representative', title: 'Owner training' },
    ],
    comments: [
      {
        id: '105-a',
        author: 'EH',
        role: 'Client',
        timeLabel: 'Yesterday',
        body: 'Please include the simplified spa start-up sequence in the training materials.',
      },
    ],
  },
  {
    id: 106,
    name: 'Final AV calibration',
    time: '10:00 AM',
    datetime: '2026-06-12T10:00:00',
    assignee: 'JR',
    status: 'final',
    tag: 'Target',
    type: 'Calibration',
    location: 'Whole Home',
    detail: 'Balance distributed audio, finalize theater tuning, and prepare owner handoff materials.',
    attendees: [
      { initials: 'MC', name: 'Maya Chen', title: 'Project Manager' },
      { initials: 'JR', name: 'Jordan Rivera', title: 'Systems Superintendent' },
      { initials: 'EH', name: 'Client Representative', title: 'Final acceptance' },
    ],
  },
];

const cedarTerraceCalendarEvents = [
  {
    id: 201,
    name: 'Deck framing closeout',
    time: '9:00 AM',
    datetime: '2026-07-02T09:00:00',
    assignee: 'JR',
    status: 'complete',
    type: 'Closeout',
    location: 'Main Deck',
    detail: 'Final framing review, hardware tightening, and concealed fastener closeout before finish stain.',
    attendees: [
      { initials: 'SH', name: 'Sofia Hart', title: 'Project Manager' },
      { initials: 'JR', name: 'James Reid', title: 'Site Superintendent' },
      { initials: 'EH', name: 'Client Representative', title: 'Progress review' },
    ],
  },
  {
    id: 202,
    name: 'Deck stain review',
    time: '11:30 AM',
    datetime: '2026-07-12T11:30:00',
    assignee: 'SH',
    status: 'active',
    tag: 'Current',
    type: 'Finish Review',
    location: 'Upper Terrace',
    detail: 'Compare final stain boards in daylight and confirm tone against the stone and exterior trim palette.',
    attendees: [
      { initials: 'SH', name: 'Sofia Hart', title: 'Project Manager' },
      { initials: 'TM', name: 'Taylor Moss', title: 'Finish Lead' },
      { initials: 'EH', name: 'Client Representative', title: 'Finish approval' },
    ],
    comments: [
      {
        id: '202-a',
        author: 'EH',
        role: 'Client',
        timeLabel: '20m ago',
        body: 'Please include one warmer stain option that still reads natural in late afternoon light.',
      },
    ],
  },
  {
    id: 203,
    name: 'Furniture placement styling',
    time: '4:00 PM',
    datetime: '2026-07-15T16:00:00',
    assignee: 'TM',
    status: 'upcoming',
    tag: 'In 3 days',
    type: 'Styling',
    location: 'Dining Pavilion',
    detail: 'Review lounge grouping, dining spacing, and accessory placement for summer entertaining flow.',
    attendees: [
      { initials: 'SH', name: 'Sofia Hart', title: 'Project Manager' },
      { initials: 'TM', name: 'Taylor Moss', title: 'Styling Lead' },
      { initials: 'EH', name: 'Client Representative', title: 'Layout approval' },
    ],
    comments: [
      {
        id: '203-a',
        author: 'SH',
        role: 'Project Manager',
        timeLabel: '1h ago',
        body: 'We will bring two alternate lounge groupings so circulation feels easy around the fire feature.',
        attachments: [
          {
            id: '203-a-1',
            name: 'terrace-layout-option.jpg',
            type: 'image/jpeg',
            url: sampleAttachmentPreview,
          },
        ],
      },
    ],
  },
  {
    id: 204,
    name: 'Exterior lighting dusk review',
    time: '8:15 PM',
    datetime: '2026-07-18T20:15:00',
    assignee: 'JR',
    status: 'planned',
    type: 'Site Review',
    location: 'Terrace + Garden Edge',
    detail: 'Review beam spread, fixture warmth, and entertaining zones after sunset.',
    attendees: [
      { initials: 'SH', name: 'Sofia Hart', title: 'Project Manager' },
      { initials: 'JR', name: 'James Reid', title: 'Lighting Coordination' },
      { initials: 'EH', name: 'Client Representative', title: 'Evening review' },
    ],
  },
  {
    id: 205,
    name: 'Pergola drapery install',
    time: '10:00 AM',
    datetime: '2026-07-24T10:00:00',
    assignee: 'TM',
    status: 'planned',
    type: 'Installation',
    location: 'Covered Pavilion',
    detail: 'Install weather-rated drapery panels, hardware, and tie-backs for privacy and softness.',
    attendees: [
      { initials: 'SH', name: 'Sofia Hart', title: 'Project Manager' },
      { initials: 'TM', name: 'Taylor Moss', title: 'Installation Lead' },
      { initials: 'EH', name: 'Client Representative', title: 'Final styling review' },
    ],
  },
  {
    id: 206,
    name: 'Final terrace handoff',
    time: '2:30 PM',
    datetime: '2026-08-06T14:30:00',
    assignee: 'SH',
    status: 'final',
    tag: 'Target',
    type: 'Handover',
    location: 'Cedar Terrace',
    detail: 'Review care instructions, warranties, outdoor storage recommendations, and final punch completion.',
    attendees: [
      { initials: 'SH', name: 'Sofia Hart', title: 'Project Manager' },
      { initials: 'JR', name: 'James Reid', title: 'Site Superintendent' },
      { initials: 'EH', name: 'Client Representative', title: 'Final acceptance' },
    ],
  },
];

export const projectCalendarEventsByProject = {
  'lakeview-residence-renovation': lakeviewCalendarEvents,
  'north-shore-smart-home': northShoreCalendarEvents,
  'cedar-terrace-exterior-deck': cedarTerraceCalendarEvents,
};

export function getProjectCalendarEvents(projectId) {
  return (
    projectCalendarEventsByProject[projectId] ??
    projectCalendarEventsByProject['lakeview-residence-renovation']
  );
}
