// Every fact the site states, in both languages, in one place. Figures come from the business plan
// (revision 99, 17 Nov 2026) and prices from pricing.ts, so a page can never contradict another.
import type { Lang } from "./i18n";
import { launch, prices } from "./pricing";

export type Service = {
  key: "website" | "store" | "custom" | "support" | "hours";
  icon: string;
  title: string;
  summary: string;
  forWho: string;
  includes: string[];
  notIncluded: string[];
  price: number;
  launchPrice?: number;
  unit: "from" | "perMonth" | "perHour" | "fixed";
  time: string;
};

export const services: Record<Lang, Service[]> = {
  es: [
    {
      key: "website", icon: "layout-template", title: "Sitio web institucional",
      summary: "Un sitio propio, rápido y fácil de encontrar en Google, que presenta su empresa y convierte visitas en consultas.",
      forWho: "Empresas que hoy dependen solo de redes sociales o tienen un sitio desactualizado.",
      includes: [
        `Hasta ${prices.website.includedPages} páginas, diseñadas primero para celulares`,
        "Textos ordenados y SEO básico: títulos, descripciones, mapa del sitio y datos estructurados",
        "Ficha de Google Business Profile",
        "Formulario de contacto, botón de WhatsApp y analítica",
        "Dominio y certificado HTTPS configurados",
        "Capacitación para editar los contenidos",
      ],
      notIncluded: [`Cada página adicional: USD ${prices.website.extraPage}`, "Redacción de textos largos y fotografía profesional", "El costo del dominio y del alojamiento, que se paga a cada proveedor"],
      price: prices.website.from, launchPrice: launch.website, unit: "fixed", time: "2 a 3 semanas",
    },
    {
      key: "store", icon: "shopping-bag", title: "Tienda en línea",
      summary: "Venta las 24 horas con pagos, envíos y facturación electrónica conectados, sin cargar cada venta a mano.",
      forWho: "Comercios que venden por WhatsApp o Instagram y quieren cobrar en línea.",
      includes: [
        `Catálogo de hasta ${prices.store.largeCatalogThreshold} productos, carrito y cuentas de clientes`,
        "Cobro con Mercado Pago y tarjetas",
        "Envíos, retiro en local y control de stock",
        "Integración con la facturación electrónica (CFE) de la DGI a través de su proveedor",
        "Avisos por correo de cada pedido",
        "Capacitación para su equipo",
      ],
      notIncluded: [`Catálogo de más de ${prices.store.largeCatalogThreshold} productos: + USD ${prices.store.largeCatalog}`, `Cada medio de pago adicional: + USD ${prices.store.extraPayment}`, "Las comisiones de las pasarelas de pago y del proveedor de facturación"],
      price: prices.store.from, launchPrice: launch.store, unit: "fixed", time: "4 a 6 semanas",
    },
    {
      key: "custom", icon: "workflow", title: "Software y aplicaciones a medida",
      summary: "Sistemas de gestión, turnos, portales de clientes, integraciones y automatizaciones que reemplazan planillas y papeles.",
      forWho: "Empresas con procesos que hoy viven en planillas, correos o sistemas que no se hablan entre sí.",
      includes: [
        "Relevamiento y especificación de requisitos con criterios de aceptación",
        "Estimación por puntos de función (norma IFPUG), con el detalle de cada función",
        "Diseño de pantallas, desarrollo y pruebas automatizadas",
        "Una demostración cada 2 semanas en un entorno de prueba",
        "Manuales, capacitación y traspaso del código y de los accesos",
      ],
      notIncluded: ["Licencias o servicios de terceros que el sistema use", "Cambios fuera del alcance aprobado, que se cotizan aparte"],
      price: prices.custom.from, unit: "from", time: "2 a 4 meses",
    },
    {
      key: "support", icon: "life-buoy", title: "Soporte y mantenimiento",
      summary: "Un equipo que responde con plazos por escrito, mantiene su sitio o sistema al día y le dedica horas de mejoras cada mes.",
      forWho: "Cualquier cliente que quiera seguir creciendo después de la entrega sin contratar a nadie.",
      includes: ["Tres planes, con plazo de respuesta y horas de mejoras definidos", "Actualizaciones de seguridad", "Registro de cada pedido y de las horas usadas"],
      notIncluded: [`Horas de mejoras por encima de las del plan: USD ${prices.hours.rate} por hora`],
      price: prices.support.basic, unit: "perMonth", time: "Mes a mes",
    },
    {
      key: "hours", icon: "globe", title: "Desarrolladores para el exterior",
      summary: "Desarrolladores uruguayos en un horario compatible con Estados Unidos, por hora o con dedicación completa.",
      forWho: "Equipos y agencias del exterior que necesitan sumar capacidad.",
      includes: ["Horario superpuesto con la costa este de EE. UU.", "Contratos y facturación en dólares", "Informe semanal de horas y de trabajo", "Dos semanas de prueba sin penalidad"],
      notIncluded: [],
      price: prices.hours.rate, launchPrice: launch.hourly, unit: "perHour", time: "Continuo",
    },
  ],
  en: [
    {
      key: "website", icon: "layout-template", title: "Business website",
      summary: "A fast website you own, easy to find on Google, that presents your business and turns visits into enquiries.",
      forWho: "Businesses that rely only on social media or have an outdated site.",
      includes: [
        `Up to ${prices.website.includedPages} pages, designed for phones first`,
        "Clear copy and basic SEO: titles, descriptions, sitemap and structured data",
        "Google Business Profile listing",
        "Contact form, WhatsApp button and analytics",
        "Domain and HTTPS certificate set up",
        "Training to edit the content",
      ],
      notIncluded: [`Each extra page: USD ${prices.website.extraPage}`, "Long-form copywriting and professional photography", "Domain and hosting fees, paid to each provider"],
      price: prices.website.from, launchPrice: launch.website, unit: "fixed", time: "2 to 3 weeks",
    },
    {
      key: "store", icon: "shopping-bag", title: "Online store",
      summary: "Sell around the clock with payments, shipping and e-invoicing connected, without entering each sale by hand.",
      forWho: "Shops that sell through WhatsApp or Instagram and want to take payments online.",
      includes: [
        `Catalog of up to ${prices.store.largeCatalogThreshold} products, cart and customer accounts`,
        "Payments with Mercado Pago and cards",
        "Shipping, pick-up and stock control",
        "Uruguayan e-invoicing (DGI CFE) through your provider",
        "Email notice of every order",
        "Training for your team",
      ],
      notIncluded: [`Catalogs over ${prices.store.largeCatalogThreshold} products: + USD ${prices.store.largeCatalog}`, `Each extra payment method: + USD ${prices.store.extraPayment}`, "Payment gateway and e-invoicing provider fees"],
      price: prices.store.from, launchPrice: launch.store, unit: "fixed", time: "4 to 6 weeks",
    },
    {
      key: "custom", icon: "workflow", title: "Custom software and apps",
      summary: "Back-office systems, booking, customer portals, integrations and automations that replace spreadsheets and paperwork.",
      forWho: "Businesses whose processes live in spreadsheets, email or systems that don't talk to each other.",
      includes: [
        "Requirements discovery and a written specification with acceptance criteria",
        "Function point estimate (IFPUG), itemized function by function",
        "Interface design, development and automated tests",
        "A demo every 2 weeks on a staging environment",
        "Manuals, training and hand-over of the code and every credential",
      ],
      notIncluded: ["Third-party licences or services the system uses", "Changes outside the approved scope, quoted separately"],
      price: prices.custom.from, unit: "from", time: "2 to 4 months",
    },
    {
      key: "support", icon: "life-buoy", title: "Support and maintenance",
      summary: "A team that replies within written response times, keeps your site or system up to date and spends improvement hours on it every month.",
      forWho: "Any client who wants to keep growing after launch without hiring.",
      includes: ["Three plans with set response times and improvement hours", "Security updates", "A record of every request and the hours used"],
      notIncluded: [`Improvement hours beyond the plan: USD ${prices.hours.rate} an hour`],
      price: prices.support.basic, unit: "perMonth", time: "Month to month",
    },
    {
      key: "hours", icon: "globe", title: "Developers for hire",
      summary: "Uruguayan developers whose working day overlaps with yours, by the hour or full time.",
      forWho: "Teams and agencies abroad that need more capacity.",
      includes: ["Overlap with US Eastern business hours", "Contracts and invoices in USD", "Weekly report of hours and work", "A two-week trial with no penalty"],
      notIncluded: [],
      price: prices.hours.rate, launchPrice: launch.hourly, unit: "perHour", time: "Ongoing",
    },
  ],
};

