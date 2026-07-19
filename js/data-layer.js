/**
 * WikiPrice flexible data layer
 * - Normalizes legacy WPDATA sellers/deals into hybrid schema
 * - Loads JSON sources (arcades, candidates, reference prices, outreach)
 * - Exposes sync hooks for future legal TikTok API integration
 * Manual verification remains the gold standard for Verified badges.
 */
const WPDataLayer = (function () {
  const SOURCES = ['tiktok', 'instagram', 'facebook', 'jiji', 'jumia', 'in-person'];

  const SOURCE_LABELS = {
    tiktok: 'TikTok',
    Instagram: 'Instagram',
    instagram: 'Instagram',
    facebook: 'Facebook',
    jiji: 'Jiji',
    jumia: 'Jumia',
    'in-person': 'In-person'
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

  /** Normalize a legacy seller object into hybrid schema fields (non-destructive). */
  function normalizeSeller(id, s) {
    if (!s) return null;
    const handle = cleanHandle(s.handle || s.tiktokHandle);
    const loc = s.location || {};
    const fromLegacyLoc = (s.locations && s.locations[0]) ? s.locations[0].text : '';
    return Object.assign({}, s, {
      id: s.id || id,
      handle: handle ? '@' + handle : null,
      tiktokHandle: handle,
      businessName: s.businessName || s.name,
      followerCount: s.followerCount != null ? s.followerCount : (s.tiktokFollowers || 0),
      bio: s.bio || s.about || '',
      phone: s.phone || null,
      whatsapp: s.whatsapp || s.phone || null,
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
      tags: s.tags || [],
      dataSource: s.dataSource || 'manual',
      lastSynced: s.lastSynced != null ? s.lastSynced : null,
      apiConsentGiven: !!s.apiConsentGiven,
      tiktokUserId: s.tiktokUserId || null
    });
  }

  function normalizeDeal(deal) {
    if (!deal) return deal;
    const source = deal.source || (deal.mentionedOnTiktok ? 'tiktok' : 'in-person');
    return Object.assign({}, deal, {
      source: source,
      dataSource: deal.dataSource || 'manual',
      lastSynced: deal.lastSynced != null ? deal.lastSynced : null,
      tiktokVideoId: deal.tiktokVideoId || null,
      tiktokUrl: deal.tiktokUrl || null
    });
  }

  function applyToWPDATA() {
    if (typeof WPDATA === 'undefined') return;
    Object.keys(WPDATA.sellers || {}).forEach(id => {
      WPDATA.sellers[id] = normalizeSeller(id, WPDATA.sellers[id]);
    });
    WPDATA.deals = (WPDATA.deals || []).map(normalizeDeal);
    WPDATA.meta = Object.assign({
      statsIllustrative: true,
      verificationGoldStandard: 'manual_in_person',
      apiReady: true
    }, WPDATA.meta || {});
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

  async function loadExtras() {
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
    if (sellersDoc && Array.isArray(sellersDoc.sellers)) {
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
          tags: ns.tags,
          dataSource: ns.dataSource,
          lastSynced: ns.lastSynced,
          apiConsentGiven: ns.apiConsentGiven,
          tiktokUserId: ns.tiktokUserId,
          bioVerified: ns.verificationStatus === 'verified',
          physicalShop: true
        }));
      });
    }
    document.dispatchEvent(new CustomEvent('wikiprice:data-ready'));
    return WPDATA;
  }

  /**
   * Future sync hook — call only with seller.apiConsentGiven === true
   * and an official TikTok API client. Stubbed for architecture readiness.
   */
  async function syncSellerFromAPI(sellerId, apiClient) {
    const seller = WPDATA.sellers[sellerId];
    if (!seller) throw new Error('Seller not found');
    if (!seller.apiConsentGiven) {
      throw new Error('Seller has not consented to API sync');
    }
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

  function exportSellersJSON() {
    const list = Object.keys(WPDATA.sellers).map(id => normalizeSeller(id, WPDATA.sellers[id]));
    return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), sellers: list }, null, 2);
  }

  function exportHandlesList() {
    return Object.values(WPDATA.sellers)
      .map(s => cleanHandle(s.handle || s.tiktokHandle))
      .filter(Boolean)
      .map(h => '@' + h);
  }

  function sourceBadgeLabel(source) {
    return SOURCE_LABELS[source] || source || 'Manual';
  }

  // Run sync normalize immediately when script loads (after data.js)
  if (typeof WPDATA !== 'undefined') applyToWPDATA();

  return {
    SOURCES,
    cleanHandle,
    tiktokProfileUrl,
    tiktokVideoUrl,
    normalizeSeller,
    normalizeDeal,
    applyToWPDATA,
    loadExtras,
    syncSellerFromAPI,
    exportSellersJSON,
    exportHandlesList,
    sourceBadgeLabel
  };
})();
