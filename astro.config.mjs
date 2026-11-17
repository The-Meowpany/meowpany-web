// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readFileSync, readdirSync } from "node:fs";
import { routes } from "./src/i18n.ts";
import { loadEnv } from "vite";

// A production build without Core's address would ship forms that post to the builder's laptop.
// `npm run build` therefore fails unless PUBLIC_CORE_URL is an https URL allowed by the CSP in
// public/_headers; `npm run build:local` (MEOWPANY_LOCAL_BUILD=1) is the explicit exception.
const requireCoreUrl = {
  name: "require-core-url",
  hooks: {
    "astro:config:setup": ({ command }) => {
      if (command !== "build" || process.env.MEOWPANY_LOCAL_BUILD === "1") return;
      const { PUBLIC_CORE_URL: url } = loadEnv("production", process.cwd(), "PUBLIC_");
      if (!url || !url.startsWith("https://")) {
        throw new Error("PUBLIC_CORE_URL must be set to Core's https address for a production build " +
          "(use `npm run build:local` to build against a local Core).");
      }
      const origin = new URL(url).origin;
      if (!readFileSync("public/_headers", "utf8").includes(origin)) {
        throw new Error(`public/_headers connect-src does not allow ${origin}; the forms would be blocked.`);
      }
    },
  },
};

// Spanish pages keep their Spanish URLs (/agendar/) while their files are named in English, after the
// English page they mirror (src/locales/es/book.astro). Each URL comes from the route table in
// src/i18n.ts, the single source of truth for both languages, and a page without a route fails the build.
const localizedRoutes = {
  name: "localized-routes",
  hooks: {
    "astro:config:setup": ({ injectRoute }) => {
      const files = new Set(readdirSync("src/locales/es").filter((f) => f.endsWith(".astro")));
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
    requireCoreUrl,
    localizedRoutes,
    sitemap({
      i18n: { defaultLocale: "es", locales: { es: "es-UY", en: "en" } },
    }),
  ],
});