/** The project steps, with the durations the plan commits to. */
export const process: Record<Lang, { title: string; time: string; text: string }[]> = {
  es: [
    { title: "Llamada inicial", time: "30 minutos", text: "Entendemos el problema, quién va a usar la solución y qué tiene que hacer la primera versión. Le enviamos ese alcance por escrito." },
    { title: "Primera versión", time: "72 horas", text: "Una versión funcional, sin costo, que prueba con un enlace privado. Si no lo convence, termina ahí." },
    { title: "Propuesta", time: "2 días", text: "Si decide avanzar: especificación, precio cerrado, cronograma y contrato. Se paga el 50 % para continuar." },
    { title: "Diseño", time: "1 a 2 semanas", text: "Pantallas y recorridos para su aprobación antes de construir el resto." },
    { title: "Desarrollo", time: "2 a 8 semanas", text: "Ciclos de 2 semanas, cada uno con una demostración y un informe de avance." },
    { title: "Pruebas y entrega", time: "1 semana", text: "Pruebas, capacitación, puesta en producción y el 50 % restante. Empiezan los 60 días de garantía." },
  ],
  en: [
    { title: "First call", time: "30 minutes", text: "We understand the problem, who will use the solution and what the first version must do. You get that scope in writing." },
    { title: "First version", time: "72 hours", text: "A working version, free of charge, that you try through a private link. If it doesn't convince you, that's the end of it." },
    { title: "Proposal", time: "2 days", text: "If you go ahead: specification, fixed price, timeline and contract. You pay 50 % to continue." },
    { title: "Design", time: "1 to 2 weeks", text: "Screens and flows for your approval before the rest is built." },
    { title: "Development", time: "2 to 8 weeks", text: "Two-week cycles, each with a demo and a progress report." },
    { title: "Testing and launch", time: "1 week", text: "Testing, training, go-live and the remaining 50 %. The 60-day warranty starts." },
  ],
};

