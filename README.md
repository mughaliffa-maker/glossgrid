# GlossGrid Cloudflare Pages Starter

A framework-free, mobile-first nail inspiration website that can be deployed on Cloudflare Pages at no hosting cost.

## Included

- Editorial homepage
- Searchable/filterable design library
- Six-step Nail Finder
- Browser-based saved collections
- Dynamic design-detail pages
- Copyable salon briefs
- Responsive mobile navigation
- About, contact, privacy, terms, editorial and copyright pages
- Cloudflare `_headers` and `_redirects`
- `robots.txt`, sitemap and AdSense placeholder

## Important before public monetization

1. Replace the demo brand, email, Pinterest URL and site URL in `assets/data.js`.
2. Replace demo Pexels assets with original or properly licensed nail-design imagery.
3. Expand each design with unique, human-reviewed information.
4. Connect a real email provider; the demo email form only stores locally in the browser.
5. Add analytics, consent and AdSense only after updating the privacy policy.
6. Purchase/connect a custom domain before treating the site as a permanent business asset.

## Cloudflare build settings

This is plain static HTML. Use:

- Framework preset: None
- Build command: `exit 0`
- Build output directory: `.`
- Production branch: `main`

See `GITHUB-CLOUDFLARE-STEPS.md` for exact instructions.

## Collection-led Pinterest upgrade

This package now includes:

- `/collections/` — collection library
- `/collection/<slug>/` — complete collection landing pages
- 24-item progressive loading for collections containing 50–100 designs
- Search and shape/length/color filtering inside each collection
- Collection links preserved when opening design detail pages
- Automatic collection membership based on design metadata
- Support for multiple colors, seasons, occasions and styles per design
- Pinterest landing-page messaging

Read `PINTEREST-COLLECTION-WORKFLOW.md` before adding your full image library.
