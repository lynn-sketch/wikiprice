# WikiPrice Uganda

Know Your Price, Save Your Money. Kampala's price intelligence and discovery platform.

**Live site:** https://lynn-sketch.github.io/wikiprice/

## Master refinement — complete build

| Area | Status |
|------|--------|
| Navy / gold palette (60-30-10) | Done |
| TikTok Discover feed + infinite scroll | Done |
| oEmbed embeds when `tiktokVideoId` present | Done |
| Deep links to `tiktok.com/@handle` | Done |
| Launch catalog (verified + physical only) | Done |
| Flexible JSON data layer + API sync hooks | Done |
| UX: illustrative stats, no fake quotes, empty states | Done |
| WhatsApp on free tier | Done |
| Last verified on deals/sellers | Done |
| Admin outreach assistant + verification checklist | Done |
| Formspree-ready forms (`js/config.js`) | Done |
| Kampala geo-fence + nearest sort | Done |
| Multi-source badges + search filter | Done |
| Community nominate / confirm prices | Done |
| Services category + Budget Finder | Done |

## Quick Start

```bash
npx serve .
```

## Configure Formspree (email delivery)

1. Create a form at https://formspree.io  
2. Put the form ID in `js/config.js`:
   ```js
   formspreeEndpoint: 'https://formspree.io/f/YOUR_REAL_ID',
   ```
3. Redeploy / push — seller signup, contact, nominate, and admin intake will POST there (with localStorage backup).

## Admin

- URL: `/admin.html`  
- Password: `wikiprice2026`  
- Tabs: Intake, Tracker, Research, Templates, Verification checklist, Export  

## Data files

| File | Purpose |
|------|---------|
| `data/sellers.json` | Hybrid seller schema |
| `data/arcades.json` | Arcade directory |
| `data/candidates.json` | Seed candidates |
| `data/reference-prices.json` | Baselines (not live deals) |
| `data/outreach.json` | Hashtags, templates, tracker seed |

## Trust rules

Manual consent-based outreach + in-person verification only at launch. No scraping. Manual verification remains gold standard for Verified badges.
