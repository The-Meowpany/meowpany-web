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
    { title: "Llamada", text: "30 minutos para entender su negocio y acordar por escrito qué incluye la primera versión." },
    { title: "Primera versión en 72 horas", text: "La prueba funcionando antes de pagar nada. Si no lo convence, termina ahí." },
    { title: "Propuesta", text: "Si decide avanzar: precio cerrado, cronograma y contrato. 50 % al continuar." },
    { title: "Desarrollo", text: "Una demostración cada 2 semanas: usted ve el avance real." },
    { title: "Pruebas y entrega", text: "Pruebas, capacitación y puesta en producción." },
    { title: "Soporte", text: "Garantía de 60 días y planes mensuales si los necesita." },
  ],
  en: [
    { title: "Call", text: "30 minutes to understand your business and agree in writing on what the first version includes." },
    { title: "First version in 72 hours", text: "You try it working before paying anything. If it doesn't convince you, that's the end of it." },
    { title: "Proposal", text: "If you go ahead: fixed price, timeline and contract. 50 % to continue." },
    { title: "Development", text: "A demo every 2 weeks, so you see real progress." },
    { title: "Testing and launch", text: "Testing, training and going live." },
    { title: "Support", text: "A 60-day warranty and monthly plans if you need them." },
  ],
};

export const faq: Record<Lang, { q: string; a: string }[]> = {
  es: [
    { q: "¿Cuánto tarda un proyecto?", a: "Un sitio, de 2 a 3 semanas; una tienda, de 4 a 6; un sistema a medida, de 2 a 4 meses. La fecha queda escrita en la propuesta." },
    { q: "¿Cómo se paga?", a: "Nada antes de ver la primera versión funcionando. Si decide avanzar, 50 % al continuar y 50 % en la entrega; los proyectos de más de USD 6.000 se pagan por hitos. Aceptamos transferencia, Mercado Pago y tarjeta." },
    { q: "¿Quién es dueño del código y del dominio?", a: "Usted. Al terminar le entregamos el código, los accesos y los manuales." },
    { q: "¿Qué pasa después de la entrega?", a: "Tiene 60 días de garantía. Después puede continuar con un plan de soporte mensual o sin él." },
    { q: "¿Trabajan con empresas de fuera de Uruguay?", a: "Sí. Facturamos en dólares y trabajamos en horario compatible con Estados Unidos." },
  ],
  en: [
    { q: "How long does a project take?", a: "A website takes 2 to 3 weeks, a store 4 to 6, a custom system 2 to 4 months. The date is written into the proposal." },
    { q: "How do payments work?", a: "Nothing before you see the first version working. If you go ahead, 50 % to continue and 50 % on delivery; projects over USD 6,000 are paid by milestones. We bill in USD." },
    { q: "Who owns the code?", a: "You do. At hand-over you get the code, every credential and the manuals." },
    { q: "What happens after launch?", a: "You get a 60-day warranty, then an optional monthly support plan." },
    { q: "Do you overlap with US hours?", a: "Yes. Uruguay is 1 to 2 hours ahead of US Eastern time, so most of the day overlaps." },
  ],
};

