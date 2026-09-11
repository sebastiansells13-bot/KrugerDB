# KrugerDB — Marketing Website

Public-facing marketing site for **KrugerDB**, the client-facing/licensable brand for the
inventory + selling app (AI photo listing, live eBay comps, Market Mode in-person selling,
eBay/Instagram publishing, profit reporting) built on Airtable for independent resellers —
vintage clothing, comics, toys, sneakers, records, and other resale niches.

This is a standalone static site — it does not contain the app itself. It's dependency-free
(no build step, no framework) so it can be deployed anywhere that serves static files:
GitHub Pages, Vercel, Netlify, or a plain web server.

## Structure

```
index.html            — landing page (hero, features, how it works, pricing, FAQ)
compare.html           — full competitive comparison vs. Depop, Poshmark, Whatnot,
                          eBay Seller Hub, Vendoo, spreadsheets, DIY Airtable
assets/css/styles.css  — all styling (light theme, Space Grotesk + Inter)
assets/js/main.js      — mobile nav, FAQ accordion, scroll-reveal (vanilla JS, no deps)
assets/img/favicon.svg — site icon
```

## Local preview

No build step — just serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

or open `index.html` directly in a browser.

## Deploying

Any static host works. For GitHub Pages: Settings → Pages → deploy from the `main` branch,
root directory.

## Editing content

- Pricing, feature copy, and the comparison table are hand-written — update them directly in
  `index.html` / `compare.html` rather than pulling from a CMS.
- The contact address throughout is `hello@krugerdb.app` — replace with the real inbox before
  going live.
- Update `assets/img/favicon.svg` if the brand mark changes.
