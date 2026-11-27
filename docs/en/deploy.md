# Publishing the website

The site is plain static files published with GitHub Pages, which is free for public repositories.
`.github/workflows/pages.yml` builds and deploys it on every push to `master`.

## First time

1. Make the repository public (Pages on the Free plan only serves public repositories). Nothing in
   it is secret: the keys in `src/site.ts` are public by design.
2. In the repository settings, under **Pages**, set **Source** to **GitHub Actions**.
3. Push to `master`, or run the `pages` workflow by hand. The site appears at
   `https://the-meowpany.github.io/meowpany-web/`.
4. Fill in `src/site.ts`: the Web3Forms access key (free, tied to the company inbox) and a PageSpeed
   Insights API key restricted to the site's domain (free; audits need it), and optionally the
   Cal.com booking link.
5. Check it: run PageSpeed Insights on the home page (goal: 95 or more on mobile) and send a test
   request from the quote form.

## Custom domain

When `meowpany.com` is bought:

1. In **Pages**, set the custom domain to `meowpany.com` and turn on **Enforce HTTPS**.
2. At the DNS provider, add the `A` and `AAAA` records GitHub lists for apex domains, and a `CNAME`
   from `www` to `the-meowpany.github.io`. Verify the domain for the organization so nobody else can
   claim it.
3. Redirect `themeowpany.com` to `https://meowpany.com` at its registrar.
4. Turn on DNSSEC, and add SPF, DKIM and DMARC records for the email provider.

The workflow reads the address from the Pages settings, so links, canonical URLs and the sitemap move
to the new domain on the next deployment without code changes.

## What Pages cannot do

- **Response headers.** The Content-Security-Policy and referrer policy are set with `<meta>` tags in
  `src/layouts/Base.astro`. HSTS comes from GitHub. Framing protection (`frame-ancestors`) is not
  available.
- **Server code.** Forms, the audit, the estimator and bookings run in the browser against the
  services listed in [overview.md](overview.md). Core's public endpoints stay available for a later
  move to a host with a server.
