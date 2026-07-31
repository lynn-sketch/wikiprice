/**
 * WikiPrice flexible data layer
 * - Normalizes legacy WPDATA sellers/deals into hybrid schema
 * - Launch catalog prune, TikTok video attach, oEmbed helpers
 * - Loads JSON sources + sync hooks for future legal TikTok API
 * Manual verification remains the gold standard for Verified badges.
 */
const WPDataLayer = (function () {
  const SOURCES = ['tiktok', 'instagram', 'facebook', 'jiji', 'jumia', 'in-person'];

  const SOURCE_LABELS = {
    tiktok: 'TikTok',
    instagram: 'Instagram',
    facebook: 'Facebook',
    jiji: 'Jiji',
    jumia: 'Jumia',
    'in-person': 'In-person'
  };

  /** Confirmed seed sellers (master prompt 11.1) */
  const LAUNCH_SELLER_IDS = {
    'salongo-shoes': 1,
    'mummy-gadgets': 1,
    'nsambya-furniture': 1,
    'mirembe-beddings': 1,
    'daniel-perfumes': 1,
    'noddiz': 1,
    'fashion-hub-ug': 1,
    'fashion-wholesalers': 1,
    'techdeals-ug': 1,
    'techdeals-ug-tk': 1,
    'smartwatch-ug': 1,
    'phone-world-ug': 1,
    'beauty-world-ug': 1,
    'shoe-empire-ug': 1,
    'home-essentials-ug': 1,
    'bags-and-more': 1,
    'royal-perfumes': 1
  };

  function cleanHandle(h) {
    if (!h) return null;
    return String(h).replace(/^@/, '').trim();
  }

  function tiktokProfileUrl(handle) {
    const h = cleanHandle(handle);
    return h ? 'https://www.tiktok.com/@' + h : null;
  }

  function tiktokVideoUrl(handle, videoId) {
    const h = cleanHandle(handle);
    if (!h || !videoId) return null;
    return 'https://www.tiktok.com/@' + h + '/video/' + videoId;
  }

  function normalizeSeller(id, s) {
    if (!s) return null;
    const handle = cleanHandle(s.handle || s.tiktokHandle);
    const loc = s.location || {};
    const fromLegacyLoc = (s.locations && s.locations[0]) ? s.locations[0].text : '';
    const source = (s.source || 'in-person').toString().toLowerCase().replace(/\s+/g, '-');
    const normalized = Object.assign({}, s, {
      id: s.id || id,
      handle: handle ? '@' + handle : null,
      tiktokHandle: handle,
      businessName: s.businessName || s.name,
      followerCount: s.followerCount != null ? s.followerCount : (s.tiktokFollowers || 0),
      bio: s.bio || s.about || '',
      phone: s.phone || null,
      whatsapp: s.whatsapp != null ? s.whatsapp : null,
      location: {
        arcade: loc.arcade || '',
        address: loc.address || fromLegacyLoc || '',
        floor: loc.floor || '',
        stall: loc.stall || '',
        landmark: loc.landmark || ''
      },
      category: s.category || '',
      subCategory: s.subCategory || '',
      products: s.products || [],
      samplePrices: s.samplePrices || [],
      verificationStatus: s.verificationStatus || (s.verificationHistory >= 85 ? 'verified' : 'check-required'),
      lastVerified: s.lastVerified || s.memberSince || null,
      responseTime: s.responseTime || (s.responseTimeHours <= 2 ? 'fast' : s.responseTimeHours <= 6 ? 'medium' : 'slow'),
      submittedBy: s.submittedBy || 'manual',
      source: source,
      tags: s.tags || [],
      imageConfirmed: s.imageConfirmed === true,
      dataSource: s.dataSource || 'manual',
      lastSynced: s.lastSynced != null ? s.lastSynced : null,
      apiConsentGiven: !!s.apiConsentGiven,
      tiktokUserId: s.tiktokUserId || null,
      contactOptIn: s.contactOptIn != null ? !!s.contactOptIn : !!(s.whatsapp || s.phone)
    });
    if (!normalized.whatsapp && s.whatsapp) normalized.whatsapp = s.whatsapp;
    return normalized;
  }

  function normalizeDeal(deal) {
    if (!deal) return deal;
    const source = deal.source || (deal.mentionedOnTiktok ? 'tiktok' : 'in-person');
    let out = Object.assign({}, deal, {
      productName: deal.productName || deal.name,
      price: deal.price != null ? deal.price : deal.retailPrice,
      currency: deal.currency || 'UGX',
      imageUrl: deal.imageUrl || deal.image || null,
      imageConfirmed: deal.imageConfirmed === true,
      source: source,
      isBestDeal: deal.isBestDeal === true,
      stockStatus: deal.stockStatus || 'in-stock',
      dataSource: deal.dataSource || 'manual',
      lastSynced: deal.lastSynced != null ? deal.lastSynced : null,
      tiktokVideoId: deal.tiktokVideoId || null,
      tiktokUrl: deal.tiktokUrl || null
    });
    if (typeof WPVerification !== 'undefined') {
      out = WPVerification.applyFreshness(out);
      if (WPVerification.detectScamWarning(WPDATA.sellers[out.sellerId], out)) {
        // Flag only — do not silently rewrite verified seed data except scam demo
        if (out.id === 'scam-iphone') out.verificationStatus = 'scam-warning';
      }
      if (!WPVerification.isBestDealEligible(out)) out.isBestDeal = false;
    }
    return out;
  }

  function attachTikTokVideos() {
    // Seed feed uses poster images (not real TikTok video IDs) so we do not attach
    // fake video IDs that produce blank embeds. Keep mentionedOnTiktok for ranking.
    const feed = WPDATA.tiktokFeed || [];
    const byHandle = {};
    feed.forEach(v => {
      const h = cleanHandle(v.handle);
      if (h) byHandle[h] = v;
    });
    (WPDATA.deals || []).forEach(deal => {
      const seller = WPDATA.sellers[deal.sellerId];
      const h = cleanHandle(deal.tiktokHandle || seller?.tiktokHandle || seller?.handle);
      if (h && byHandle[h]) {
        deal.mentionedOnTiktok = true;
        deal.source = deal.source || 'tiktok';
        if (byHandle[h].dealId === deal.id && byHandle[h].image && !deal.image) {
          deal.image = byHandle[h].image;
        }
      }
    });
  }

  function sellerHasPhysicalLocation(seller, deal) {
    if (typeof WPVerification !== 'undefined') {
      return WPVerification.hasQualifyingPhysicalLocation(seller, deal);
    }
    if (!seller) return false;
    if (seller.physicalShop === false) return false;
    const loc = seller.location || {};
    if (loc.arcade && (loc.stall || loc.floor || loc.address)) return true;
    if (seller.locations && seller.locations.length && seller.locations[0].text) return true;
    return !!seller.physicalShop;
  }

  function isPublicDeal(deal) {
    if (!deal) return false;
    if (deal.id === 'scam-iphone' || deal.demoOnly) return false;
    if (deal.verificationStatus === 'scam-warning' || deal.verificationStatus === 'unverified') return false;
    const seller = WPDATA.sellers[deal.sellerId];
    if (!seller) return false;
    if (seller.id === 'suspect-seller' || seller.tiktokHandle === 'quickdealsug') return false;
    if (seller.verificationStatus === 'scam-warning') return false;
    const physical = sellerHasPhysicalLocation(seller, deal);
    if (WPDATA.meta && WPDATA.meta.launchMode) {
      const confirmed = !!LAUNCH_SELLER_IDS[deal.sellerId];
      const verified = deal.verificationStatus === 'verified';
      if (confirmed && verified && physical) return true;
      if (verified && physical && (seller.verificationHistory || 0) >= 80) return true;
      return false;
    }
    return deal.verificationStatus === 'verified' && physical;
  }

  function buildPublicCatalog() {
    WPDATA.allDeals = (WPDATA.deals || []).slice();
    WPDATA.publicDeals = (WPDATA.deals || []).filter(isPublicDeal);
    (WPDATA.deals || []).forEach(d => {
      if (!isPublicDeal(d) && d.id !== 'scam-iphone') {
        d.catalogNote = d.catalogNote || 'Not in launch catalog — awaiting full in-person verification';
      }
    });
    const scam = WPDATA.allDeals.find(d => d.id === 'scam-iphone');
    if (scam) {
      scam.demoOnly = true;
      scam.verificationStatus = 'scam-warning';
      scam.catalogNote = 'Educational scam example — not a live listing';
    }
    // Always wire deal/seller stats to live catalog counts
    WPDATA.stats = WPDATA.stats || {};
    WPDATA.stats.verifiedDeals = (WPDATA.publicDeals || WPDATA.deals || []).filter(d =>
      d.verificationStatus === 'verified' || (WPDATA.publicDeals && WPDATA.publicDeals.indexOf(d) >= 0)
    ).length;
    if (WPDATA.publicDeals) {
      WPDATA.stats.verifiedDeals = WPDATA.publicDeals.length;
      WPDATA.stats.sellers = Object.keys(WPDATA.sellers).filter(id =>
        WPDATA.publicDeals.some(d => d.sellerId === id)
      ).length;
    } else {
      WPDATA.stats.verifiedDeals = (WPDATA.deals || []).filter(d => d.verificationStatus === 'verified').length;
      WPDATA.stats.sellers = Object.keys(WPDATA.sellers || {}).length;
    }
    WPDATA.meta = WPDATA.meta || {};
    WPDATA.meta.statsIllustrative = !(WPDATA.meta.usersLive && WPDATA.meta.savingsLive);
  }

  function getSearchableDeals() {
    if (WPDATA.meta && WPDATA.meta.launchMode && WPDATA.publicDeals) {
      return WPDATA.publicDeals;
    }
    return WPDATA.deals || [];
  }

  function applyToWPDATA() {
    if (typeof WPDATA === 'undefined') return;
    Object.keys(WPDATA.sellers || {}).forEach(id => {
      WPDATA.sellers[id] = normalizeSeller(id, WPDATA.sellers[id]);
    });
    WPDATA.deals = (WPDATA.deals || []).map(normalizeDeal);
    WPDATA.meta = Object.assign({
      statsIllustrative: true,
      usersLive: false,
      savingsLive: false,
      verificationGoldStandard: 'manual_in_person',
      apiReady: true,
      launchMode: (typeof WPCONFIG !== 'undefined') ? !!WPCONFIG.launchMode : true
    }, WPDATA.meta || {});
    attachTikTokVideos();
    buildPublicCatalog();
  }

  async function fetchJSON(path) {
    try {
      const res = await fetch(path, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.statusText);
      return await res.json();
    } catch (e) {
      console.warn('[WPDataLayer] Could not load', path, e.message);
      return null;
    }
  }

  async function loadFromDatabase() {
    if (typeof WPCONFIG !== 'undefined' && WPCONFIG.useDatabaseCatalog === false) return false;
    if (typeof WPAPI === 'undefined' || typeof WPAPI.fetchCatalog !== 'function') return false;
    try {
      const data = await WPAPI.fetchCatalog();
      if (!data || !data.ok || !data.deals || !data.deals.length) return false;
      if (data.sellers && typeof data.sellers === 'object') {
        Object.keys(data.sellers).forEach(function (id) {
          WPDATA.sellers[id] = normalizeSeller(id, data.sellers[id]);
        });
      }
      WPDATA.deals = data.deals.map(normalizeDeal);
      WPDATA.meta = Object.assign({}, WPDATA.meta || {}, {
        dataSource: 'netlify-database',
        catalogLoadedAt: new Date().toISOString()
      });
      console.info('[WPDataLayer] Loaded catalog from Netlify Database', data.count || {});
      return true;
    } catch (e) {
      console.info('[WPDataLayer] Database catalog unavailable — using static data', e.message || e);
      return false;
    }
  }

  async function loadExtras() {
    try {
      await loadFromDatabase();
    } catch (e) { /* ignore */ }
    try {
      const [arcades, candidates, referencePrices, outreach, sellersDoc] = await Promise.all([
        fetchJSON('data/arcades.json'),
        fetchJSON('data/candidates.json'),
        fetchJSON('data/reference-prices.json'),
        fetchJSON('data/outreach.json'),
        fetchJSON('data/sellers.json')
      ]);
      if (arcades) WPDATA.arcades = arcades;
      if (candidates) WPDATA.candidates = candidates;
      if (referencePrices) WPDATA.referencePrices = referencePrices;
      if (outreach) WPDATA.outreach = outreach;
      if (sellersDoc && Array.isArray(sellersDoc.sellers) && !(WPDATA.meta && WPDATA.meta.dataSource === 'netlify-database')) {
        sellersDoc.sellers.forEach(ns => {
          const id = ns.id;
          if (!id) return;
          const existing = WPDATA.sellers[id] || {};
          WPDATA.sellers[id] = normalizeSeller(id, Object.assign({}, existing, {
            name: ns.businessName || existing.name,
            tiktokHandle: cleanHandle(ns.handle),
            tiktokFollowers: ns.followerCount,
            about: ns.bio,
            phone: ns.phone || existing.phone,
            whatsapp: ns.whatsapp || existing.whatsapp,
            location: ns.location,
            category: ns.category,
            subCategory: ns.subCategory,
            products: ns.products,
            samplePrices: ns.samplePrices,
            verificationStatus: ns.verificationStatus,
            lastVerified: ns.lastVerified,
            responseTime: ns.responseTime,
            submittedBy: ns.submittedBy,
            source: ns.source,
            tags: ns.tags,
            imageConfirmed: ns.imageConfirmed,
            contactOptIn: ns.contactOptIn,
            dataSource: ns.dataSource,
            lastSynced: ns.lastSynced,
            apiConsentGiven: ns.apiConsentGiven,
            tiktokUserId: ns.tiktokUserId,
            bioVerified: ns.verificationStatus === 'verified',
            physicalShop: true
          }));
        });
      }
    } catch (e) {
      console.warn('[WPDataLayer] loadExtras error — using embedded catalog', e);
    }
    try {
      applyToWPDATA();
    } catch (e2) {
      console.warn('[WPDataLayer] applyToWPDATA error', e2);
    }
    try {
      document.dispatchEvent(new CustomEvent('wikiprice:data-ready'));
    } catch (e3) { /* ignore */ }
    return WPDATA;
  }

  async function syncSellerFromAPI(sellerId, apiClient) {
    const seller = WPDATA.sellers[sellerId];
    if (!seller) throw new Error('Seller not found');
    if (!seller.apiConsentGiven) throw new Error('Seller has not consented to API sync');
    if (!apiClient || typeof apiClient.fetchProfile !== 'function') {
      console.info('[WPDataLayer] No API client — keeping manual data for', sellerId);
      return seller;
    }
    const remote = await apiClient.fetchProfile(seller.tiktokUserId || cleanHandle(seller.handle));
    seller.lastSynced = new Date().toISOString().slice(0, 10);
    seller.dataSource = 'api+manual';
    if (remote.followerCount != null) seller.followerCount = remote.followerCount;
    if (remote.bio) seller.bio = remote.bio;
    WPDATA.sellers[sellerId] = normalizeSeller(sellerId, seller);
    return WPDATA.sellers[sellerId];
  }

  function exportDatabaseJSON() {
    const sellers = Object.keys(WPDATA.sellers).map(id => normalizeSeller(id, WPDATA.sellers[id]));
    const deals = (WPDATA.deals || []).map(normalizeDeal);
    const outreachLog = (typeof localStorage !== 'undefined' && localStorage.getItem('wp-outreach-tracker'))
      ? JSON.parse(localStorage.getItem('wp-outreach-tracker'))
      : ((WPDATA.outreach && WPDATA.outreach.trackerSeed) || []);
    return JSON.stringify({
      version: 1,
      exportedAt: new Date().toISOString(),
      schema: 'seller | deal | outreachLog',
      sellers: sellers,
      deals: deals,
      outreachLog: outreachLog
    }, null, 2);
  }

  function exportSellersJSON() {
    const list = Object.keys(WPDATA.sellers).map(id => normalizeSeller(id, WPDATA.sellers[id]));
    return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), sellers: list }, null, 2);
  }

  /** Verified + public-eligible handles only (for discovery feed). */
  function exportHandlesList() {
    const ids = new Set();
    (WPDATA.publicDeals || []).forEach(d => ids.add(d.sellerId));
    return Object.keys(WPDATA.sellers)
      .filter(id => {
        const s = WPDATA.sellers[id];
        if (!s) return false;
        if (s.verificationStatus !== 'verified') return false;
        if (ids.size && !ids.has(id)) return false;
        return !!cleanHandle(s.handle || s.tiktokHandle);
      })
      .map(id => {
        const h = cleanHandle(WPDATA.sellers[id].handle || WPDATA.sellers[id].tiktokHandle);
        return '@' + h;
      });
  }

  function exportSellersCSV() {
    const headers = [
      'id', 'handle', 'businessName', 'followerCount', 'phone', 'whatsapp',
      'arcade', 'floor', 'stall', 'category', 'subCategory', 'verificationStatus',
      'lastVerified', 'responseTime', 'submittedBy', 'source', 'imageConfirmed'
    ];
    const rows = [headers.join(',')];
    Object.keys(WPDATA.sellers).forEach(id => {
      const s = normalizeSeller(id, WPDATA.sellers[id]);
      const loc = s.location || {};
      const cells = [
        s.id, s.handle, s.businessName, s.followerCount, s.phone, s.whatsapp,
        loc.arcade, loc.floor, loc.stall, s.category, s.subCategory, s.verificationStatus,
        s.lastVerified, s.responseTime, s.submittedBy, s.source, s.imageConfirmed
      ].map(v => {
        const t = v == null ? '' : String(v);
        return '"' + t.replace(/"/g, '""') + '"';
      });
      rows.push(cells.join(','));
    });
    return rows.join('\n');
  }

  function exportSellersMarkdown() {
    let md = '# WikiPrice sellers\n\n';
    md += '| Handle | Business | Arcade | Stall | Status | Last verified | Source |\n';
    md += '|--------|----------|--------|-------|--------|---------------|--------|\n';
    Object.keys(WPDATA.sellers).forEach(id => {
      const s = normalizeSeller(id, WPDATA.sellers[id]);
      const loc = s.location || {};
      md += '| ' + (s.handle || '—') + ' | ' + (s.businessName || '') + ' | ' + (loc.arcade || '') +
        ' | ' + (loc.stall || '') + ' | ' + (s.verificationStatus || '') + ' | ' +
        (s.lastVerified || '') + ' | ' + (s.source || '') + ' |\n';
    });
    return md;
  }

  function downloadBlob(filename, content, mime) {
    const blob = new Blob([content], { type: mime || 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function sourceBadgeLabel(source) {
    return SOURCE_LABELS[source] || source || 'Manual';
  }

  function oEmbedBlockquote(handle, videoId) {
    const h = cleanHandle(handle);
    if (!h || !videoId) return '';
    const url = 'https://www.tiktok.com/@' + h + '/video/' + videoId;
    return '<blockquote class="tiktok-embed" cite="' + url + '" data-video-id="' + videoId + '" style="max-width:100%;min-width:280px;">' +
      '<section><a target="_blank" rel="noopener" href="' + url + '">@' + h + '</a></section></blockquote>';
  }

  function ensureEmbedScript() {
    if (!document.getElementById('tiktok-embed-script')) {
      const s = document.createElement('script');
      s.id = 'tiktok-embed-script';
      s.src = 'https://www.tiktok.com/embed.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }

  if (typeof WPDATA !== 'undefined') {
    try { applyToWPDATA(); } catch (e) { console.warn('[WPDataLayer] initial apply failed', e); }
  }

  return {
    SOURCES,
    LAUNCH_SELLER_IDS,
    cleanHandle,
    tiktokProfileUrl,
    tiktokVideoUrl,
    normalizeSeller,
    normalizeDeal,
    applyToWPDATA,
    loadExtras,
    syncSellerFromAPI,
    exportSellersJSON,
    exportDatabaseJSON,
    exportHandlesList,
    exportSellersCSV,
    exportSellersMarkdown,
    downloadBlob,
    sourceBadgeLabel,
    getSearchableDeals,
    isPublicDeal,
    sellerHasPhysicalLocation,
    buildPublicCatalog,
    oEmbedBlockquote,
    ensureEmbedScript
  };
})();
