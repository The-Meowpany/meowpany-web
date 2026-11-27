// Business details shown across the site. Fill in the WhatsApp number once the business line exists;
// while it is empty the WhatsApp buttons are hidden instead of pointing nowhere.
export const site = {
  name: "The Meowpany",
  // The company inbox until the meowpany.com domain and its mailboxes exist.
  email: "themeowpany@gmail.com",
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

export const whatsappLink = (text: string) =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "";
