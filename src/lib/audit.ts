// Free website audit, run from the visitor's browser with Google's PageSpeed Insights API (Lighthouse
// on a mobile profile). This module turns Lighthouse's report into the short report the page shows:
// a score per category and the failing checks ranked by how much they weigh in that score.

export type Status = "pass" | "warn" | "fail";
export type Check = { id: string; category: string; status: Status; impact: 1 | 2 | 3; title: string; value: string; fix: string };
export type Report = {
  url: string;
  created: string;
  score: number;
  categories: Record<string, number>;
  categoryLabels: Record<string, string>;
  checks: Check[];
  fixes: Check[];
};

export const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"] as const;
const MAX_FIXES = 15;
const SCORED_MODES = new Set(["binary", "numeric", "metricSavings"]);

type LighthouseAudit = { id?: string; title: string; description?: string; score: number | null; scoreDisplayMode: string; displayValue?: string };
type LighthouseCategory = { title: string; score: number | null; auditRefs: { id: string; weight: number }[] };
export type PageSpeedResponse = {
  lighthouseResult: {
    finalUrl?: string;
    finalDisplayedUrl?: string;
    requestedUrl?: string;
    fetchTime: string;
    categories: Record<string, LighthouseCategory>;
    audits: Record<string, LighthouseAudit>;
  };
};

/** Accepts "mitienda.com.uy" as well as full addresses, and only http(s). */
export function normalizeUrl(input: string): string | null {
  const text = input.trim();
  if (!text) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function pageSpeedUrl(url: string, lang: string, key = ""): string {
  const params = new URLSearchParams({ url, strategy: "mobile", locale: lang });
  for (const category of CATEGORIES) params.append("category", category.toUpperCase().replace("-", "_"));
  if (key) params.set("key", key);
  return `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`;
}

/** Lighthouse descriptions are Markdown with "Learn more" links; the report shows plain text. */
export const plainText = (markdown = "") =>
  markdown.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/\s+/g, " ").trim();

const statusOf = (score: number): Status => (score >= 0.9 ? "pass" : score >= 0.5 ? "warn" : "fail");
const impactOf = (weight: number): 1 | 2 | 3 => (weight >= 7 ? 3 : weight >= 2 ? 2 : 1);

export function reportFrom(response: PageSpeedResponse): Report {
  const { lighthouseResult: result } = response;
  const categories: Record<string, number> = {};
  const categoryLabels: Record<string, string> = {};
  const seen = new Map<string, Check & { weight: number }>();

  for (const key of CATEGORIES) {
    const category = result.categories[key];
    if (!category || category.score === null) continue;
    categories[key] = Math.round(category.score * 100);
    categoryLabels[key] = category.title;
    for (const ref of category.auditRefs) {
      const audit = result.audits[ref.id];
      if (!audit || audit.score === null || !SCORED_MODES.has(audit.scoreDisplayMode)) continue;
      const previous = seen.get(ref.id);
      if (previous && previous.weight >= ref.weight) continue;
      seen.set(ref.id, {
        id: ref.id, category: key, status: statusOf(audit.score), impact: impactOf(ref.weight), weight: ref.weight,
        title: audit.title, value: audit.displayValue ?? "", fix: plainText(audit.description),
      });
    }
  }

  const checks = [...seen.values()];
  const fixes = checks
    .filter((check) => check.status !== "pass")
    .sort((a, b) => b.weight - a.weight || Number(a.status === "warn") - Number(b.status === "warn"))
    .slice(0, MAX_FIXES);
  const values = Object.values(categories);
  const strip = ({ weight: _weight, ...check }: Check & { weight: number }): Check => check;

  return {
    url: result.finalDisplayedUrl ?? result.finalUrl ?? result.requestedUrl ?? "",
    created: result.fetchTime,
    score: values.length ? Math.round(values.reduce((sum, v) => sum + v, 0) / values.length) : 0,
    categories,
    categoryLabels,
    checks: checks.map(strip),
    fixes: fixes.map(strip),
  };
}

export async function runAudit(url: string, lang: string, key = "", signal?: AbortSignal): Promise<Report> {
  const response = await fetch(pageSpeedUrl(url, lang, key), { signal });
  const body = await response.json().catch(() => null);
  if (!response.ok || !body?.lighthouseResult) {
    const error = new Error(body?.error?.message ?? `HTTP ${response.status}`);
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }
  return reportFrom(body);
}
