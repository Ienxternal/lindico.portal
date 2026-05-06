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
  Check,
  ChevronLeft,
  ChevronRight,
  Image,
  MessageSquareMore,
  Paperclip,
  Send,
  X,
} from 'lucide-react';

function getInitialScheduleEvent(events) {
  return (
    events.find((event) => event.status === 'active') ??
    events.find((event) => event.status === 'upcoming') ??
    events[0] ??
    null
  );
}

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

export function ProjectCalendar({ events }) {
  const attachmentInputRefs = useRef({});
  const initialScheduleEvent = useMemo(() => getInitialScheduleEvent(events), [events]);
  const [currentMonth, setCurrentMonth] = useState(() =>
    initialScheduleEvent
      ? new Date(parseISO(initialScheduleEvent.datetime).getFullYear(), parseISO(initialScheduleEvent.datetime).getMonth(), 1)
      : new Date(),
  );
  const [selectedDate, setSelectedDate] = useState(() =>
    initialScheduleEvent ? parseISO(initialScheduleEvent.datetime) : new Date(),
  );
  const [selectedEventId, setSelectedEventId] = useState(() => initialScheduleEvent?.id ?? null);
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [unreadCommentIds, setUnreadCommentIds] = useState(
    () => new Set(events.filter((event) => event.comments?.length).map((event) => event.id)),
  );
  const [commentThreads, setCommentThreads] = useState(() =>
    Object.fromEntries(
      events
        .filter((event) => event.comments?.length)
        .map((event) => [event.id, event.comments]),
    ),
  );
  const [commentDrafts, setCommentDrafts] = useState({});
  const [attachmentDrafts, setAttachmentDrafts] = useState({});

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const upcomingEvents = [...events].sort(
    (a, b) => parseISO(a.datetime) - parseISO(b.datetime),
  );
  const selectedScheduleEvent =
    events.find((event) => event.id === selectedEventId) ?? null;
  const selectedEventAttendees = selectedScheduleEvent?.attendees ?? [];

  useEffect(() => {
    const nextInitialEvent = getInitialScheduleEvent(events);

    setCurrentMonth(
      nextInitialEvent
        ? new Date(
            parseISO(nextInitialEvent.datetime).getFullYear(),
            parseISO(nextInitialEvent.datetime).getMonth(),
            1,
          )
        : new Date(),
    );
    setSelectedDate(nextInitialEvent ? parseISO(nextInitialEvent.datetime) : new Date());
    setSelectedEventId(nextInitialEvent?.id ?? null);
    setHoveredCommentId(null);
    setUnreadCommentIds(new Set(events.filter((event) => event.comments?.length).map((event) => event.id)));
    setCommentThreads(
      Object.fromEntries(
        events
          .filter((event) => event.comments?.length)
          .map((event) => [event.id, event.comments]),
      ),
    );
    setCommentDrafts({});
    setAttachmentDrafts({});
  }, [events]);

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
    const nextDate = parseISO(datetime);
    setSelectedEventId(eventId);
    setSelectedDate(nextDate);
    setCurrentMonth(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
    setHoveredCommentId(null);
    setUnreadCommentIds((currentIds) => {
      if (!currentIds.has(eventId)) {
        return currentIds;
      }

      const nextIds = new Set(currentIds);
      nextIds.delete(eventId);
      return nextIds;
    });
  }

  function handleCalendarDateSelect(day, dayEvents) {
    setSelectedDate(day);

    if (dayEvents.length > 0) {
      setSelectedEventId(dayEvents[0].id);
    }
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
    <article className="portal-card portal-calendar-card">
      <div className="portal-card-head">
        <div>
          <p className="portal-card-kicker">Timeline Overview</p>
          <h2 className="portal-card-title">Project Schedule</h2>
        </div>
      </div>

      <div className="portal-calendar-upcoming">
        <div className="portal-calendar-schedule-panel">
          <div className="portal-calendar-upcoming-label">Schedule</div>
          <div className="portal-calendar-upcoming-columns">
            <div className="portal-calendar-upcoming-list">
              {upcomingEvents.map((event) => {
                const isSelectedEvent = selectedScheduleEvent?.id === event.id;
                const hasImageAttachments = (commentThreads[event.id] ?? []).some((comment) =>
                  (comment.attachments?.length ?? 0) > 0,
                );

                return (
                  <div
                    key={event.id}
                    data-event-id={event.id}
                    className={`portal-calendar-upcoming-item${
                      isSelectedEvent ? ' is-selected' : ''
                    }${selectedEventId === event.id ? ' is-thread-open' : ''}${
                      isToday(parseISO(event.datetime)) ? ' is-today' : ''
                    }`}
                  >
                    <button
                      type="button"
                      className="portal-calendar-upcoming-select"
                      onClick={() => handleUpcomingSelect(event.id, event.datetime)}
                    >
                      <span className={`portal-calendar-event-dot is-${event.status}`}>
                        {event.status === 'complete' ? <Check size={9} strokeWidth={2.5} /> : null}
                      </span>
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
                              if (!isSelectedEvent) {
                                setHoveredCommentId(event.id);
                              }
                            }}
                            onMouseLeave={() =>
                              setHoveredCommentId((currentId) => (
                                currentId === event.id ? null : currentId
                              ))
                            }
                          >
                            {hasImageAttachments ? (
                              <span
                                className="portal-calendar-comment-trigger portal-calendar-comment-trigger-image"
                                aria-label="Photos attached"
                                role="img"
                              >
                                <Image size={12} />
                              </span>
                            ) : null}
                            <span
                              className={`portal-calendar-comment-trigger${
                                unreadCommentIds.has(event.id) ? ' is-unread' : ''
                              }`}
                              aria-label={`${commentThreads[event.id].length} comments`}
                              role="img"
                            >
                              <MessageSquareMore size={12} />
                              <span className="portal-calendar-comment-count">
                                {commentThreads[event.id].length}
                              </span>
                            </span>
                            {!isSelectedEvent ? (
                              <div className="portal-calendar-comment-preview" role="note">
                                <p className="portal-calendar-comment-preview-label">
                                  Latest Comment
                                </p>
                                <p className="portal-calendar-comment-preview-text">
                                  {
                                    commentThreads[event.id][commentThreads[event.id].length - 1]
                                      ?.body
                                  }
                                </p>
                              </div>
                            ) : null}
                          </span>
                        ) : null}
                      </span>
                      {event.tag ? (
                        <span className={`portal-calendar-tag is-${event.status}`}>
                          {event.tag}
                        </span>
                      ) : (
                        <span />
                      )}
                    </button>
                    <div
                      className={`portal-calendar-comment-panel${
                        selectedEventId === event.id ? ' is-open' : ''
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
                          {(commentThreads[event.id] ?? []).length ? (
                            (commentThreads[event.id] ?? []).map((comment) => (
                              <div key={comment.id} className="portal-calendar-comment-entry">
                                <span
                                  className={`portal-calendar-comment-avatar is-${getCommentTone(
                                    comment.author,
                                  )}`}
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
                            ))
                          ) : (
                            <p className="portal-calendar-empty">No comments yet for this event.</p>
                          )}
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
                );
              })}
            </div>
          </div>
        </div>

        <aside className="portal-calendar-event-detail" aria-live="polite">
          {selectedScheduleEvent ? (
            <>
              <div className="portal-calendar-event-detail-head">
                <div>
                  <p className="portal-calendar-event-detail-kicker">
                    {format(parseISO(selectedScheduleEvent.datetime), 'MMM d')} ·{' '}
                    {selectedScheduleEvent.time}
                  </p>
                  <h3 className="portal-calendar-event-detail-title">
                    {selectedScheduleEvent.name}
                  </h3>
                </div>
              </div>

              <p className="portal-calendar-event-detail-copy">{selectedScheduleEvent.detail}</p>

              <div className="portal-calendar-event-detail-tags portal-calendar-selected-meta">
                <span>{selectedScheduleEvent.type}</span>
                <span>{selectedScheduleEvent.tag ?? selectedScheduleEvent.status}</span>
              </div>

              <div className="portal-calendar-event-detail-section">
                <div className="portal-calendar-event-attendees">
                  <div className="portal-calendar-event-attendees-head">
                    <p className="portal-calendar-event-attendees-label">Expected On Site</p>
                    <span className="portal-calendar-comment-panel-meta">
                      {commentThreads[selectedScheduleEvent.id]?.length ?? 0} comments on file
                    </span>
                  </div>
                  <div className="portal-calendar-event-attendees-list">
                    {selectedEventAttendees.map((attendee) => (
                      <div
                        key={`${selectedScheduleEvent.id}-${attendee.initials}-${attendee.name}`}
                        className="portal-calendar-event-attendee"
                      >
                        <span
                          className={`portal-calendar-comment-avatar is-${getCommentTone(
                            attendee.initials,
                          )}`}
                        >
                          {attendee.initials}
                        </span>
                        <div>
                          <strong>{attendee.name}</strong>
                          <span>{attendee.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="portal-calendar-event-day-grid">
                    <div>
                      <span>Arrival window</span>
                      <strong>30 minutes before start</strong>
                    </div>
                    <div>
                      <span>Primary focus</span>
                      <strong>{selectedScheduleEvent.type}</strong>
                    </div>
                    <div>
                      <span>Client role</span>
                      <strong>Review and confirm next steps</strong>
                    </div>
                    <div>
                      <span>Preparation</span>
                      <strong>Samples, notes, and updated site photos</strong>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="portal-calendar-empty">Select a schedule item to view details.</p>
          )}
        </aside>
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
          const dayEvents = events.filter((event) =>
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
              onClick={() => handleCalendarDateSelect(day, dayEvents)}
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
              <div className="portal-calendar-date-top">
                <time dateTime={format(day, 'yyyy-MM-dd')} className="portal-calendar-date-number">
                  {format(day, 'd')}
                </time>
                <span className="portal-calendar-date-indicators">
                  {hasCommentActivity ? (
                    <span className="portal-calendar-date-indicator" aria-label="Comments available">
                      <MessageSquareMore size={12} />
                    </span>
                  ) : null}
                  {hasImageActivity ? (
                    <span className="portal-calendar-date-indicator" aria-label="Photos available">
                      <Image size={12} />
                    </span>
                  ) : null}
                </span>
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
    </article>
  );
}
