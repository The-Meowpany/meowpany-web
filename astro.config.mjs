// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { routes } from "./src/i18n.ts";

// Spanish pages keep their Spanish URLs (/agendar/) while their files are named in English, after the
// English page they mirror (src/locales/es/book.astro). Each URL comes from the route table in
// src/i18n.ts, the single source of truth for both languages, and a page without a route fails the build.
const localizedRoutes = {
  name: "localized-routes",
  hooks: {
    "astro:config:setup": ({ injectRoute }) => {
      const dir = fileURLToPath(new URL("./src/locales/es", import.meta.url));
      const files = new Set(readdirSync(dir).filter((f) => f.endsWith(".astro")));
      for (const { es, en } of Object.values(routes)) {
        if (!/^\/[a-z-]+\/$/.test(es)) continue; // the home page and in-page anchors have no file of their own
        const file = `${en.split("/").filter(Boolean).pop()}.astro`;
        if (!files.delete(file)) throw new Error(`No Spanish page src/locales/es/${file} for the route ${es}`);
        injectRoute({ pattern: es.slice(0, -1), entrypoint: `./src/locales/es/${file}` });
      }
      if (files.size) throw new Error(`Spanish pages without a route in src/i18n.ts: ${[...files].join(", ")}`);
    },
  },
};

// Canonical URLs, hreflang links and the sitemap need the public address. The site is served from
// the root of its custom domain, so assets and internal links are always root-relative. The Pages
// workflow passes SITE_URL and BASE_PATH; both default to the production address here so a local
// build produces the same paths as the deployed site.
export default defineConfig({
  site: process.env.SITE_URL || "https://meowpany.us.ci",
  base: process.env.BASE_PATH || "/",
  trailingSlash: "always",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    localizedRoutes,
    sitemap({
      i18n: { defaultLocale: "es", locales: { es: "es-UY", en: "en" } },
    }),
  ],
});
