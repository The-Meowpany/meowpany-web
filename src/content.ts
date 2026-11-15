// Content reused across pages, in both languages. Prices come from pricing.ts so they never drift.
import type { Lang } from "./i18n";
import { prices } from "./pricing";

export type Service = {
  key: "website" | "store" | "custom" | "support" | "hours";
  icon: string;
  title: string;
  summary: string;
  includes: string[];
  price: number;
  unit: "from" | "perMonth" | "perHour";
  time: string;
};

export const services: Record<Lang, Service[]> = {
  es: [
    {
      key: "website", icon: "layout-template", title: "Sitio institucional",
      summary: "Su empresa en internet con un sitio rápido, propio y fácil de encontrar en Google.",
      includes: ["Hasta 6 páginas adaptadas a móviles", "SEO básico y Google Business Profile", "Formulario, WhatsApp y analítica", "Garantía de 60 días"],
      price: prices.website.from, unit: "from", time: "2 a 3 semanas",
    },
    {
      key: "store", icon: "shopping-bag", title: "Tienda en línea",
      summary: "Venda las 24 horas con pagos, envíos y facturación electrónica conectados.",
      includes: ["Catálogo, carrito y pagos (Mercado Pago, tarjetas)", "Integración con facturación electrónica (CFE)", "Envíos y stock", "Capacitación para su equipo"],
      price: prices.store.from, unit: "from", time: "4 a 6 semanas",
    },
    {
      key: "custom", icon: "workflow", title: "Sistemas a medida",
      summary: "Turnos, gestión, portales e integraciones que reemplazan planillas y papeles.",
      includes: ["Relevamiento y especificación", "Diseño, desarrollo y pruebas", "Entregas cada 2 semanas", "Manuales y traspaso del código"],
      price: prices.custom.from, unit: "from", time: "2 a 4 meses",
    },
    {
      key: "support", icon: "shield-check", title: "Soporte y mantenimiento",
      summary: "Hosting, copias de seguridad, actualizaciones y mejoras, con un precio fijo por mes.",
      includes: ["Hosting y certificado de seguridad", "Copias de seguridad automáticas", "Actualizaciones y monitoreo", "Horas de mejoras según el plan"],
      price: prices.support.basic, unit: "perMonth", time: "Continuo",
    },
    {
      key: "hours", icon: "globe", title: "Equipo para el exterior",
      summary: "Desarrolladores uruguayos en su zona horaria, por hora o con dedicación completa.",
      includes: ["Horario compatible con EE. UU.", "Contratos y facturación en dólares", "Repositorios y procesos ordenados", "Amplíe o reduzca el equipo cuando lo necesite"],
      price: prices.hours.rate, unit: "perHour", time: "Continuo",
    },
  ],
  en: [
    {
      key: "website", icon: "layout-template", title: "Business website",
      summary: "A fast website you own, built to be found on Google.",
      includes: ["Up to 6 mobile-friendly pages", "Basic SEO and Google Business Profile", "Contact form, WhatsApp and analytics", "60-day warranty"],
      price: prices.website.from, unit: "from", time: "2 to 3 weeks",
    },
    {
      key: "store", icon: "shopping-bag", title: "Online store",
      summary: "Sell around the clock with payments, shipping and e-invoicing wired in.",
      includes: ["Catalog, cart and payments", "Uruguayan e-invoicing (CFE) integration", "Shipping and stock", "Training for your team"],
      price: prices.store.from, unit: "from", time: "4 to 6 weeks",
    },
    {
      key: "custom", icon: "workflow", title: "Custom systems",
      summary: "Booking, back-office tools, portals and integrations that replace spreadsheets.",
      includes: ["Discovery and specification", "Design, development and testing", "A demo every 2 weeks", "Manuals and full code hand-over"],
      price: prices.custom.from, unit: "from", time: "2 to 4 months",
    },
    {
      key: "support", icon: "shield-check", title: "Support and maintenance",
      summary: "Hosting, backups, updates and improvements for a fixed monthly fee.",
      includes: ["Hosting and TLS certificate", "Automatic backups", "Updates and monitoring", "Improvement hours by plan"],
      price: prices.support.basic, unit: "perMonth", time: "Ongoing",
    },
    {
      key: "hours", icon: "globe", title: "Developers for hire",
      summary: "Uruguayan developers in your time zone, by the hour or full time.",
      includes: ["Overlaps with US business hours", "Contracts and invoices in USD", "Clean repositories and process", "Scale up or down anytime"],
      price: prices.hours.rate, unit: "perHour", time: "Ongoing",
    },
  ],
};

export const process: Record<Lang, { title: string; text: string }[]> = {
  es: [
    { title: "Descubrimiento", text: "Una reunión para entender su negocio y escribir el alcance." },
    { title: "Propuesta", text: "Precio cerrado, cronograma y contrato. Anticipo del 50 %." },
    { title: "Diseño", text: "Maqueta del sitio o sistema para su aprobación." },
    { title: "Desarrollo", text: "Una demostración cada 2 semanas: usted ve el avance real." },
    { title: "Pruebas y entrega", text: "Pruebas, capacitación y puesta en producción." },
    { title: "Soporte", text: "Garantía de 60 días y planes mensuales si los necesita." },
  ],
  en: [
    { title: "Discovery", text: "One meeting to understand your business and write the scope." },
    { title: "Proposal", text: "Fixed price, timeline and contract. 50 % up front." },
    { title: "Design", text: "A mockup of the site or system for you to approve." },
    { title: "Development", text: "A demo every 2 weeks, so you see real progress." },
    { title: "Testing and launch", text: "Testing, training and going live." },
    { title: "Support", text: "A 60-day warranty and monthly plans if you need them." },
  ],
};

export const faq: Record<Lang, { q: string; a: string }[]> = {
  es: [
    { q: "¿Cuánto tarda un proyecto?", a: "Un sitio, de 2 a 3 semanas; una tienda, de 4 a 6; un sistema a medida, de 2 a 4 meses. La fecha queda escrita en la propuesta." },
    { q: "¿Cómo se paga?", a: "50 % al empezar y 50 % en la entrega. Los proyectos de más de USD 6.000 se pagan por hitos. Aceptamos transferencia, Mercado Pago y tarjeta." },
    { q: "¿Quién es dueño del código y del dominio?", a: "Usted. Al terminar le entregamos el código, los accesos y los manuales." },
    { q: "¿Qué pasa después de la entrega?", a: "Tiene 60 días de garantía. Después puede continuar con un plan de soporte mensual o sin él." },
    { q: "¿Trabajan con empresas de fuera de Uruguay?", a: "Sí. Facturamos en dólares y trabajamos en horario compatible con Estados Unidos." },
  ],
  en: [
    { q: "How long does a project take?", a: "A website takes 2 to 3 weeks, a store 4 to 6, a custom system 2 to 4 months. The date is written into the proposal." },
    { q: "How do payments work?", a: "50 % to start and 50 % on delivery. Projects over USD 6,000 are paid by milestones. We bill in USD." },
    { q: "Who owns the code?", a: "You do. At hand-over you get the code, every credential and the manuals." },
    { q: "What happens after launch?", a: "You get a 60-day warranty, then an optional monthly support plan." },
    { q: "Do you overlap with US hours?", a: "Yes. Uruguay is 1 to 2 hours ahead of US Eastern time, so most of the day overlaps." },
  ],
};
