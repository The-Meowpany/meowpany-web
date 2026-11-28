// Canonical, hreflang and structured-data helpers shared by the layout and the sitemap.
// Only real page-to-page translations belong here: the Spanish "hire" section is not a separate
// page, and the guide is Spanish-only, so neither is declared as a translated pair.
import { routes, type Lang } from "../i18n";
import { withBase, withoutBase } from "./url";

export type PagePair = { es: string; en: string };

export const pagePairs: PagePair[] = [
  { es: routes.home.es, en: routes.home.en },
  { es: routes.services.es, en: routes.services.en },
  { es: routes.work.es, en: routes.work.en },
  { es: routes.pricing.es, en: routes.pricing.en },
  { es: routes.quote.es, en: routes.quote.en },
  { es: routes.process.es, en: routes.process.en },
  { es: routes.about.es, en: routes.about.en },
  { es: routes.resources.es, en: routes.resources.en },
  { es: routes.contact.es, en: routes.contact.en },
  { es: routes.audit.es, en: routes.audit.en },
  { es: routes.estimate.es, en: routes.estimate.en },
  { es: routes.roi.es, en: routes.roi.en },
  { es: routes.book.es, en: routes.book.en },
  { es: routes.brand.es, en: routes.brand.en },
  { es: routes.news.es, en: routes.news.en },
  { es: routes.privacy.es, en: routes.privacy.en },
  { es: routes.terms.es, en: routes.terms.en },
  { es: routes.offers.es, en: routes.offers.en },
  { es: routes.partners.es, en: routes.partners.en },
  { es: routes.diagnosis.es, en: routes.diagnosis.en },
];

/** `es-UY` is the language of the Spanish pages; English pages declare `en`. */
export const languageTag = (lang: Lang) => (lang === "es" ? "es-UY" : "en");

const normalized = (pathname: string) => {
  const path = withoutBase(pathname);
  return path.endsWith("/") ? path : `${path}/`;
};

/** The exact translation of a page, or null when there is no one-to-one equivalent. */
export function pairFor(pathname: string): PagePair | null {
  const path = normalized(pathname);
  for (const pair of pagePairs) {
    if (normalized(pair.es) === path || normalized(pair.en) === path) {
      return { es: withBase(pair.es), en: withBase(pair.en) };
    }
  }
  return null;
}

/** The other language's URL for a page pair, ready to use in an href. */
export function translatedPath(pathname: string, lang: Lang): string | null {
  const pair = pairFor(pathname);
  if (!pair) return null;
  return lang === "es" ? pair.en : pair.es;
}

export function absoluteUrl(site: URL | undefined, path: string): string {
  return new URL(path, site).toString();
}

/** JSON for a <script type="application/ld+json"> block, with the characters that can close it escaped. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/[<>&]/g, (char) => ({ "<": "\\u003c", ">": "\\u003e", "&": "\\u0026" })[char]!);
}

/** Generates a JSON-LD FAQ schema from question/answer pairs. */
export function faqSchema(lang: Lang, faqs: Record<Lang, { q: string; a: string }[]>): string {
  const entries = faqs[lang]?.map((faq) => ({
    "@type": "Question",
    "name": faq.q,
    "text": faq.a
  })) || [];
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": entries
  });
}

/** Generates a JSON-LD LocalBusiness schema extension. */
export function localBusinessSchema(lang: Lang, site: typeof import('../site').site, additional?: Record<string, unknown>): string {
  const base = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: `${origin}/`,
    telephone: site.whatsapp ? `+${site.whatsapp}` : undefined,
    email: site.email,
    address: {"@type": "PostalAddress", addressCountry: "UY"},
    areaServed: ["UY", "US"],
    languages: ["es", "en"],
    …(additional ?? {})
  };
  return jsonLd(base);
}
