# The Meowpany · website

The public website of The Meowpany: a static, bilingual (Spanish and English) site built with
[Astro](https://astro.build). Every page leads to the quote form, which sends requests to
[Core](../meowpany-core), the company's internal app.

## Run it

```sh
npm install          # also switches to Astro's WebAssembly compiler on CPUs without AVX2
npm run dev          # http://localhost:4321
npm run build        # static site in dist/
npm run preview      # serves dist/ in the background; `npx astro preview stop` stops it
```

Run Core at the same time (`http://127.0.0.1:8000`) to test the quote form end to end.

## Free tools

| Page | What the visitor gets | Backed by |
| --- | --- | --- |
| `/auditoria/`, `/en/audit/` | A real audit of their website with fixes ranked by impact | Core `POST /public/audits/` |
| `/estimar/`, `/en/estimate/` | A printable proposal sized with IFPUG function points | Core `POST /public/estimates/` |
| `/retorno/`, `/en/roi/` | What manual work costs them and the payback period | `src/lib/roi.ts`, in the browser |
| `/agendar/`, `/en/book/` | A 30-minute call in a free slot, with a calendar invitation | Core slots and bookings |

`npm test` runs the unit tests in `src/lib/`.

## Where things live

| Path | What it holds |
| --- | --- |
| `src/i18n.ts` | Routes in both languages and shared interface text |
| `src/content.ts` | Services, process steps and FAQ in both languages |
| `src/pricing.ts` | List prices and the quote estimate. Change prices here only |
| `src/site.ts` | Email, WhatsApp number, LinkedIn and Core's URL |
| `src/views/` | Page layouts shared by the Spanish and English routes |
| `src/pages/` | Spanish routes at the root, English routes under `/en/` |
| `public/_headers` | Security headers for Cloudflare Pages or Netlify |

## Before going live

- Set the WhatsApp number in `src/site.ts`; while it is empty, WhatsApp buttons stay hidden.
- Build with `PUBLIC_CORE_URL=https://core.meowpany.com npm run build`, and add that origin to
  `connect-src` in `public/_headers`.
- Register the contact database with the URCDP before publishing the form (Ley 18.331).

## Old CPUs

Astro's native compiler uses AVX instructions and crashes with "Illegal instruction" on CPUs without
them, such as the Celeron 2955U. `scripts/use-wasm-compiler.mjs` runs after every install and removes
the native binary on those machines, so Astro falls back to its WebAssembly compiler.

See [DEPLOY.md](DEPLOY.md) to publish it.
