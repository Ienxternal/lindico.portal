import { useMemo, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const calendarEvents = [
  { id: 1, name: 'Material delivery', time: '9:00 AM', datetime: '2026-04-09T09:00:00' },
  { id: 2, name: 'Client walkthrough', time: '10:00 AM', datetime: '2026-04-12T10:00:00' },
  { id: 3, name: 'Project lead out', time: 'All day', datetime: '2026-04-18T08:00:00' },
  { id: 4, name: 'Lighting controls', time: '1:00 PM', datetime: '2026-04-24T13:00:00' },
];

export function ProjectCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3, 1));
  const [selectedDate, setSelectedDate] = useState(parseISO('2026-04-12T10:00:00'));

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const selectedEvents = calendarEvents.filter((event) =>
    isSameDay(parseISO(event.datetime), selectedDate),
  );

  return (
    <article className="portal-card overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-[#e8dfd3] px-5 py-4">
        <div>
          <p className="portal-card-kicker mb-2">Calendar</p>
          <h2 className="text-[0.98rem] font-medium text-[#171411]">
            <time dateTime={format(currentMonth, 'yyyy-MM')}>
              {format(currentMonth, 'MMMM yyyy')}
            </time>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setCurrentMonth((value) => addMonths(value, -1))}
            className="inline-flex h-8 w-8 items-center justify-center border border-[#e6ddd1] bg-white text-[#6e6559] transition hover:border-[#d6c7b2] hover:text-[#171411]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setCurrentMonth((value) => addMonths(value, 1))}
            className="inline-flex h-8 w-8 items-center justify-center border border-[#e6ddd1] bg-white text-[#6e6559] transition hover:border-[#d6c7b2] hover:text-[#171411]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="border-b border-[#ece4d8] bg-[#f8f5f0]">
        <div className="grid grid-cols-7 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[#8a7d6c]">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="py-3">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-[#ece4d8]">
        {monthDays.map((day) => {
          const dayEvents = calendarEvents.filter((event) =>
            isSameDay(parseISO(event.datetime), day),
          );
          const isSelected = isSameDay(day, selectedDate);

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => setSelectedDate(day)}
              className={`min-h-24 bg-white px-3 py-3 text-left transition hover:bg-[#faf7f2] ${
                !isSameMonth(day, currentMonth) ? 'text-[#c1b6a6]' : 'text-[#171411]'
              } ${isSelected ? 'bg-[#f7f0e6]' : ''}`}
            >
              <div className="flex items-center justify-between">
                <time
                  dateTime={format(day, 'yyyy-MM-dd')}
                  className={`inline-flex h-7 w-7 items-center justify-center text-[0.8rem] ${
                    isSelected
                      ? 'bg-[#b6a58e] text-white'
                      : 'bg-transparent'
                  }`}
                >
                  {format(day, 'd')}
                </time>
                {dayEvents.length > 0 ? (
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#b6a58e]" />
                ) : null}
              </div>

              <div className="mt-3 space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <p key={event.id} className="truncate text-[11px] text-[#5a5146]">
                    {event.name}
                  </p>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="border-t border-[#ece4d8] bg-white px-5 py-4">
        <p className="portal-card-kicker mb-2">Selected Date</p>
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#171411]">{format(selectedDate, 'MMMM d, yyyy')}</p>
          {selectedEvents.length > 0 ? (
            selectedEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between gap-4 text-sm text-[#5a5146]">
                <span>{event.name}</span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#8a7d6c]">
                  {event.time}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#8a7d6c]">No scheduled events for this date.</p>
          )}
        </div>
      </div>
    </article>
  );
}