/** What every client gets, whatever the service. */
export const commitments: Record<Lang, { icon: string; title: string; text: string }[]> = {
  es: [
    { icon: "file-check", title: "Alcance por escrito", text: "Antes de cada etapa sabe exactamente qué se construye, con criterios para darlo por terminado." },
    { icon: "badge-dollar-sign", title: "Precio cerrado", text: "El precio de la propuesta no cambia, salvo que usted pida algo fuera del alcance aprobado." },
    { icon: "presentation", title: "Avance que se puede ver", text: "Una demostración cada 2 semanas y un informe semanal con horas, tareas cumplidas y próximas." },
    { icon: "flask-conical", title: "Pruebas documentadas", text: "Cada requisito tiene sus pruebas; recibe un informe de lo probado en cada entrega." },
    { icon: "shield-check", title: "Garantía de 60 días", text: "Corregimos sin costo los errores de lo entregado durante 60 días desde la puesta en producción." },
    { icon: "key-round", title: "Todo es suyo", text: "Al terminar le entregamos el código, los accesos, los manuales y la documentación." },
  ],
  en: [
    { icon: "file-check", title: "Scope in writing", text: "Before each stage you know exactly what gets built, with criteria to call it done." },
    { icon: "badge-dollar-sign", title: "Fixed price", text: "The proposal price doesn't change unless you ask for something outside the approved scope." },
    { icon: "presentation", title: "Progress you can see", text: "A demo every 2 weeks and a weekly report with hours, finished and upcoming work." },
    { icon: "flask-conical", title: "Documented testing", text: "Every requirement has its tests; each delivery comes with a report of what was tested." },
    { icon: "shield-check", title: "60-day warranty", text: "We fix defects in what we delivered at no cost for 60 days after go-live." },
    { icon: "key-round", title: "You own everything", text: "At the end you get the code, every credential, the manuals and the documentation." },
  ],
};

