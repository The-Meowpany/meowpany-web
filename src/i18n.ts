// Routes and shared interface text in both languages. Page content lives next to each view.
import { withBase, withoutBase } from "./lib/url.ts";

export type Lang = "es" | "en";
export const languages: Lang[] = ["es", "en"];

export const routes = {
  home: { es: "/", en: "/en/" },
  services: { es: "/servicios/", en: "/en/services/" },
  work: { es: "/casos/", en: "/en/work/" },
  pricing: { es: "/precios/", en: "/en/pricing/" },
  quote: { es: "/cotizar/", en: "/en/quote/" },
  process: { es: "/como-trabajamos/", en: "/en/how-we-work/" },
  about: { es: "/nosotros/", en: "/en/about/" },
  resources: { es: "/recursos/", en: "/en/resources/" },
  contact: { es: "/contacto/", en: "/en/contact/" },
  hire: { es: "/servicios/#exterior", en: "/en/hire-developers/" },
  audit: { es: "/auditoria/", en: "/en/audit/" },
  estimate: { es: "/estimar/", en: "/en/estimate/" },
  roi: { es: "/retorno/", en: "/en/roi/" },
  book: { es: "/agendar/", en: "/en/book/" },
  firstVersion: { es: "/#primera-version", en: "/en/#first-version" },
  news: { es: "/novedades/", en: "/en/news/" },
  privacy: { es: "/privacidad/", en: "/en/privacy/" },
  terms: { es: "/terminos/", en: "/en/terms/" },
  offers: { es: "/beneficios/", en: "/en/offers/" },
  partners: { es: "/socios/", en: "/en/partners/" },
  diagnosis: { es: "/diagnostico/", en: "/en/diagnosis/" },
} as const;

export type RouteKey = keyof typeof routes;

export const ui = {
  es: {
    tagline: "Ingeniería de software a medida",
    skip: "Saltar al contenido",
    nav: { services: "Servicios", work: "Casos", pricing: "Presupuestos", process: "Cómo trabajamos", resources: "Recursos", hire: "Equipo para el exterior", about: "Nosotros", contact: "Contacto", audit: "Auditoría gratis", estimate: "Estimar mi proyecto", roi: "Calcular el retorno", book: "Agendar llamada", firstVersion: "Primera versión gratis", news: "Novedades", offers: "Beneficios", partners: "Programa de socios", diagnosis: "Diagnóstico gratis", guide: "Guía para vender en línea" },
    quote: "Cotizar",
    ctaKicker: "Siguiente paso",
    ctaLaunch: "Lanzamiento",
    seeItWorking: "Quiero verlo funcionando",
    menu: "Menú",
    close: "Cerrar",
    switchTo: "English",
    switchLabel: "Read this page in English",
    language: "Idioma",
    theme: { toDark: "Activar el modo oscuro", toLight: "Activar el modo claro" },
    partnerBar: { text: "Programa de socios: gane un {rate}\u00A0% por cada empresa que nos presente.", link: "Conocer el programa", close: "Cerrar el aviso" },
    footer: {
      rights: "Todos los derechos reservados.",
      privacy: "Privacidad",
      terms: "Términos",
      cookies: "Sin cookies de seguimiento",
      company: "Empresa",
      tools: "Recursos",
      services: "Servicios",
      reach: "Contacto",
      legal: "Legal",
      blurb: "Estudio de ingeniería de software con base en Uruguay. Sitios, apps y sistemas a medida, con alcance y precio por escrito.",
      meta: "Uruguay · Trabajo remoto · Español e inglés",
    },
    whatsapp: "Escribir por WhatsApp",
    whatsappShort: "WhatsApp",
    whatsappNote: "Escribir por WhatsApp",
    whatsappText: "Hola, quiero consultar por un proyecto.",
    price: { vat: "Cotizamos en dólares estadounidenses. Clientes de Uruguay: + IVA (22 %)" },
  },
  en: {
    tagline: "Custom software engineering",
    skip: "Skip to content",
    nav: { services: "Services", work: "Work", pricing: "Pricing", process: "How we work", resources: "Resources", hire: "Hire developers", about: "About", contact: "Contact", audit: "Free audit", estimate: "Estimate my project", roi: "Calculate the return", book: "Book a call", firstVersion: "Free first version", news: "News", offers: "Offers", partners: "Partner program", diagnosis: "Free diagnosis", guide: "Guide to selling online in Uruguay (Spanish)" },
    quote: "Get a quote",
    ctaKicker: "Next step",
    ctaLaunch: "Launch",
    seeItWorking: "I want to see it working",
    menu: "Menu",
    close: "Close",
    switchTo: "Español",
    switchLabel: "Leer esta página en español",
    language: "Language",
    theme: { toDark: "Switch to dark mode", toLight: "Switch to light mode" },
    partnerBar: { text: "Partner program: earn {rate}% for every business you bring us.", link: "See the program", close: "Dismiss" },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "No tracking cookies",
      company: "Company",
      tools: "Resources",
      services: "Services",
      reach: "Contact",
      legal: "Legal",
      blurb: "A software engineering studio based in Uruguay. Custom sites, apps and systems, with scope and price in writing.",
      meta: "Uruguay · Remote · Spanish and English",
    },
    whatsapp: "Message us on WhatsApp",
    whatsappShort: "WhatsApp",
    whatsappNote: "Message us on WhatsApp",
    whatsappText: "Hi, I'd like to ask about a project.",
    price: { vat: "Quotes in US dollars" },
  },
} as const;

export const t = (lang: Lang) => ui[lang];
/** A route with the site's base path, ready for an href. */
export const path = (key: RouteKey, lang: Lang) => withBase(routes[key][lang]);

/** Finds the same page in the other language, so the language switch keeps the reader in place. */
export function alternate(pathname: string, lang: Lang): string {
  const other: Lang = lang === "es" ? "en" : "es";
  const local = withoutBase(pathname);
  const normalized = local.endsWith("/") ? local : `${local}/`;
  // Posts have their own slug in each language: the switch leads to the other language's news.
  if (normalized.startsWith(routes.news[lang]) && normalized !== routes.news[lang]) return withBase(routes.news[other]);
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][lang] === normalized) return withBase(routes[key][other]);
  }
  return withBase(routes.home[other]);
}
