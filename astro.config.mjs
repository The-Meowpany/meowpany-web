// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";
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
    sitemap({
      i18n: { defaultLocale: "es", locales: { es: "es-UY", en: "en" } },
    }),
  ],
});
