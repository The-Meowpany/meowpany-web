// Routes and shared interface text in both languages. Page content lives next to each view.

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
  privacy: { es: "/privacidad/", en: "/en/privacy/" },
  terms: { es: "/terminos/", en: "/en/terms/" },
} as const;

export type RouteKey = keyof typeof routes;

export const ui = {
  es: {
    tagline: "Software a medida para pymes",
    skip: "Saltar al contenido",
    nav: { services: "Servicios", work: "Casos", pricing: "Precios", process: "Cómo trabajamos", resources: "Recursos", hire: "Equipo para el exterior", about: "Nosotros", contact: "Contacto", audit: "Auditoría gratis", estimate: "Estimar mi proyecto", roi: "Calcular el retorno", book: "Agendar una llamada" },
    quote: "Cotizar",
    menu: "Menú",
    close: "Cerrar",
    switchTo: "English",
    switchLabel: "Read this page in English",
    footer: {
      rights: "Todos los derechos reservados.",
      privacy: "Privacidad",
      terms: "Términos",
      cookies: "Este sitio no usa cookies de seguimiento.",
      company: "Empresa",
      tools: "Herramientas gratuitas",
      services: "Servicios",
      reach: "Contacto",
    },
    whatsapp: "Escríbanos por WhatsApp",
    whatsappText: "Hola, quiero consultar por un proyecto.",
    price: { from: "desde", perMonth: "por mes", perHour: "por hora", vat: "+ IVA para clientes de Uruguay" },
  },
  en: {
    tagline: "Custom software for growing businesses",
    skip: "Skip to content",
    nav: { services: "Services", work: "Work", pricing: "Pricing", process: "How we work", resources: "Resources", hire: "Hire developers", about: "About", contact: "Contact", audit: "Free audit", estimate: "Estimate my project", roi: "Calculate the return", book: "Book a call" },
    quote: "Get a quote",
    menu: "Menu",
    close: "Close",
    switchTo: "Español",
    switchLabel: "Leer esta página en español",
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "This site uses no tracking cookies.",
      company: "Company",
      tools: "Free tools",
      services: "Services",
      reach: "Contact",
    },
    whatsapp: "Message us on WhatsApp",
    whatsappText: "Hi, I'd like to ask about a project.",
    price: { from: "from", perMonth: "per month", perHour: "per hour", vat: "Uruguayan clients add VAT" },
  },
} as const;

export const t = (lang: Lang) => ui[lang];
export const path = (key: RouteKey, lang: Lang) => routes[key][lang];

/** Finds the same page in the other language, so the language switch keeps the reader in place. */
export function alternate(pathname: string, lang: Lang): string {
  const other: Lang = lang === "es" ? "en" : "es";
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][lang] === normalized) return routes[key][other];
  }
  return routes.home[other];
}

export const money = (amount: number, lang: Lang) =>
  `USD ${amount.toLocaleString(lang === "es" ? "es-UY" : "en-US", { maximumFractionDigits: 0 })}`;