/** Public figures behind the offer, each with its source (business plan, section 2). */
export const facts: Record<Lang, { value: string; text: string; source: string; url: string }[]> = {
  es: [
    { value: "33,8 %", text: "de las pequeñas empresas uruguayas tiene sitio web propio.", source: "ANDE, encuestas a micro y pequeñas empresas 2023", url: "https://ande.org.uy/images/2025/Encuestas_a_Micro_y_Pequenas_Empresas_2023.pdf" },
    { value: "53,8 %", text: "de 1.311 pymes evaluadas tiene una intensidad digital baja.", source: "ANDE, Chequeo Digital", url: "https://ande.org.uy/reflexiones-para-el-desarrollo/item/digitalizacion-mipymes-y-por-que-la-politica-publica-importa.html?category_id=225" },
    { value: "+32 %", text: "creció el comercio electrónico en Uruguay en 2025, hasta unos USD 2.550 millones.", source: "CEDU y Exante", url: "https://www.ambito.com/uruguay/el-comercio-electronico-supero-los-100000-millones-ventas-2025-y-crecio-32-el-ano-n6306222" },
    { value: "7 de 10", text: "adultos en Uruguay compran por internet.", source: "Factum, Consumo Digital 2026", url: "https://www.elobservador.com.uy/ciencia-y-tecnologia/comercio-electronico/el-valor-del-comercio-electronico-uruguay-se-acerca-los-us-3000-millones-y-el-efecto-temu-es-apenas-una-fraccion-n6052553" },
  ],
  en: [
    { value: "33.8%", text: "of small businesses in Uruguay have a website of their own.", source: "ANDE, micro and small business surveys 2023", url: "https://ande.org.uy/images/2025/Encuestas_a_Micro_y_Pequenas_Empresas_2023.pdf" },
    { value: "53.8%", text: "of 1,311 assessed small businesses have low digital intensity.", source: "ANDE, Chequeo Digital", url: "https://ande.org.uy/reflexiones-para-el-desarrollo/item/digitalizacion-mipymes-y-por-que-la-politica-publica-importa.html?category_id=225" },
    { value: "+32%", text: "growth of e-commerce in Uruguay in 2025, to about USD 2.55 billion.", source: "CEDU and Exante", url: "https://www.ambito.com/uruguay/el-comercio-electronico-supero-los-100000-millones-ventas-2025-y-crecio-32-el-ano-n6306222" },
    { value: "7 in 10", text: "adults in Uruguay shop online.", source: "Factum, Consumo Digital 2026", url: "https://www.elobservador.com.uy/ciencia-y-tecnologia/comercio-electronico/el-valor-del-comercio-electronico-uruguay-se-acerca-los-us-3000-millones-y-el-efecto-temu-es-apenas-una-fraccion-n6052553" },
  ],
};

/** The four free tools, each one giving a concrete result before any sale. */
export const tools: Record<Lang, { key: "audit" | "estimate" | "roi" | "book"; icon: string; title: string; text: string }[]> = {
  es: [
    { key: "audit", icon: "gauge", title: "Auditoría web", text: "Velocidad, accesibilidad, buenas prácticas y SEO de su sitio en celulares, con las correcciones ordenadas por impacto." },
    { key: "estimate", icon: "calculator", title: "Estimador de proyectos", text: "Describa su sistema y reciba una propuesta imprimible con alcance, horas, plazo y rango de precio." },
    { key: "roi", icon: "trending-up", title: "Calculadora de retorno", text: "Cuánto le cuesta por mes el trabajo manual y en cuántos meses se paga el proyecto." },
    { key: "book", icon: "calendar-check", title: "Llamada de 30 minutos", text: "Hable de su idea con quien la va a construir, sin compromiso." },
  ],
  en: [
    { key: "audit", icon: "gauge", title: "Website audit", text: "Speed, accessibility, best practices and SEO of your site on phones, with fixes ranked by impact." },
    { key: "estimate", icon: "calculator", title: "Project estimator", text: "Describe your system and get a printable proposal with scope, hours, timeline and price range." },
    { key: "roi", icon: "trending-up", title: "Return calculator", text: "What manual work costs you every month and how many months the project takes to pay for itself." },
    { key: "book", icon: "calendar-check", title: "30-minute call", text: "Talk about your idea with the people who will build it, no strings attached." },
  ],
};

