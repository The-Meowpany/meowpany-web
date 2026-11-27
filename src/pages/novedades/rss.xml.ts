import type { APIRoute } from "astro";
import { posts } from "../../news";
import { withBase } from "../../lib/url";

const escape = (text: string) => text.replace(/[<>&"']/g, (c) => `&#${c.charCodeAt(0)};`);

export const GET: APIRoute = ({ site }) => {
  const link = (path: string) => new URL(withBase(path), site).toString();
  const items = posts("es").map((post) => `<item><title>${escape(post.title)}</title><link>${link(`/novedades/${post.slug}/`)}</link><guid>${link(`/novedades/${post.slug}/`)}</guid><pubDate>${post.date.toUTCString()}</pubDate><description>${escape(post.summary)}</description></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>The Meowpany · Novedades</title><link>${link("/novedades/")}</link><description>Lanzamientos, método de trabajo y guías para pymes.</description><language>es-UY</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
