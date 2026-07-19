# WikiPrice Uganda

Know Your Price, Save Your Money. Kampala's price intelligence and discovery platform.

**Live site:** https://lynn-sketch.github.io/wikiprice/

## What's new (master refinement)

- Navy / white / yellow-orange palette (60-30-10)
- TikTok-style **Discover** feed (infinite scroll, Save / Comment / Share, deep links)
- Flexible JSON data layer (`/data/*.json` + `js/data-layer.js`) ready for future consented API sync
- UX fixes: illustrative stats, no fake testimonials, verification explainer, empty search state
- Internal **Outreach Assistant** at `/admin.html` (password: `wikiprice2026`)
- Source badges, hybrid seller schema, arcade/candidate/reference-price JSON

## Quick Start

No build step. Open `index.html` or serve locally:

```bash
npx serve .
```

## Auto-deploy

Every push to `main` updates GitHub Pages. See [Actions](https://github.com/lynn-sketch/wikiprice/actions).

## Data files (source of truth for outreach)

| File | Purpose |
|------|---------|
| `data/sellers.json` | Hybrid seller schema |
| `data/arcades.json` | Arcade directory |
| `data/candidates.json` | Confirmed / unknown / unconfirmed seeds |
| `data/reference-prices.json` | Baselines (not live deals) |
| `data/outreach.json` | Hashtags, search terms, templates, tracker seed |

## Trust rules at launch

- Manual, consent-based outreach + in-person verification only
- No scraping / paid APIs
- Manual verification remains gold standard for Verified badge
