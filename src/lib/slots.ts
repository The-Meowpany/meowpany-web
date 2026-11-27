// Call slots computed in the browser from the team's weekly availability. Times are defined in the
// team's time zone and shown in the visitor's; the instants themselves are plain UTC Dates.

export type Availability = {
  /** IANA time zone the hours below are in, e.g. "America/Montevideo". */
  timeZone: string;
  /** Days of the week with calls: 0 = Sunday ... 6 = Saturday. */
  days: number[];
  /** First and last bookable start, "HH:MM", in timeZone. */
  from: string;
  until: string;
  slotMinutes: number;
  /** How many days ahead the agenda shows. */
  horizonDays: number;
  /** Minimum notice before a call, in hours. */
  noticeHours: number;
  /** Dates without calls (holidays), "YYYY-MM-DD" in timeZone. */
  closed?: string[];
};

/** Minutes the zone is ahead of UTC at a given instant (Montevideo: -180). */
export function zoneOffset(timeZone: string, at: Date): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).formatToParts(at).map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute), Number(parts.second));
  return Math.round((asUtc - at.getTime()) / 60000);
}

/** The instant a wall-clock time in a zone corresponds to. */
export function zonedTime(year: number, month: number, day: number, hour: number, minute: number, timeZone: string): Date {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const first = guess - zoneOffset(timeZone, new Date(guess)) * 60000;
  // A second pass settles the rare case where the offset changes between the guess and the answer.
  return new Date(guess - zoneOffset(timeZone, new Date(first)) * 60000);
}

/** The calendar date ("YYYY-MM-DD") and weekday an instant falls on in a zone. */
export function zonedDate(at: Date, timeZone: string): { date: string; weekday: number } {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" }).formatToParts(at).map((p) => [p.type, p.value]),
  );
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);
  return { date: `${parts.year}-${parts.month}-${parts.day}`, weekday };
}

const minutesOf = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Every bookable start from now until the horizon, oldest first. */
export function slots(availability: Availability, now: Date): Date[] {
  const { timeZone, slotMinutes } = availability;
  const earliest = now.getTime() + availability.noticeHours * 3600000;
  const closed = new Set(availability.closed ?? []);
  const result: Date[] = [];
  const today = zonedDate(now, timeZone).date;
  const [y, m, d] = today.split("-").map(Number);
  for (let offset = 0; offset <= availability.horizonDays; offset++) {
    // Noon avoids landing on the wrong day around offset changes.
    const noon = zonedTime(y, m, d + offset, 12, 0, timeZone);
    const { date, weekday } = zonedDate(noon, timeZone);
    if (!availability.days.includes(weekday) || closed.has(date)) continue;
    const [yy, mm, dd] = date.split("-").map(Number);
    for (let minute = minutesOf(availability.from); minute <= minutesOf(availability.until); minute += slotMinutes) {
      const start = zonedTime(yy, mm, dd, Math.floor(minute / 60), minute % 60, timeZone);
      if (start.getTime() >= earliest) result.push(start);
    }
  }
  return result;
}

/** Slots grouped by the visitor's calendar date ("YYYY-MM-DD" in their zone). */
export function byDay(starts: Date[], timeZone: string): Map<string, Date[]> {
  const days = new Map<string, Date[]>();
  for (const start of starts) {
    const { date } = zonedDate(start, timeZone);
    days.set(date, [...(days.get(date) ?? []), start]);
  }
  return days;
}

const icsDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** An .ics calendar event, so the visitor can hold the time while we confirm it. */
export function icsEvent(start: Date, minutes: number, title: string, description: string, uid: string): string {
  const end = new Date(start.getTime() + minutes * 60000);
  const escape = (text: string) => text.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//The Meowpany//Agenda//ES", "BEGIN:VEVENT",
    `UID:${uid}`, `DTSTAMP:${icsDate(new Date())}`, `DTSTART:${icsDate(start)}`, `DTEND:${icsDate(end)}`,
    `SUMMARY:${escape(title)}`, `DESCRIPTION:${escape(description)}`, "STATUS:TENTATIVE", "END:VEVENT", "END:VCALENDAR", "",
  ].join("\r\n");
}

/** A Google Calendar link for the same event. */
export function googleCalendarUrl(start: Date, minutes: number, title: string, details: string): string {
  const end = new Date(start.getTime() + minutes * 60000);
  const params = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${icsDate(start)}/${icsDate(end)}`, details });
  return `https://calendar.google.com/calendar/render?${params}`;
}
