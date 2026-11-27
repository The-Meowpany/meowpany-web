import assert from "node:assert/strict";
import { test } from "node:test";

import { byDay, icsEvent, slots, zonedDate, zonedTime, zoneOffset, type Availability } from "./slots.ts";

const agenda: Availability = {
  timeZone: "America/Montevideo", days: [1, 2, 3, 4, 5], from: "10:00", until: "17:30",
  slotMinutes: 30, horizonDays: 14, noticeHours: 24, closed: ["2026-12-25"],
};

test("converts wall-clock times in a zone to instants", () => {
  assert.equal(zoneOffset("America/Montevideo", new Date("2026-12-01T12:00:00Z")), -180);
  assert.equal(zonedTime(2026, 12, 1, 10, 0, "America/Montevideo").toISOString(), "2026-12-01T13:00:00.000Z");
  // New York changes offset: EST in December, EDT in July.
  assert.equal(zonedTime(2026, 12, 1, 9, 0, "America/New_York").toISOString(), "2026-12-01T14:00:00.000Z");
  assert.equal(zonedTime(2026, 7, 1, 9, 0, "America/New_York").toISOString(), "2026-07-01T13:00:00.000Z");
  assert.deepEqual(zonedDate(new Date("2026-12-01T02:00:00Z"), "America/Montevideo"), { date: "2026-11-30", weekday: 1 });
});

test("offers weekday slots after the notice period, skipping closed days", () => {
  // Friday 27 Nov 2026, 15:00 in Montevideo.
  const all = slots(agenda, new Date("2026-11-27T18:00:00Z"));
  const days = byDay(all, "America/Montevideo");
  assert.ok(!days.has("2026-11-28") && !days.has("2026-11-29"), "no weekend slots");
  assert.ok(!days.has("2026-12-25"), "closed day skipped");
  // Monday is more than 24 h away: the whole day, 10:00 to 17:30, every 30 minutes.
  assert.equal(days.get("2026-11-30")?.length, 16);
  assert.equal(days.get("2026-11-30")?.[0].toISOString(), "2026-11-30T13:00:00.000Z");
  assert.ok(all.every((s) => s.getTime() >= Date.parse("2026-11-28T18:00:00Z")));
});

test("respects the notice period within a day", () => {
  // Monday 30 Nov, 14:10 in Montevideo: Tuesday from 14:30 onwards.
  const days = byDay(slots(agenda, new Date("2026-11-30T17:10:00Z")), "America/Montevideo");
  assert.equal(days.get("2026-12-01")?.[0].toISOString(), "2026-12-01T17:30:00.000Z");
  assert.ok(!days.has("2026-11-30"));
});

test("writes a tentative calendar event", () => {
  const ics = icsEvent(new Date("2026-12-01T13:00:00Z"), 30, "Llamada, The Meowpany", "Por confirmar; uno, dos", "x@y");
  assert.match(ics, /DTSTART:20261201T130000Z/);
  assert.match(ics, /DTEND:20261201T133000Z/);
  assert.match(ics, /STATUS:TENTATIVE/);
  assert.match(ics, /SUMMARY:Llamada\\, The Meowpany/);
});
