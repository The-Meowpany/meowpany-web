// Business details shown across the site. Fill in the WhatsApp number once the business line exists;
// while it is empty the WhatsApp buttons are hidden instead of pointing nowhere.
export const site = {
  name: "The Meowpany",
  // The public contact address: an alias of the company Gmail (see inbox below).
  email: "themeowpany+contacto@gmail.com",
  whatsapp: "", // International format without "+" or spaces, e.g. "598991234567".
  linkedin: "https://www.linkedin.com/company/meowpany",
  city: "Montevideo, Uruguay",
};

// The site is static, so the forms rely on services that work straight from the browser. Every key
// here is public by design (each service ties it to the site's domain); none of them is a secret.
// While a value is empty, that feature falls back to email (see src/lib/leads.ts).
export const services = {
  // Web3Forms delivers form submissions to the company inbox (https://web3forms.com, free plan).
  web3formsKey: "",
  // Cal.com public booking link, e.g. "https://cal.com/meowpany/30min" (free plan).
  bookingUrl: "",
  // Google PageSpeed Insights API key (free), restricted to the site's domain. Without one Google
  // usually refuses with "quota exceeded", and the audit page offers email instead.
  pagespeedKey: "",
};

// When calls can be booked, in the team's time zone. The agenda shows these slots in the visitor's
// own time zone; a request is confirmed by email, since a static site cannot lock a slot.
export const availability = {
  timeZone: "America/Montevideo",
  days: [1, 2, 3, 4, 5], // Monday to Friday
  from: "10:00",
  until: "17:30", // last start, for calls that end at 18:00
  slotMinutes: 30,
  horizonDays: 21,
  noticeHours: 24,
  closed: ["2026-12-24", "2026-12-25", "2026-12-31", "2027-01-01", "2027-01-06"],
};

// One Gmail inbox, one alias per channel. Gmail delivers user+anything@gmail.com to user@gmail.com
// and keeps the full address in "To", so a filter per alias files each message under its own label
// (docs/es/email.md lists the aliases and the filters).
export const INBOX_USER = "themeowpany";
export type Mailbox = "contacto" | "cotizaciones" | "primeraversion" | "llamadas" | "estimaciones" | "auditorias" | "privacidad";
export const inbox = (mailbox: Mailbox) => `${INBOX_USER}+${mailbox}@gmail.com`;

export const whatsappLink = (text: string) =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "";
