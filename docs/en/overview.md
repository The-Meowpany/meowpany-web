# The Meowpany · website

The public website of The Meowpany: a static, bilingual (Spanish and English) site built with
[Astro](https://astro.build), published on GitHub Pages. It has no server of its own: the forms
talk to free services straight from the browser, and fall back to the visitor's email app when a
service is not configured or does not answer.

## Run it

```sh
npm ci --force       # see below; also switches to the WebAssembly compiler on CPUs without AVX2
npm run dev          # http://localhost:4321
npm run build        # static site in dist/
npm run preview      # serves dist/ in the background; `npx astro preview stop` stops it
```

`--force` is required: the WebAssembly compiler package declares `cpu: wasm32`, and npm refuses to
install it on x64 without it. It changes nothing else in this project (0 vulnerabilities, no peer
dependency conflicts), but a new peer conflict would also be silenced, so check `npm ls` after
adding a dependency.

`SITE_URL` and `BASE_PATH` set the public address for canonical links and the sitemap; the Pages
workflow fills them in. Without them the build assumes the domain root.

## Free tools

| Page | What the visitor gets | Backed by |
| --- | --- | --- |
| `/auditoria/`, `/en/audit/` | A real audit of their website with fixes ranked by impact | `src/lib/audit.ts`: Google PageSpeed Insights from the browser |
| `/estimar/`, `/en/estimate/` | A printable proposal sized with IFPUG function points | `src/lib/estimator.ts`, in the browser, calibrated like Core's |
| `/retorno/`, `/en/roi/` | What manual work costs them and the payback period | `src/lib/roi.ts`, in the browser |
| `/agendar/`, `/en/book/` | A 30-minute call, or the free first working version (`?for=prototype`) | Cal.com link, or a request through `src/lib/leads.ts` |

Every form delivers through `src/lib/leads.ts`: a `LeadSink` contract with a Web3Forms adapter and
an email fallback. Adding a provider means adding an adapter, not touching the forms.

`npm test` runs the unit tests in `src/lib/`.

## Where things live

| Path | What it holds |
| --- | --- |
| `src/i18n.ts` | Routes in both languages and shared interface text |
| `src/content.ts` | Every fact the site states, in both languages: services, process, guarantees, market figures with sources, tools, FAQ and the first-version offer. Figures come from the business plan (revision 99) |
| `src/pricing.ts` | List prices and the quote estimate. Change prices here only |
| `src/site.ts` | Email, WhatsApp number, LinkedIn and the public keys of the form, booking and audit services |
| `src/lib/` | Browser logic with unit tests. `leads.ts`, `audit.ts` and `estimator.ts` are the `web-leads`, `web-audit` and `estimator` modules of meowpany-engineering (0.1.0); change them there first |
| `src/styles/global.css` | The design system, built on the brand colours: hood pink #CA678E, charcoal #433F45, warm grey |
| `public/brand/` | The real brand assets from Core: the cat mark (SVG) and the wordmark (PNG, plus a light copy for dark backgrounds) |
| `src/views/` | Page layouts shared by the Spanish and English routes |
| `src/locales/es/` | Spanish pages, named in English after the page they mirror; their Spanish URLs come from `src/i18n.ts` |
| `src/pages/` | The Spanish home page and the English routes under `/en/` |
| `src/layouts/Base.astro` | Page shell, including the Content-Security-Policy (Pages cannot send headers) |

## Before going live

- Set the WhatsApp number in `src/site.ts`; while it is empty, WhatsApp buttons stay hidden.
- Create a free Web3Forms access key for the company inbox and set `services.web3formsKey` in
  `src/site.ts`. Until then the forms open the visitor's email app instead.
- Create a free PageSpeed Insights API key restricted to the site's domain and set
  `services.pagespeedKey`: without it Google usually refuses audits for lack of quota.
- Optional: a Cal.com booking link (`services.bookingUrl`).
- Register the contact database with the URCDP before publishing the form (Ley 18.331).

## Old CPUs

Astro's native compiler uses AVX instructions and crashes with "Illegal instruction" on CPUs without
them, such as the Celeron 2955U. `scripts/use-wasm-compiler.mjs` runs after every install and removes
the native binary on those machines, so Astro falls back to its WebAssembly compiler.

See [deploy.md](deploy.md) to publish it.
