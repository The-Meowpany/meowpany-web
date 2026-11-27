import assert from "node:assert/strict";
import { test } from "node:test";

import { diagnose, InvalidAnswers } from "./diagnosis.ts";

test("a shop selling through social media is pointed to an online store", () => {
  const result = diagnose({ sell: "social", time: "orders", goal: "sell", today: "nothing", when: "now" });
  assert.equal(result.need, "store");
  assert.equal(result.next, "prototype");
  assert.deepEqual(result.reasons.map((r) => r.question), ["sell", "time", "goal", "today"]);
});

test("a business nobody finds online is pointed to a website", () => {
  assert.equal(diagnose({ sell: "shop", time: "questions", goal: "found", today: "old", when: "quarter" }).need, "website");
});

test("appointments and spreadsheets point to custom software", () => {
  const result = diagnose({ sell: "appointments", time: "schedule", goal: "order", today: "system", when: "exploring" });
  assert.equal(result.need, "custom");
  assert.equal(result.next, "explore");
});

test("an existing store that needs upkeep is pointed to support", () => {
  assert.equal(diagnose({ sell: "online", time: "upkeep", goal: "grow", today: "store", when: "quarter" }).need, "support");
});

test("a software team short of hands is pointed to developers for hire", () => {
  assert.equal(diagnose({ sell: "team", time: "backlog", goal: "capacity", today: "system", when: "now" }).need, "hours");
});

test("ties go to the simpler starting point", () => {
  // website 2 + 3 = 5 and custom 2 + 3 = 5: the website comes first.
  const result = diagnose({ sell: "b2b", time: "questions", goal: "order", today: "store", when: "now" });
  assert.deepEqual(result.ranking.slice(0, 2), [{ need: "website", score: 5 }, { need: "custom", score: 5 }]);
  assert.equal(result.need, "website");
});

test("missing or unknown answers are rejected", () => {
  assert.throws(() => diagnose({ sell: "social", time: "orders", goal: "sell", today: "nothing" }), InvalidAnswers);
  assert.throws(() => diagnose({ sell: "social", time: "nope", goal: "sell", today: "nothing", when: "now" }), InvalidAnswers);
  assert.throws(() => diagnose({ sell: "toString", time: "orders", goal: "sell", today: "nothing", when: "now" }), InvalidAnswers);
});
