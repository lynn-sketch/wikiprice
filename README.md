# WikiPrice Uganda

Know Your Price, Save Your Money. Kampala's price intelligence and discovery platform.

**Live site:** https://lynn-sketch.github.io/wikiprice/

## Quick Start

No build step required. Open `index.html` in a browser, or serve locally:

```bash
npx serve .
```

## Auto-deploy from GitHub

Every push to `main` automatically updates the live site via GitHub Pages.

1. Edit files locally (deals in `js/data.js`, styles in `css/styles.css`, etc.)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update deals"
   git push
   ```
3. GitHub Actions deploys in ~1 minute — check the [Actions tab](https://github.com/lynn-sketch/wikiprice/actions)

## Deploy to Vercel (optional)

```bash
vercel
```

Or connect the GitHub repo to Vercel — static site, no build command needed.

## Features

- 54 verified sample deals across Kampala arcades
- Working search with full filters
- Budget finder with wholesale warnings
- Deal pages with price history, risk scoring, WhatsApp contact
- Seller profiles with TikTok four-source extraction
- Scam detection and safe shopping guidelines
- Data saver mode and offline service worker
- English / Luganda toggle

## Structure

- `index.html` — Home
- `search.html` — Search with filters
- `budget-finder.html` — Budget finder
- `deal.html?id=` — Individual deal
- `seller.html?id=` — Seller profile
- `for-sellers.html`, `about.html`, `contact.html`, `safe-shopping.html`
- `js/data.js` — All deals and sellers
- `js/core.js` — Search, risk scoring, i18n
- `js/components.js` — UI components
