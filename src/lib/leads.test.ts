import assert from "node:assert/strict";
import { test } from "node:test";

import { bodyOf, FallbackSink, MailtoSink, subjectOf, type Lead, type LeadSink } from "./leads.ts";

const lead: Lead = {
  kind: "prototype", language: "es", name: "Ana", email: "ana@example.com", company: "Clínica Sur",
  message: "Turnos en línea", details: { Service: "custom", Pages: undefined, Payments: true },
};

test("writes the same subject and body for every channel", () => {
  assert.equal(subjectOf(lead), "First working version request · Clínica Sur");
  assert.equal(bodyOf(lead), "Name: Ana\nEmail: ana@example.com\nCompany: Clínica Sur\nLanguage: es\nService: custom\nPayments: true\n\nTurnos en línea");
});

test("drafts an email with the request when no service is configured", async () => {
  let opened = "";
  const sink = new FallbackSink(null, new MailtoSink("hola@example.com", (url) => { opened = url; }));
  assert.equal(await sink.send(lead), "drafted");
  assert.ok(opened.startsWith("mailto:hola@example.com?subject=First%20working%20version%20request"));
  assert.ok(decodeURIComponent(opened).includes("Turnos en línea"));
});

test("falls back to email when the service fails", async () => {
  const failing: LeadSink = { send: async () => { throw new Error("down"); } };
  const working: LeadSink = { send: async () => "sent" };
  let opened = false;
  const mail = new MailtoSink("hola@example.com", () => { opened = true; });
  assert.equal(await new FallbackSink(working, mail).send(lead), "sent");
  assert.equal(opened, false);
  assert.equal(await new FallbackSink(failing, mail).send(lead), "drafted");
  assert.equal(opened, true);
});
