import assert from "node:assert/strict";
import { test } from "node:test";

import { estimate, functionsFrom, InvalidAnswers, size, type Answers } from "./estimator.ts";

const answers: Answers = {
  entities: [{ name: "clientes", size: "some" }],
  reports: [{ name: "facturas", complexity: "high" }],
  integrations: [],
  online_payments: true,
  notifications: true,
  roles: 2,
  scale: "small",
  logic: "moderate",
};

test("counts every function the answers imply with IFPUG weights", () => {
  const functions = functionsFrom(answers, "es");
  // Entity: ILF 10 + create 4 + edit 4 + delete 3 + view 4; report EO high 7; payments EIF 7 + EI 4;
  // roles ILF 7 + EI 3 + EQ 3; notifications EO 5.
  assert.equal(functions.reduce((sum, f) => sum + f.weight, 0), 61);
  assert.equal(functions[1].name, "Crear clientes");
  assert.equal(functionsFrom(answers, "en")[1].name, "Create clientes");
});

test("matches Core's adjustment, hours, weeks and price range", () => {
  const result = estimate(answers, "es");
  // Baseline 31 + performance 1 + transaction rate 1 + complex processing 3 = 36, so VAF 1.01.
  assert.equal(result.adjustmentFactor, 1.01);
  assert.equal(result.adjustedPoints, 61.61);
  assert.equal(result.hours, 185); // 61.61 × 3 = 184.83, rounded up
  assert.equal(result.price, 6475);
  assert.equal(result.weeks, 4.7); // 185 / 40 = 4.625, rounded up to one decimal
  assert.deepEqual([result.priceLow, result.priceHigh], [5180, 7770]);
});

test("reproduces the reference case in Core's tests", () => {
  // Core: 18 points with every characteristic at 3 is 19.26 adjusted points, 58 h, USD 2,030, 1.5 weeks.
  const result = size(18, 14 * 3);
  assert.equal(result.adjustedPoints, 19.26);
  assert.equal(result.hours, 58);
  assert.equal(result.price, 2030);
  assert.equal(result.weeks, 1.5);
});

test("requires at least one thing to store and caps the lists", () => {
  assert.throws(() => estimate({ entities: [{ name: "  " }], reports: [], integrations: [] }, "es"), InvalidAnswers);
  const many = Array.from({ length: 31 }, (_, i) => ({ name: `e${i}` }));
  assert.throws(() => estimate({ entities: many, reports: [], integrations: [] }, "es"), (error: unknown) =>
    error instanceof InvalidAnswers && error.fields.entities === "too_many");
});
