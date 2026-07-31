# WikiPrice Uganda

Know Your Price, Save Your Money. Kampala's price intelligence and discovery platform.

**Live site:** https://wikiprice1.netlify.app/  
*(Also on GitHub Pages: https://lynn-sketch.github.io/wikiprice/)*

## Master refinement — complete build

| Area | Status |
|------|--------|
| Navy / gold palette (60-30-10) | Done |
| TikTok Discover feed + infinite scroll | Done |
| oEmbed embeds when `tiktokVideoId` present | Done |
| Deep links to `tiktok.com/@handle` | Done |
| Launch catalog (verified + physical only) | Done |
| Flexible JSON data layer + API sync hooks | Done |
| Part 4: verification criteria + stale-price rules | Done |
| Part 4: schema exports JSON/CSV/MD/handles | Done |
| Part 4: imageConfirmed + category placeholders | Done |
| Part 5: outreach admin (hashed gate, tracker, research) | Done |
| Part 6–7: TikTok deep links / oEmbed / multi-source | Done |
| Part 8–9: palette + categories + Services | Done |
| Part 9.5: Budget Finder category filter | Done |
| Part 10–11: arcade directory + seed candidates | Done |
| Part 12: Best Deal ≤14d + reference check | Done |
| Part 12.5: i18n en/lg/sw JSON + switcher | Done |
| Part 12.6–12.8: headers, rate-limit, nominate→tracker | Done |
| UX: illustrative stats, no fake quotes, empty states | Done |
| WhatsApp on free tier (paid = placement/promo) | Done |
| Last verified beside price + trust signal strip | Done |
| Skeleton loaders (home / search / budget / discover) | Done |
| Sticky mobile bottom nav | Done |
| A11y: gold contrast, mobile type, image alt | Done |
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
- Auth: SHA-256 password hash in `js/config.js` + 8h session + attempt lockout (static-site limit — also protect `/admin.html` via Netlify/Cloudflare Access in production)  
- Tabs: Intake, Tracker (`contacted → responded → in_person_verified → live | declined`), Research, Templates, Verification criteria/checklist, Export (JSON / CSV / Markdown / verified handles)  
- Rotate `WPCONFIG.adminPasswordSha256` before public launch.  

## Data files

| File | Purpose |
|------|---------|
| `data/sellers.json` | Hybrid seller schema (source of truth) |
| `data/arcades.json` | Arcade directory |
| `data/candidates.json` | Seed candidates |
| `data/reference-prices.json` | Baselines (not live deals) |
| `data/outreach.json` | Hashtags, templates, tracker seed, pre-filter |

## Trust rules

Manual consent-based outreach + in-person verification only at launch. No scraping.  
Re-verify every 30 days. Stale prices (&gt;30 days) show “Price may be outdated”, lose Best Deal eligibility, and rank lower.  
Deal images require `imageConfirmed`; otherwise a labeled category placeholder is shown.
