// Business details shown across the site. Fill in the WhatsApp number once the business line exists;
// while it is empty the WhatsApp buttons are hidden instead of pointing nowhere.
export const site = {
  name: "The Meowpany",
  email: "hola@meowpany.com",
  whatsapp: "", // International format without "+" or spaces, e.g. "598991234567".
  linkedin: "https://www.linkedin.com/company/meowpany",
  city: "Montevideo, Uruguay",
  // Core receives quote requests. A production build refuses to run without PUBLIC_CORE_URL (astro.config.mjs).
  coreUrl: import.meta.env.PUBLIC_CORE_URL ?? "http://127.0.0.1:8000",
};

export const whatsappLink = (text: string) =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "";
