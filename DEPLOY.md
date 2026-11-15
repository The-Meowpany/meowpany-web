# Publishing the website

The site is plain static files, so any static host works. These steps use Cloudflare Pages, which
reads `public/_headers` and has a free plan.

1. Buy the domains `meowpany.com` and `themeowpany.com` (and the `.uy` ones if they are free).
2. Push this repository to a private GitHub repository.
3. In Cloudflare Pages, create a project from that repository:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variable: `PUBLIC_CORE_URL=https://core.meowpany.com`
4. Add `meowpany.com` as a custom domain. HTTPS is issued automatically.
5. Redirect `themeowpany.com` and `www.meowpany.com` to `https://meowpany.com`.
6. Turn on DNSSEC, and add SPF, DKIM and DMARC records for the email provider.
7. Check it: run PageSpeed Insights on the home page (goal: 95 or more on mobile) and send a test quote.

The build host has a modern CPU, so it uses Astro's native compiler. The WebAssembly fallback only
kicks in on machines without AVX2.
