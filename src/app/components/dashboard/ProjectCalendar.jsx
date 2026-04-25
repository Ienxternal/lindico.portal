import { useEffect, useMemo, useRef, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  Image,
  MessageSquareMore,
  Paperclip,
  Send,
  X,
} from 'lucide-react';

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

const calendarEvents = [
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
  },
  {
    id: 3,
    name: 'Marble slab installation',
    time: '1:00 PM',
    datetime: '2026-04-17T13:00:00',
    assignee: 'TM',
    status: 'active',
    tag: 'Today',
    type: 'Installation',
    location: 'Primary Bath',
    detail: 'Final slab install and seam review with trade coordination on site.',
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
    comments: [
      {
        id: '8-a',
        author: 'EH',
        role: 'Client',
        timeLabel: '2d ago',
        body: 'Please separate owner-responsibility items from contractor closeout in the final punch list recap.',
      },
    ],
  },
  {
    id: 9,
    name: 'Window treatment install',
    time: '10:00 AM',
    datetime: '2026-06-08T10:00:00',
    assignee: 'EH',
    status: 'planned',
    type: 'Installation',
    location: 'Bedrooms + Lounge',
    detail: 'Install and review custom drapery, shades, and final trim alignment.',
  },
  {
    id: 10,
    name: 'Final systems orientation',
    time: '9:30 AM',
    datetime: '2026-06-12T09:30:00',
    assignee: 'JR',
    status: 'planned',
    type: 'Orientation',
    location: 'Whole Home',
    detail: 'Walk through lighting controls, climate zones, and smart-home operating basics.',
  },
  {
    id: 11,
    name: 'Art placement review',
    time: '1:30 PM',
    datetime: '2026-06-18T13:30:00',
    assignee: 'EH',
    status: 'planned',
    type: 'Review',
    location: 'Main Living Areas',
    detail: 'Confirm final art heights, anchoring, and placement alignment with furniture layout.',
  },
  {
    id: 12,
    name: 'Guest suite styling install',
    time: '9:00 AM',
    datetime: '2026-06-20T09:00:00',
    assignee: 'TM',
    status: 'planned',
    type: 'Installation',
    location: 'Guest Wing',
    detail: 'Install soft goods, accessories, and final styling details for guest suites.',
  },
  {
    id: 13,
    name: 'Pool terrace furniture delivery',
    time: '8:30 AM',
    datetime: '2026-06-22T08:30:00',
    assignee: 'JR',
    status: 'planned',
    type: 'Delivery',
    location: 'Terrace',
    detail: 'Receive and place outdoor lounge furniture, umbrellas, and side tables.',
  },
  {
    id: 14,
    name: 'Wine room temperature calibration',
    time: '2:00 PM',
    datetime: '2026-06-24T14:00:00',
    assignee: 'JR',
    status: 'planned',
    type: 'Calibration',
    location: 'Wine Room',
    detail: 'Verify cooling performance, humidity range, and sensor response before turnover.',
  },
  {
    id: 15,
    name: 'Library shelving touch-up',
    time: '10:00 AM',
    datetime: '2026-06-26T10:00:00',
    assignee: 'TM',
    status: 'planned',
    type: 'Finish Work',
    location: 'Library',
    detail: 'Complete stain corrections, shelf leveling, and hardware alignment.',
  },
  {
    id: 16,
    name: 'Landscape lighting night review',
    time: '8:15 PM',
    datetime: '2026-06-27T20:15:00',
    assignee: 'EH',
    status: 'planned',
    type: 'Site Review',
    location: 'Exterior Grounds',
    detail: 'Review beam spread, hot spots, and path-light balance after dusk.',
  },
  {
    id: 17,
    name: 'Final housekeeping and polish',
    time: '7:30 AM',
    datetime: '2026-06-29T07:30:00',
    assignee: 'SC',
    status: 'planned',
    type: 'Closeout',
    location: 'Whole Home',
    detail: 'Whole-home cleaning, surface polish, and final presentation prep before client arrival.',
  },
  {
    id: 18,
    name: 'Final handover',
    time: '2:00 PM',
    datetime: '2026-06-15T14:00:00',
    assignee: 'SC',
    status: 'final',
    tag: 'Target',
    type: 'Handover',
    location: 'Lakeview Residence',
    detail: 'Formal project handover with final documentation, warranties, and operating notes.',
    comments: [
      {
        id: '18-a',
        author: 'SC',
        role: 'Project Manager',
        timeLabel: '3d ago',
        body: 'We will bring printed warranty binders and a digital folder summary so turnover is easy to reference.',
      },
    ],
  },
];

