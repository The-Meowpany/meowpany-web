// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// The production domain is set here so canonical URLs, hreflang links and the sitemap are absolute.
export default defineConfig({
  site: "https://meowpany.com",
  trailingSlash: "always",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: "es", locales: { es: "es-UY", en: "en" } },
    }),
  ],
});
