import assert from "node:assert/strict";
import { test } from "node:test";

import { normalizeUrl, pageSpeedUrl, plainText, reportFrom, type PageSpeedResponse } from "./audit.ts";

const response: PageSpeedResponse = {
  lighthouseResult: {
    finalDisplayedUrl: "https://example.com/",
    fetchTime: "2026-11-27T12:00:00.000Z",
    categories: {
      performance: { title: "Rendimiento", score: 0.42, auditRefs: [{ id: "lcp", weight: 25 }, { id: "unused-js", weight: 0 }] },
      accessibility: { title: "Accesibilidad", score: 0.9, auditRefs: [{ id: "image-alt", weight: 10 }, { id: "manual", weight: 0 }] },
      "best-practices": { title: "Prácticas recomendadas", score: 1, auditRefs: [{ id: "https", weight: 5 }] },
      seo: { title: "SEO", score: 0.8, auditRefs: [{ id: "meta-description", weight: 1 }] },
    },
    audits: {
      lcp: { title: "Largest Contentful Paint", score: 0.1, scoreDisplayMode: "numeric", displayValue: "6,1 s", description: "Mide el tiempo. [Más información](https://web.dev/lcp)." },
      "unused-js": { title: "Reduce el JavaScript", score: 0.6, scoreDisplayMode: "metricSavings", description: "Quite `scripts` sin uso." },
      "image-alt": { title: "Las imágenes tienen alt", score: 0, scoreDisplayMode: "binary" },
      manual: { title: "Revisión manual", score: null, scoreDisplayMode: "manual" },
      https: { title: "Usa HTTPS", score: 1, scoreDisplayMode: "binary" },
      "meta-description": { title: "Tiene meta descripción", score: 0, scoreDisplayMode: "binary" },
    },
  },
};

test("scores each category and averages them", () => {
  const report = reportFrom(response);
  assert.deepEqual(report.categories, { performance: 42, accessibility: 90, "best-practices": 100, seo: 80 });
  assert.equal(report.score, 78);
  assert.equal(report.categoryLabels.seo, "SEO");
  assert.equal(report.url, "https://example.com/");
});

test("ranks failing checks by weight and skips the ones Lighthouse cannot score", () => {
  const report = reportFrom(response);
  assert.deepEqual(report.fixes.map((c) => c.id), ["lcp", "image-alt", "meta-description", "unused-js"]);
  assert.deepEqual(report.fixes.map((c) => c.impact), [3, 3, 1, 1]);
  assert.ok(!report.checks.some((c) => c.id === "manual"));
  assert.equal(report.checks.find((c) => c.id === "https")?.status, "pass");
  assert.equal(report.fixes[0].fix, "Mide el tiempo. Más información.");
});

test("accepts bare domains and rejects what is not a website", () => {
  assert.equal(normalizeUrl("mitienda.com.uy"), "https://mitienda.com.uy/");
  assert.equal(normalizeUrl("http://example.com/a"), "http://example.com/a");
  assert.equal(normalizeUrl("localhost"), null);
  assert.equal(normalizeUrl("javascript:alert(1)"), null);
  assert.equal(normalizeUrl(" "), null);
});

test("asks for all four categories on mobile, in the visitor's language", () => {
  const url = new URL(pageSpeedUrl("https://example.com/", "es", "k"));
  assert.deepEqual(url.searchParams.getAll("category"), ["PERFORMANCE", "ACCESSIBILITY", "BEST_PRACTICES", "SEO"]);
  assert.equal(url.searchParams.get("locale"), "es");
  assert.equal(url.searchParams.get("strategy"), "mobile");
  assert.equal(url.searchParams.get("key"), "k");
  assert.equal(plainText("Use `alt` [docs](https://x)"), "Use alt docs");
});