const initialUnreadCommentIds = new Set(
  calendarEvents.filter((event) => event.comments?.length).map((event) => event.id),
);

function getAssigneeTone(assignee) {
  switch (assignee) {
    case 'SC':
      return 'sand';
    case 'JR':
      return 'sage';
    case 'TM':
      return 'amber';
    case 'EH':
      return 'violet';
    default:
      return 'sand';
  }
}

function getCommentTone(author) {
  switch (author) {
    case 'SC':
      return 'sand';
    case 'JR':
      return 'sage';
    case 'TM':
      return 'amber';
    case 'EH':
      return 'violet';
    case 'YO':
      return 'ink';
    default:
      return 'sand';
  }
}

export function ProjectCalendar() {
  const scheduleRef = useRef(null);
  const attachmentInputRefs = useRef({});
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3, 1));
  const [selectedDate, setSelectedDate] = useState(parseISO('2026-04-12T10:00:00'));
  const [expandedCommentId, setExpandedCommentId] = useState(null);
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [unreadCommentIds, setUnreadCommentIds] = useState(initialUnreadCommentIds);
  const [commentThreads, setCommentThreads] = useState(() =>
    Object.fromEntries(
      calendarEvents
        .filter((event) => event.comments?.length)
        .map((event) => [event.id, event.comments]),
    ),
  );
  const [commentDrafts, setCommentDrafts] = useState({});
  const [attachmentDrafts, setAttachmentDrafts] = useState({});
  const upcomingAnchor = parseISO('2026-04-20T00:00:00');

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const selectedEvents = calendarEvents.filter((event) =>
    isSameDay(parseISO(event.datetime), selectedDate),
  );
  const upcomingEvents = calendarEvents
    .filter((event) => parseISO(event.datetime) >= upcomingAnchor)
    .sort((a, b) => parseISO(a.datetime) - parseISO(b.datetime));
  const midpoint = Math.ceil(upcomingEvents.length / 2);
  const upcomingColumns = [
    upcomingEvents.slice(0, midpoint),
    upcomingEvents.slice(midpoint),
  ];

  useEffect(() => {
    function handlePointerDown(event) {
      if (!scheduleRef.current?.contains(event.target)) {
        setExpandedCommentId(null);
        setHoveredCommentId(null);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(attachmentDrafts)
        .flat()
        .forEach((attachment) => {
          if (attachment.url?.startsWith('blob:')) {
            URL.revokeObjectURL(attachment.url);
          }
        });
    };
  }, [attachmentDrafts]);

  function handleUpcomingSelect(eventId, datetime) {
    if (expandedCommentId === eventId) {
      setExpandedCommentId(null);
      setHoveredCommentId(null);
      return;
    }

    const nextDate = parseISO(datetime);
    setSelectedDate(nextDate);
    setCurrentMonth(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
  }

  function handleCommentToggle(eventId) {
    setExpandedCommentId((currentId) => (currentId === eventId ? null : eventId));
    setUnreadCommentIds((currentIds) => {
      if (!currentIds.has(eventId)) {
        return currentIds;
      }

      const nextIds = new Set(currentIds);
      nextIds.delete(eventId);
      return nextIds;
    });
  }

  function handleCommentSubmit(eventId) {
    const nextDraft = commentDrafts[eventId]?.trim();
    const nextAttachments = attachmentDrafts[eventId] ?? [];

    if (!nextDraft && nextAttachments.length === 0) {
      return;
    }

    setCommentThreads((currentThreads) => ({
      ...currentThreads,
      [eventId]: [
        ...(currentThreads[eventId] ?? []),
        {
          id: `${eventId}-${Date.now()}`,
          author: 'YO',
          role: 'Client',
          timeLabel: 'Just now',
          body: nextDraft,
          attachments: nextAttachments,
        },
      ],
    }));
    setCommentDrafts((currentDrafts) => ({
      ...currentDrafts,
      [eventId]: '',
    }));
    setAttachmentDrafts((currentDrafts) => ({
      ...currentDrafts,
      [eventId]: [],
    }));
    setExpandedCommentId(eventId);
    setUnreadCommentIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.delete(eventId);
      return nextIds;
    });
  }

  function handleAttachmentChange(eventId, fileList) {
    const files = Array.from(fileList ?? []).filter((file) => file.type.startsWith('image/'));

    if (files.length === 0) {
      return;
    }

    const nextAttachments = files.map((file) => ({
      id: `${eventId}-${file.name}-${file.lastModified}`,
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    setAttachmentDrafts((currentDrafts) => ({
      ...currentDrafts,
      [eventId]: [...(currentDrafts[eventId] ?? []), ...nextAttachments],
    }));
  }

  function handleAttachmentRemove(eventId, attachmentId) {
    setAttachmentDrafts((currentDrafts) => {
      const attachments = currentDrafts[eventId] ?? [];
      const attachmentToRemove = attachments.find((attachment) => attachment.id === attachmentId);

      if (attachmentToRemove?.url?.startsWith('blob:')) {
        URL.revokeObjectURL(attachmentToRemove.url);
      }

      return {
        ...currentDrafts,
        [eventId]: attachments.filter((attachment) => attachment.id !== attachmentId),
      };
    });
  }

  return (
    <article ref={scheduleRef} className="portal-card portal-calendar-card">
      <div className="portal-card-head">
        <div>
          <p className="portal-card-kicker">Schedule</p>
          <h2 className="portal-card-title">Project Schedule</h2>
        </div>
      </div>

      <div className="portal-calendar-upcoming">
        <div className="portal-calendar-upcoming-label">Upcoming</div>
        <div
          className={`portal-calendar-upcoming-columns${
            expandedCommentId !== null ? ' is-expanded' : ''
          }`}
        >
          {upcomingColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="portal-calendar-upcoming-list">
              {column.map((event) => (
                <div
                  key={event.id}
                  className={`portal-calendar-upcoming-item${
                    isSameDay(parseISO(event.datetime), selectedDate) ? ' is-selected' : ''
                  }${expandedCommentId === event.id ? ' is-thread-open' : ''}${
                    isToday(parseISO(event.datetime)) ? ' is-today' : ''
                  }`}
                >
                  <button
                    type="button"
                    className="portal-calendar-upcoming-select"
                    onClick={() => handleUpcomingSelect(event.id, event.datetime)}
                  >
                    <span className={`portal-calendar-event-dot is-${event.status}`} />
                    <span className="portal-calendar-upcoming-date">
                      {format(parseISO(event.datetime), 'MMM d')}
                    </span>
                    <span className="portal-calendar-upcoming-name-wrap">
                      <span className="portal-calendar-upcoming-name">{event.name}</span>
                      {commentThreads[event.id]?.length ? (
                        <span
                          className={`portal-calendar-comment-anchor${
                            hoveredCommentId === event.id ? ' is-hovered' : ''
                          }`}
                          onMouseEnter={() => {
                            if (!isSameDay(parseISO(event.datetime), selectedDate)) {
                              setHoveredCommentId(event.id);
                            }
                          }}
                          onMouseLeave={() =>
                            setHoveredCommentId((currentId) => (
                              currentId === event.id ? null : currentId
                            ))
                          }
                        >
                          <button
                            type="button"
                            className={`portal-calendar-comment-trigger${
                              unreadCommentIds.has(event.id) ? ' is-unread' : ''
                            }`}
                            aria-label={`View comments for ${event.name}`}
                            aria-expanded={expandedCommentId === event.id}
                            onClick={(commentEvent) => {
                              commentEvent.stopPropagation();
                              handleCommentToggle(event.id);
                            }}
                          >
                            <MessageSquareMore size={12} />
                            <span className="portal-calendar-comment-count">
                              {commentThreads[event.id].length}
                            </span>
                          </button>
                          {expandedCommentId !== event.id &&
                          !isSameDay(parseISO(event.datetime), selectedDate) ? (
                            <div className="portal-calendar-comment-preview" role="note">
                              <p className="portal-calendar-comment-preview-label">Latest Comment</p>
                              <p className="portal-calendar-comment-preview-text">
                                {commentThreads[event.id][commentThreads[event.id].length - 1]?.body}
                              </p>
                            </div>
                          ) : null}
                        </span>
                      ) : null}
                    </span>
                    {event.tag ? (
                      <span className={`portal-calendar-tag is-${event.status}`}>{event.tag}</span>
                    ) : (
                      <span />
                    )}
                    <span
                      className={`portal-calendar-assignee is-${getAssigneeTone(event.assignee)}`}
                    >
                      {event.assignee}
                    </span>
                  </button>
                  <div
                    className={`portal-calendar-comment-panel${
                      expandedCommentId === event.id ? ' is-open' : ''
                    }`}
                  >
                    <div className="portal-calendar-comment-panel-inner">
                      <div className="portal-calendar-comment-panel-head">
                        <p className="portal-calendar-comment-panel-title">Discussion</p>
                        <span className="portal-calendar-comment-panel-meta">
                          {commentThreads[event.id]?.length ?? 0} comments
                        </span>
                      </div>
                      <div className="portal-calendar-comment-feed">
                        {(commentThreads[event.id] ?? []).map((comment) => (
                          <div key={comment.id} className="portal-calendar-comment-entry">
                            <span
                              className={`portal-calendar-comment-avatar is-${getCommentTone(comment.author)}`}
                            >
                              {comment.author}
                            </span>
                            <div className="portal-calendar-comment-body">
                              <div className="portal-calendar-comment-meta">
                                <strong>{comment.role}</strong>
                                <span>{comment.timeLabel}</span>
                              </div>
                              <p className="portal-calendar-comment-text">{comment.body}</p>
                              {comment.attachments?.length ? (
                                <div className="portal-calendar-comment-attachments">
                                  {comment.attachments.map((attachment) => (
                                    <a
                                      key={attachment.id}
                                      href={attachment.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="portal-calendar-comment-attachment"
                                    >
                                      <img
                                        src={attachment.url}
                                        alt={attachment.name}
                                        className="portal-calendar-comment-attachment-image"
                                      />
                                      <span className="portal-calendar-comment-attachment-name">
                                        {attachment.name}
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                      {(attachmentDrafts[event.id] ?? []).length ? (
                        <div className="portal-calendar-draft-attachments">
                          {(attachmentDrafts[event.id] ?? []).map((attachment) => (
                            <div key={attachment.id} className="portal-calendar-draft-attachment">
                              <img
                                src={attachment.url}
                                alt={attachment.name}
                                className="portal-calendar-draft-attachment-image"
                              />
                              <button
                                type="button"
                                className="portal-calendar-draft-attachment-remove"
                                onClick={(commentEvent) => {
                                  commentEvent.stopPropagation();
                                  handleAttachmentRemove(event.id, attachment.id);
                                }}
                                aria-label={`Remove ${attachment.name}`}
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      <div className="portal-calendar-comment-compose">
                        <input
                          ref={(node) => {
                            attachmentInputRefs.current[event.id] = node;
                          }}
                          type="file"
                          accept="image/*"
                          multiple
                          className="portal-calendar-attachment-input"
                          onClick={(commentEvent) => commentEvent.stopPropagation()}
                          onChange={(commentEvent) => {
                            handleAttachmentChange(event.id, commentEvent.target.files);
                            commentEvent.target.value = '';
                          }}
                        />
                        <button
                          type="button"
                          className="portal-calendar-comment-attach"
                          aria-label="Attach photo"
                          onClick={(commentEvent) => {
                            commentEvent.stopPropagation();
                            attachmentInputRefs.current[event.id]?.click();
                          }}
                        >
                          <Paperclip size={12} />
                        </button>
                        <input
                          type="text"
                          value={commentDrafts[event.id] ?? ''}
                          onClick={(commentEvent) => commentEvent.stopPropagation()}
                          onChange={(commentEvent) =>
                            setCommentDrafts((currentDrafts) => ({
                              ...currentDrafts,
                              [event.id]: commentEvent.target.value,
                            }))
                          }
                          onKeyDown={(commentEvent) => {
                            if (commentEvent.key === 'Enter') {
                              commentEvent.preventDefault();
                              handleCommentSubmit(event.id);
                            }
                          }}
                          className="portal-calendar-comment-input"
                          placeholder="Add a comment for this activity"
                        />
                        <button
                          type="button"
                          className="portal-calendar-comment-submit"
                          onClick={(commentEvent) => {
                            commentEvent.stopPropagation();
                            handleCommentSubmit(event.id);
                          }}
                        >
                          <Send size={12} />
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="portal-calendar-month-row">
        <p className="portal-calendar-month-label">
          <time dateTime={format(currentMonth, 'yyyy-MM')}>
            {format(currentMonth, 'MMMM yyyy')}
          </time>
        </p>
        <div className="portal-calendar-actions">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setCurrentMonth((value) => addMonths(value, -1))}
            className="portal-calendar-nav"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setCurrentMonth((value) => addMonths(value, 1))}
            className="portal-calendar-nav"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="portal-calendar-weekdays">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
          (day) => (
            <div key={day} className="portal-calendar-weekday">
              {day}
            </div>
          ),
        )}
      </div>

      <div className="portal-calendar-grid">
        {monthDays.map((day) => {
          const dayEvents = calendarEvents.filter((event) =>
            isSameDay(parseISO(event.datetime), day),
          );
          const dayThreads = dayEvents.map((event) => commentThreads[event.id] ?? []);
          const hasCommentActivity = dayThreads.some((thread) => thread.length > 0);
          const hasImageActivity = dayThreads.some((thread) =>
            thread.some((comment) => (comment.attachments?.length ?? 0) > 0),
          );
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentDay = isToday(day);

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => setSelectedDate(day)}
              className={`portal-calendar-date${
                !isSameMonth(day, currentMonth) ? ' is-muted' : ''
              }${isSelected ? ' is-selected' : ''}${isCurrentDay ? ' is-today' : ''}`}
              style={
                isCurrentDay && !isSelected
                  ? {
                      backgroundColor: '#f5efe2',
                    }
                  : undefined
              }
            >
              <div className="portal-calendar-date-state-row">
                {isCurrentDay ? (
                  <span className="portal-calendar-date-state portal-calendar-date-state-top">
                    Today
                  </span>
                ) : null}
                {isSelected && !isCurrentDay ? (
                  <span className="portal-calendar-date-state portal-calendar-date-state-top">
                    Selected
                  </span>
                ) : null}
              </div>
              <div className="portal-calendar-date-indicators">
                {hasCommentActivity ? (
                  <span className="portal-calendar-date-indicator" aria-label="Comments available">
                    <MessageSquareMore size={10} />
                  </span>
                ) : null}
                {hasImageActivity ? (
                  <span className="portal-calendar-date-indicator" aria-label="Photos available">
                    <Image size={10} />
                  </span>
                ) : null}
              </div>
              <div className="portal-calendar-date-top">
                <time dateTime={format(day, 'yyyy-MM-dd')} className="portal-calendar-date-number">
                  {format(day, 'd')}
                </time>
                {dayEvents.length > 0 ? (
                  <span className="portal-calendar-date-dot" />
                ) : null}
              </div>

              <div className="portal-calendar-date-events">
                {dayEvents.slice(0, 2).map((event) => (
                  <p key={event.id}>
                    {event.name}
                  </p>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="portal-calendar-selected">
        <p className="portal-card-kicker">Selected Date</p>
        <div className="portal-calendar-selected-list">
          <p className="portal-calendar-selected-date">{format(selectedDate, 'MMMM d, yyyy')}</p>
          {selectedEvents.length > 0 ? (
            selectedEvents.map((event) => (
              <div key={event.id} className="portal-calendar-selected-card">
                <div className="portal-calendar-selected-item">
                  <span>{event.name}</span>
                  <span>{event.time}</span>
                </div>
                <div className="portal-calendar-selected-meta">
                  <span>{event.type}</span>
                  <span>{event.location}</span>
                  <span>Lead {event.assignee}</span>
                </div>
                <p className="portal-calendar-selected-detail">{event.detail}</p>
              </div>
            ))
          ) : (
            <p className="portal-calendar-empty">No scheduled events for this date.</p>
          )}
        </div>
      </div>
    </article>
  );
}