export const faq: Record<Lang, { q: string; a: string }[]> = {
  es: [
    { q: "¿Cuánto tarda un proyecto?", a: "La primera versión, 72 horas desde que acordamos su alcance. Después: un sitio, de 2 a 3 semanas; una tienda, de 4 a 6; un sistema a medida, de 2 a 4 meses. La fecha queda escrita en la propuesta." },
    { q: "¿Cómo se paga?", a: "Nada antes de ver la primera versión funcionando. Si decide avanzar, 50 % al continuar y 50 % en la entrega; los proyectos de más de USD 6.000 se pagan por hitos. Aceptamos transferencia, Mercado Pago y tarjeta, también en 3 cuotas. Los precios son en dólares; los clientes de Uruguay suman IVA (22 %)." },
    { q: "¿Qué es el precio de lanzamiento?", a: `Los primeros 5 clientes pagan USD ${launch.website} por un sitio (en lugar de USD ${prices.website.from}) y USD ${launch.store} por una tienda (en lugar de USD ${prices.store.from}), y tienen el primer mes de soporte gratis, a cambio de que publiquemos el caso y un testimonio.` },
    { q: "¿Quién es dueño del código y del dominio?", a: "Usted. El dominio se registra a su nombre y, al terminar, le entregamos el código, los accesos y los manuales." },
    { q: "¿Qué cubre la garantía?", a: "Durante 60 días desde la puesta en producción corregimos sin costo cualquier error de lo entregado, es decir, lo que no funciona como dice el alcance aprobado. Los cambios o funciones nuevas se cotizan aparte o se cubren con un plan de soporte." },
    { q: "¿Qué pasa después de la entrega?", a: "Puede seguir con un plan de soporte mensual, sin permanencia mínima, o sin él. Si no contrata soporte, el sistema sigue siendo suyo y puede mantenerlo quien usted elija." },
    { q: "¿Trabajan con empresas de fuera de Uruguay?", a: "Sí. Trabajamos en forma remota, facturamos en dólares y nuestro horario se superpone con el de la costa este de Estados Unidos." },
  ],
  en: [
    { q: "How long does a project take?", a: "The first version, 72 hours from agreeing on its scope. Then a website takes 2 to 3 weeks, a store 4 to 6, a custom system 2 to 4 months. The date is written into the proposal." },
    { q: "How do payments work?", a: "Nothing before you see the first version working. If you go ahead, 50 % to continue and 50 % on delivery; projects over USD 6,000 are paid by milestones. We bill in US dollars." },
    { q: "Who owns the code?", a: "You do. At hand-over you get the code, every credential and the manuals." },
    { q: "What does the warranty cover?", a: "For 60 days after go-live we fix, at no cost, anything delivered that doesn't work as the approved scope says. Changes and new features are quoted separately or covered by a support plan." },
    { q: "What happens after launch?", a: "You can continue with a monthly support plan, with no minimum term, or without one. Either way the system is yours." },
    { q: "How much do your working hours overlap with mine?", a: "Uruguay is 1 to 2 hours ahead of US Eastern time, so most of the working day overlaps." },
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
      { q: "¿Cómo funciona la propuesta?", a: "Desarrollamos una primera versión funcional de su sitio, aplicación o sistema para que la vea y la pruebe antes de decidir si quiere avanzar. Usted no paga nada hasta entonces." },
      { q: "¿En cuánto tiempo puedo ver la primera versión?", a: "En 72 horas desde que acordamos por escrito, después de la llamada, qué va a incluir." },
      { q: "¿Qué tipo de proyectos desarrollan?", a: "Sitios web, tiendas en línea, aplicaciones web y móviles, sistemas de gestión, portales para clientes, automatizaciones e integraciones entre sistemas. Si su idea es muy grande, la primera versión cubre la parte más importante." },
      { q: "¿Qué incluye la primera versión y qué no?", a: "Incluye las funciones principales acordadas, funcionando con datos de ejemplo y accesible con un enlace privado. Todavía no incluye la carga de sus datos reales, la publicación en tiendas de aplicaciones ni servicios de terceros con costo." },
      { q: "¿Tengo que pagar antes de verla funcionando?", a: "No. Ni anticipo ni tarjeta. Si no lo convence, no sigue y no nos debe nada. Hacemos una primera versión por cliente y proyecto." },
      { q: "¿Qué pasa con mi idea si no seguimos?", a: "Es suya y es confidencial: no la usamos ni la compartimos. Si lo pide, borramos la versión y sus datos." },
    ],
    en: [
      { q: "How does the offer work?", a: "We build a first working version of your website, app or system so you can see it and try it before deciding whether to go ahead. You pay nothing until then." },
      { q: "How soon can I see the first version?", a: "Within 72 hours of agreeing in writing, after the call, on what it will include." },
      { q: "What kind of projects do you build?", a: "Websites, online stores, web and mobile apps, back-office systems, customer portals, automations and integrations. If your idea is big, the first version covers its most important part." },
      { q: "What does the first version include, and what not?", a: "The main agreed features, working with sample data and reachable through a private link. It doesn't yet include loading your real data, publishing to app stores or paid third-party services." },
      { q: "Do I have to pay before seeing it work?", a: "No. No deposit, no card. If it doesn't convince you, you stop there and owe us nothing. We build one first version per client and project." },
      { q: "What happens to my idea if we don't continue?", a: "It's yours and it stays confidential: we don't use it or share it. If you ask, we delete the version and your data." },
    ],
  },
} as const;