// "See it working before you pay": a first working version in 72 hours, with no payment up front.
export const firstVersion = {
  hours: 72,
  steps: {
    es: [
      { icon: "phone-call", title: "Una llamada de 30 minutos", text: "Nos cuenta su idea, quién la va a usar y qué problema resuelve. Al cortar, le enviamos por escrito qué va a incluir la primera versión." },
      { icon: "rocket", title: "Su primera versión en 72 horas", text: "Una versión que funciona de verdad, no una maqueta: la abre con un enlace privado en su celular o computadora y la prueba con su equipo." },
      { icon: "circle-check-big", title: "Usted decide", text: "Si le convence, le pasamos un precio cerrado y seguimos. Si no, termina ahí: no paga nada y no le insistimos." },
    ],
    en: [
      { icon: "phone-call", title: "A 30-minute call", text: "You tell us the idea, who will use it and what problem it solves. Right after, we send you in writing what the first version will include." },
      { icon: "rocket", title: "Your first version in 72 hours", text: "A version that actually works, not a mockup: open it with a private link on your phone or computer and try it with your team." },
      { icon: "circle-check-big", title: "You decide", text: "If it convinces you, we send a fixed price and carry on. If not, that's the end of it: you pay nothing and we won't chase you." },
    ],
  },
  promises: {
    es: [
      ["file-check", "Sabe qué va a ver antes de empezar: el alcance queda por escrito."],
      ["smartphone", "La prueba usted, con un enlace privado, no solo en una pantalla compartida."],
      ["wallet", "Sin anticipo, sin tarjeta y sin contrato para la primera versión."],
      ["layers", "Si avanza, nada se tira: la primera versión es la base del proyecto."],
      ["lock", "Su idea es confidencial. Firmamos un acuerdo de confidencialidad si lo pide."],
      ["code-xml", "Al terminar el proyecto, el código y los accesos son suyos."],
    ],
    en: [
      ["file-check", "You know what you'll see before we start: the scope is in writing."],
      ["smartphone", "You try it yourself with a private link, not just on a shared screen."],
      ["wallet", "No deposit, no card and no contract for the first version."],
      ["layers", "If you go ahead, nothing is thrown away: the first version is the base of the project."],
      ["lock", "Your idea stays confidential. We sign an NDA if you ask."],
      ["code-xml", "When the project is done, you own the code and every credential."],
    ],
  },
  faq: {
    es: [
      { q: "¿Cómo funciona la propuesta?", a: "Desarrollamos una primera versión funcional de su App o Software para que la vea y la pruebe antes de decidir si quiere avanzar. Usted no paga nada hasta entonces." },
      { q: "¿En cuánto tiempo puedo ver mi App o Software?", a: "En 72 horas desde que acordamos por escrito, después de la llamada, qué va a incluir la primera versión." },
      { q: "¿Qué tipo de proyectos desarrollan?", a: "Aplicaciones web y móviles, sistemas de gestión, portales para clientes, tiendas, automatizaciones e integraciones entre sistemas. Si su idea es muy grande, la primera versión cubre la parte más importante." },
      { q: "¿Qué pasa en la llamada?", a: "Hablamos de su idea, del problema que quiere resolver, de quién la va a usar y de qué tiene que hacer la primera versión. Con eso le enviamos el alcance por escrito." },
      { q: "¿Qué incluye la primera versión y qué no?", a: "Incluye las funciones principales acordadas, funcionando con datos de ejemplo y accesible con un enlace privado. Todavía no incluye la carga de sus datos reales, la publicación en tiendas de aplicaciones ni servicios de terceros con costo." },
      { q: "¿Tengo que pagar antes de verla funcionando?", a: "No. Ni anticipo ni tarjeta. Si no lo convence, no sigue con el desarrollo y no nos debe nada." },
      { q: "¿Y si después de verla quiero avanzar?", a: "Le enviamos un precio cerrado y un cronograma. Se paga 50 % al continuar y 50 % en la entrega, y lo ya construido es la base del proyecto." },
      { q: "¿Qué pasa con mi idea si no seguimos?", a: "Es suya y es confidencial: no la usamos ni la compartimos. Si lo pide, borramos la versión y sus datos." },
    ],
    en: [
      { q: "How does the offer work?", a: "We build a first working version of your app or software so you can see it and try it before deciding whether to go ahead. You pay nothing until then." },
      { q: "How soon can I see my app or software?", a: "Within 72 hours of agreeing in writing, after the call, on what the first version will include." },
      { q: "What kind of projects do you build?", a: "Web and mobile apps, back-office systems, customer portals, stores, automations and integrations between systems. If your idea is big, the first version covers its most important part." },
      { q: "What happens on the call?", a: "We talk about your idea, the problem you want to solve, who will use it and what the first version must do. Then we send you the scope in writing." },
      { q: "What does the first version include, and what not?", a: "The main agreed features, working with sample data and reachable through a private link. It doesn't yet include loading your real data, publishing to app stores or paid third-party services." },
      { q: "Do I have to pay before seeing it work?", a: "No. No deposit, no card. If it doesn't convince you, you stop there and owe us nothing." },
      { q: "What if I want to go ahead after seeing it?", a: "We send you a fixed price and a timeline. You pay 50 % to continue and 50 % on delivery, and what's already built becomes the base of the project." },
      { q: "What happens to my idea if we don't continue?", a: "It's yours and it stays confidential: we don't use it or share it. If you ask, we delete the version and your data." },
    ],
  },
} as const;
