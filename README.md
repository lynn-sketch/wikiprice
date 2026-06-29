# WikiPrice Uganda

Know Your Price, Save Your Money. Kampala's price intelligence and discovery platform.

## Quick Start

No build step required. Open `index.html` in a browser, or serve locally:

```bash
npx serve .
```

## Deploy to Vercel

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
