import type { APIRoute } from "astro";
import { posts } from "../../../news";
import { withBase } from "../../../lib/url";

const escape = (text: string) => text.replace(/[<>&"']/g, (c) => `&#${c.charCodeAt(0)};`);

export const GET: APIRoute = ({ site }) => {
  const link = (path: string) => new URL(withBase(path), site).toString();
  const items = posts("en").map((post) => `<item><title>${escape(post.title)}</title><link>${link(`/en/news/${post.slug}/`)}</link><guid>${link(`/en/news/${post.slug}/`)}</guid><pubDate>${post.date.toUTCString()}</pubDate><description>${escape(post.summary)}</description></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>The Meowpany · News</title><link>${link("/en/news/")}</link><description>Launches, how we work and practical guides.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
