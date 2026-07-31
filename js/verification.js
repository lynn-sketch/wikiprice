/**
 * Part 4 — Verification criteria, badge outcomes, stale-price & scam rules.
 * Manual consent-based outreach only. No scraping.
 */
const WPVerification = (function () {
  const STALE_DAYS = 30;
  const REVERIFY_DAYS = 30;
  const BEST_DEAL_MAX_DAYS = 14;

  const BADGE = {
    verified: 'verified',
    checkRequired: 'check-required',
    unverified: 'unverified',
    scamWarning: 'scam-warning'
  };

  const OUTREACH_STAGES = [
    'contacted',
    'responded',
    'in_person_verified',
    'live',
    'declined'
  ];

  const DISQUALIFYING_LOCATION = [
    'online only',
    'online-only',
    'dm for location',
    'dm seller',
    'nationwide delivery',
    'nationwide delivery only',
    'contact seller for exact location',
    'contact seller for location'
  ];

  function daysSince(dateStr) {
    if (!dateStr) return Infinity;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return Infinity;
    return Math.floor((Date.now() - d.getTime()) / 86400000);
  }

  function locationText(seller, deal) {
    const loc = (seller && seller.location) || {};
    const dloc = (deal && deal.location) || {};
    return [
      loc.arcade, loc.address, loc.floor, loc.stall, loc.landmark,
      dloc.arcade, dloc.building, dloc.floor, dloc.stall, dloc.landmark, dloc.directions
    ].filter(Boolean).join(' ').toLowerCase();
  }

  /** Physical location: arcade/building + floor or stall. "DM for location" / online-only do not qualify. */
  function hasQualifyingPhysicalLocation(seller, deal) {
    if (!seller && !deal) return false;
    if (seller && seller.physicalShop === false) return false;
    const text = locationText(seller, deal);
    if (DISQUALIFYING_LOCATION.some(bad => text.indexOf(bad) >= 0)) return false;
    const loc = (seller && seller.location) || {};
    const dloc = (deal && deal.location) || {};
    const arcade = loc.arcade || dloc.arcade || '';
    const stall = loc.stall || dloc.stall || '';
    const floor = loc.floor || dloc.floor || '';
    const building = loc.address || dloc.building || '';
    if (!arcade || arcade.toLowerCase() === 'kampala' || arcade.toLowerCase() === 'other') {
      // Still OK if building + stall/floor is specific
      if (!(building && (stall || floor))) return false;
    }
    if (!(stall || floor)) return false;
    return true;
  }

  function isNationwideNoFixedLocation(seller, deal) {
    const text = locationText(seller, deal);
    return text.indexOf('nationwide') >= 0 && !hasQualifyingPhysicalLocation(seller, deal);
  }

  function isPhoneOnlyBio(seller) {
    if (!seller) return false;
    const bio = (seller.bio || seller.about || '').trim();
    const hasShopName = !!(seller.businessName || seller.name);
    const phoneLike = /^[\d\s+\-().]{7,}$/.test(bio.replace(/whatsapp:?/i, '').trim());
    if (!hasShopName && (seller.phone || seller.whatsapp) && (!bio || phoneLike)) return true;
    if (bio && phoneLike && bio.length < 40 && !/[a-zA-Z]{4,}/.test(bio.replace(/whatsapp/i, ''))) return true;
    return false;
  }

  function isNewAccount(seller) {
    if (!seller) return false;
    if (seller.accountAgeDays != null) return seller.accountAgeDays < 30;
    if (seller.accountAgeMonths != null) return seller.accountAgeMonths < 1;
    return false;
  }

  /**
   * Evaluate verification. Pass checklist booleans from admin/in-person visit:
   * { physicalLocation, videoContent, priceTransparency, responsiveness }
   */
  function evaluateBadge(checks, seller, deal) {
    checks = checks || {};
    if (detectScamWarning(seller, deal)) return BADGE.scamWarning;

    const four = [
      checks.physicalLocation === true || hasQualifyingPhysicalLocation(seller, deal),
      checks.videoContent === true,
      checks.priceTransparency === true,
      checks.responsiveness === true
    ];
    const met = four.filter(Boolean).length;
    if (met === 4) return BADGE.verified;
    if (met === 0 && checks.forceUnverified) return BADGE.unverified;
    if (met > 0 && met < 4) return BADGE.checkRequired;
    // Without checklist evidence, never auto-promote to verified
    if (seller && seller.verificationStatus === 'verified' && hasQualifyingPhysicalLocation(seller, deal)) {
      return BADGE.verified;
    }
    return BADGE.checkRequired;
  }

  function detectScamWarning(seller, deal) {
    if (!seller && !deal) return false;
    if (seller && (seller.scamReports || 0) >= 2) return true;
    if (isNationwideNoFixedLocation(seller, deal)) return true;
    if (isNewAccount(seller) && !hasQualifyingPhysicalLocation(seller, deal)) return true;
    if (isPhoneOnlyBio(seller)) return true;
    if (deal && isPriceUnderHalfMarket(deal)) return true;
    if (deal && deal.verificationStatus === 'scam-warning') return true;
    if (seller && seller.verificationStatus === 'scam-warning') return true;
    return false;
  }

  function getBaselineAvg(deal) {
    if (!deal) return 0;
    const baselines = (typeof WPDATA !== 'undefined' && WPDATA.baselines) || [];
    const b = baselines.find(x => x.category === deal.category && x.subCategory === deal.subCategory);
    if (b) return (b.min + b.max) / 2;
    // Fall back to reference-prices.json if loaded
    const ref = (typeof WPDATA !== 'undefined' && WPDATA.referencePrices) || null;
    if (ref) {
      const groups = Object.keys(ref);
      for (let i = 0; i < groups.length; i++) {
        const items = ref[groups[i]] || [];
        const hit = items.find(it =>
          (it.product || '').toLowerCase().indexOf((deal.name || '').toLowerCase().slice(0, 12)) >= 0 ||
          (it.product || '').toLowerCase().indexOf((deal.subCategory || '').toLowerCase()) >= 0
        );
        if (hit && hit.min != null && hit.max != null) return (hit.min + hit.max) / 2;
      }
    }
    return 0;
  }

  function isPriceUnderHalfMarket(deal) {
    const avg = getBaselineAvg(deal);
    if (!avg) return false;
    const price = deal.retailPrice || deal.price || 0;
    return price > 0 && price / avg < 0.5;
  }

  function isPriceStale(deal, maxDays) {
    maxDays = maxDays != null ? maxDays : STALE_DAYS;
    const last = deal && (deal.lastVerified || deal.priceConfirmedAt);
    return daysSince(last) > maxDays;
  }

  function needsReverification(sellerOrDeal) {
    return daysSince(sellerOrDeal && sellerOrDeal.lastVerified) > REVERIFY_DAYS;
  }

  function priceAtOrBelowReference(deal) {
    const avg = getBaselineAvg(deal);
    const price = deal.retailPrice || deal.price || 0;
    if (!avg || !price) return false;
    // Best Deal: at or below typical market (reference midpoint)
    return price <= avg;
  }

  /**
   * Best Deal (Yellow-Orange) only when:
   * verified + price ≤ reference + lastVerified ≤ 14 days + imageConfirmed
   */
  function isBestDealEligible(deal) {
    if (!deal) return false;
    if (deal.verificationStatus !== 'verified') return false;
    if (deal.imageConfirmed !== true) return false;
    if (daysSince(deal.lastVerified) > BEST_DEAL_MAX_DAYS) return false;
    if (deal.verificationStatus === 'scam-warning') return false;
    if (!priceAtOrBelowReference(deal)) return false;
    return true;
  }

  /** Stale prices: flag, strip Best Deal, lower ranking. Never present as silently current. */
  function applyFreshness(deal) {
    if (!deal) return deal;
    const stale = isPriceStale(deal);
    deal.priceMayBeOutdated = stale;
    deal.isBestDeal = isBestDealEligible(deal);
    if (stale) {
      deal.freshnessRankPenalty = 1000;
    } else {
      deal.freshnessRankPenalty = 0;
    }
    return deal;
  }

  function canGoLive(deal, seller) {
    if (!deal || !seller) return false;
    if (deal.verificationStatus === 'scam-warning' || seller.verificationStatus === 'scam-warning') return false;
    if (deal.verificationStatus === 'unverified') return false;
    if (!hasQualifyingPhysicalLocation(seller, deal)) return false;
    if (deal.verificationStatus !== 'verified') return false;
    // Image gate: must be confirmed OR explicitly use category placeholder
    if (deal.imageConfirmed !== true && deal.useCategoryPlaceholder !== true && deal.imageUrl) {
      // Has an unverified photo — block live until confirmed
      return false;
    }
    return true;
  }

  function criteriaLabels() {
    return [
      { id: 'physicalLocation', label: 'Physical location — arcade/building with floor or stall (not online-only / DM for location)' },
      { id: 'videoContent', label: 'Video content — real products + shop, ≥10 consistent videos' },
      { id: 'priceTransparency', label: 'Price transparency — states prices, responds to price?, realistic' },
      { id: 'responsiveness', label: 'Responsiveness — replies, provides location, contact in bio' }
    ];
  }

  return {
    STALE_DAYS,
    REVERIFY_DAYS,
    BEST_DEAL_MAX_DAYS,
    BADGE,
    OUTREACH_STAGES,
    daysSince,
    hasQualifyingPhysicalLocation,
    isNationwideNoFixedLocation,
    isPhoneOnlyBio,
    isNewAccount,
    evaluateBadge,
    detectScamWarning,
    isPriceUnderHalfMarket,
    isPriceStale,
    needsReverification,
    applyFreshness,
    isBestDealEligible,
    priceAtOrBelowReference,
    canGoLive,
    criteriaLabels,
    getBaselineAvg
  };
})();
