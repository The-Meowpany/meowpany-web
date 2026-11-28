# Publishing the website

The site is plain static files published with GitHub Pages, which is free for public repositories.
`.github/workflows/pages.yml` builds and deploys it on every push to `master`.

## First time

1. Make the repository public (Pages on the Free plan only serves public repositories). Nothing in
   it is secret: the keys in `src/site.ts` are public by design.
2. In the repository settings, under **Pages**, set **Source** to **GitHub Actions**.
3. Push to `master`, or run the `pages` workflow by hand. The site appears at
   `https://meowpany.us.ci/`. The GitHub Pages address
   (`https://the-meowpany.github.io/meowpany-web/`) redirects to the custom domain.
4. Fill in `src/site.ts`: the Web3Forms access key (free, tied to the company inbox) and a PageSpeed
   Insights API key restricted to the site's domain (free; audits need it), and optionally the
   Cal.com booking link.
5. Check it: run PageSpeed Insights on the home page (goal: 95 or more on mobile) and send a test
   request from the quote form.

## Custom domain

The site is published at `https://meowpany.us.ci/`, at the root of the domain. DNS points
`meowpany.us.ci` to `the-meowpany.github.io` with a `CNAME`, and GitHub Pages serves the site there.

The workflow builds with `BASE_PATH="/"` and takes `SITE_URL` from the repository variable `SITE_URL`
(or from `https://meowpany.us.ci` when it is not set). It never uses the repository name as the base
path: on a custom domain that path does not exist, and the CSS, images and internal links return 404.

To move to another domain:

1. In **Pages**, set the new domain and turn on **Enforce HTTPS**.
2. Point the domain at GitHub Pages at its DNS provider. Verify the domain for the organization so
   nobody else can claim it.
3. Update the repository variable `SITE_URL`.
4. Redirect the old domain at its registrar.
5. Turn on DNSSEC, and add SPF, DKIM and DMARC records for the email provider.

`public/meowpany-web/index.html` keeps the old GitHub Pages address alive and redirects it to the
custom domain root.

## What Pages cannot do

- **Response headers.** The Content-Security-Policy and referrer policy are set with `<meta>` tags in
  `src/layouts/Base.astro`. HSTS comes from GitHub. Framing protection (`frame-ancestors`) is not
  available.
- **Server code.** Forms, the audit, the estimator and bookings run in the browser against the
  services listed in [overview.md](overview.md). Core's public endpoints stay available for a later
  move to a host with a server.
