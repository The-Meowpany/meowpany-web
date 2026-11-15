import assert from "node:assert/strict";
import { test } from "node:test";

import { roi } from "./roi.ts";

const base = {
  hoursLostPerWeek: 10, hourlyCost: 6, errorsPerMonth: 4, costPerError: 25,
  salesLostPerMonth: 300, projectPrice: 2200, monthlySupport: 50,
};

test("adds up time, errors and lost sales", () => {
  const result = roi(base);
  // 10 h × 52/12 weeks × USD 6 = 260; 4 × 25 = 100; 300 in sales.
  assert.deepEqual(result.breakdown, { time: 260, errors: 100, sales: 300 });
  assert.equal(result.monthlyLoss, 660);
  assert.equal(result.monthlyNet, 610);
});

test("payback and net gain", () => {
  const result = roi(base);
  assert.equal(result.paybackMonths, 3.7); // 2200 / 610 = 3.61, rounded up to one decimal.
  assert.equal(result.net12, 610 * 12 - 2200);
  assert.equal(result.net36, 610 * 36 - 2200);
});

test("never pays back when savings do not cover support", () => {
  const result = roi({ ...base, hoursLostPerWeek: 0, errorsPerMonth: 0, salesLostPerMonth: 20 });
  assert.equal(result.paybackMonths, null);
  assert.ok(result.net36 < 0);
});

test("ignores negative and invalid inputs", () => {
  const result = roi({ ...base, hoursLostPerWeek: -5, hourlyCost: Number.NaN });
  assert.equal(result.breakdown.time, 0);
});
