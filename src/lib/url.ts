// The site can live at a domain root (meowpany.com) or under a project path on GitHub Pages
// (the-meowpany.github.io/meowpany-web/). Internal links go through these helpers so both work.

const base = (): string => {
  const raw = import.meta.env?.BASE_URL ?? "/";
  return raw.endsWith("/") ? raw : `${raw}/`;
};

/** Prefixes a root-relative path ("/precios/") with the site's base path. */
export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${base()}${path.slice(1)}`;
}

/** Removes the base path from a pathname, so it can be compared with the route table. */
export function withoutBase(pathname: string): string {
  const prefix = base();
  return pathname.startsWith(prefix) ? `/${pathname.slice(prefix.length)}` : pathname;
}
