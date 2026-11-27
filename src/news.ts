// The news section: Markdown posts in src/news/<lang>/, newest first. Links inside posts are written
// root-relative (/agendar/) and get the site's base path in `html()`.
import type { Lang } from "./i18n";
import { withBase } from "./lib/url";

type Module = { frontmatter: { title: string; date: string | Date; summary: string; tag: string }; compiledContent?: () => string | Promise<string> };

const sources: Record<Lang, Record<string, Module>> = {
  es: import.meta.glob<Module>("./news/es/*.md", { eager: true }),
  en: import.meta.glob<Module>("./news/en/*.md", { eager: true }),
};

export type Post = { slug: string; title: string; date: Date; summary: string; tag: string; html: () => Promise<string> };

export function posts(lang: Lang): Post[] {
  return Object.entries(sources[lang])
    .map(([file, module]) => ({
      slug: file.split("/").pop()!.replace(/\.md$/, ""),
      title: module.frontmatter.title,
      date: new Date(module.frontmatter.date),
      summary: module.frontmatter.summary,
      tag: module.frontmatter.tag,
      html: async () => String((await module.compiledContent?.()) ?? "").replace(/href="\/(?!\/)/g, `href="${withBase("/")}`),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime() || a.title.localeCompare(b.title));
}

export const newsPath = (lang: Lang, slug?: string) =>
  withBase(`${lang === "es" ? "/novedades/" : "/en/news/"}${slug ? `${slug}/` : ""}`);

export const formatDate = (date: Date, lang: Lang) =>
  date.toLocaleDateString(lang === "es" ? "es-UY" : "en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
