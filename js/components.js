/* WikiPrice UI Components */
const WPUI = {
  logoHtml() {
    return '<a href="index.html" class="logo" aria-label="WikiPrice home"><img src="images/logo.png?v=5" alt="WikiPrice" class="logo-img" width="360" height="104"></a>';
  },

  searchBarHtml(id, placeholder, compact) {
    const pid = id || 'header-search';
    return '<div class="header-search-wrap' + (compact ? ' header-search-compact' : '') + '" data-search-autocomplete>' +
      '<form action="search.html" method="get" style="margin:0;">' +
      '<input type="search" name="q" id="' + pid + '" class="header-search" placeholder="' + (placeholder || 'Search shoes, TV, perfume...') + '" autocomplete="off" aria-label="Search">' +
      '</form><div class="search-suggestions" id="' + pid + '-suggestions"></div></div>';
  },

  priceTypeBadge(deal) {
    const map = {
      retail: { cls: 'badge-retail', icon: 'tag', label: WikiPrice.t('retailOnly') },
      wholesale: { cls: 'badge-wholesale', icon: 'box', label: WikiPrice.t('wholesaleOnly') + (deal.minQuantity > 1 ? ' (min ' + deal.minQuantity + ')' : '') },
      both: { cls: 'badge-both', icon: 'tag', label: WikiPrice.t('both') }
    };
    const m = map[deal.priceType] || map.both;
    const icon2 = deal.priceType === 'both' ? WPIcon('box', 14) : '';
    return '<span class="badge ' + m.cls + '">' + WPIcon(m.icon, 14) + icon2 + ' ' + m.label + '</span>';
  },

  verificationBadge(deal) {
    const status = deal.verificationStatus || 'check-required';
    if (status === 'verified') {
      return '<span class="badge badge-verified">' + WPIcon('check', 14) + ' ' + WikiPrice.t('verified') + '</span>';
    }
    if (status === 'scam-warning') {
      return '<span class="badge badge-danger">' + WPIcon('alert', 14) + ' Scam Warning</span>';
    }
    if (status === 'unverified') {
      return '<span class="badge badge-caution">' + WPIcon('warning', 14) + ' Unverified</span>';
    }
    return '<span class="badge badge-caution">' + WPIcon('warning', 14) + ' Check Required</span>';
  },

  stalePriceBadge(deal) {
    const stale = deal.priceMayBeOutdated || (typeof WikiPrice !== 'undefined' && WikiPrice.isPriceStale && WikiPrice.isPriceStale(deal));
    if (!stale) return '';
    return '<span class="badge badge-stale">' + WPIcon('clock', 14) + ' Price may be outdated</span>';
  },

  sourceBadge(deal) {
    // Generic source labels stay plain text (e.g. "TikTok" as a channel name)
    const source = (deal && deal.source) || 'in-person';
    const label = (typeof WPDataLayer !== 'undefined') ? WPDataLayer.sourceBadgeLabel(source) : source;
    return '<span class="badge badge-source badge-source-' + source + '">' + label + '</span>';
  },

  /** Seller-attached TikTok profile deep link: https://www.tiktok.com/@handle */
  tiktokProfileLink(handle, opts) {
    opts = opts || {};
    const h = handle ? String(handle).replace(/^@/, '') : '';
    const url = (typeof WPDataLayer !== 'undefined')
      ? WPDataLayer.tiktokProfileUrl(h)
      : (h ? 'https://www.tiktok.com/@' + h : null);
    if (!url) return '';
    const showIcon = opts.icon !== false;
    const label = opts.label != null ? opts.label : ('@' + h);
    const cls = opts.className || 'feed-handle';
    return '<a href="' + url + '" target="_blank" rel="noopener" class="' + cls + '"' +
      (opts.ariaLabel ? ' aria-label="' + opts.ariaLabel + '"' : '') + '>' +
      (showIcon ? WPIcon('tiktok', opts.iconSize || 16) + ' ' : '') + label + '</a>';
  },

  tiktokDeepLink(handle, label) {
    return WPUI.tiktokProfileLink(handle, { label: label || undefined });
  },

  /** "TikTok" word linked only when tied to a specific seller handle */
  tiktokWordLink(handle) {
    return WPUI.tiktokProfileLink(handle, { label: 'TikTok', icon: false, className: 'tiktok-word-link' });
  },

  contactButton(deal, seller, sm) {
    // Part 12.6 — expose contact only when seller opted in (providing WhatsApp = opt-in)
    const optedIn = seller && (seller.contactOptIn === true || seller.whatsappOptIn === true ||
      (seller.whatsapp && seller.contactOptIn !== false && seller.whatsappOptIn !== false));
    const phone = optedIn ? (seller.whatsapp || seller.phone) : null;
    if (phone) {
      return '<a href="' + WikiPrice.whatsappLink(phone, deal) + '" class="btn btn-whatsapp ' + (sm ? 'btn-sm' : '') + '" target="_blank" rel="noopener">' + WPIcon('whatsapp', 16) + ' WhatsApp</a>';
    }
    if (seller?.tiktokHandle || seller?.handle) {
      const h = seller.tiktokHandle || seller.handle;
      return WPUI.tiktokProfileLink(h, {
        label: 'TikTok',
        className: 'btn btn-outline ' + (sm ? 'btn-sm' : ''),
        iconSize: 16
      });
    }
    return '';
  },

  stockBadge(deal) {
    const map = {
      'in-stock': { label: WikiPrice.t('inStock'), cls: 'badge-verified' },
      'limited': { label: WikiPrice.t('limitedStock'), cls: 'badge-caution' },
      'call': { label: WikiPrice.t('callToConfirm'), cls: 'badge-caution' },
      'out-of-stock': { label: WikiPrice.t('outOfStock'), cls: 'badge-danger' }
    };
    const s = map[deal.stockStatus] || map['in-stock'];
    return '<span class="badge badge-stock ' + s.cls + '">' + s.label + '</span>';
  },

  confidenceBadge(deal) {
    const map = {
      high: { icon: 'check', cls: 'badge-confidence-high', label: 'High confidence' },
      medium: { icon: 'warning', cls: 'badge-confidence-medium', label: 'Medium confidence' },
      low: { icon: 'question', cls: 'badge-confidence-low', label: 'Low confidence' }
    };
    const c = map[deal.priceConfidence] || map.medium;
    return '<span class="icon-row ' + c.cls + '">' + WPIcon(c.icon, 16) + '<span>' + c.label + '</span></span>';
  },

  riskBadge(risk) {
    return '<span class="badge ' + risk.badgeClass + '">' + risk.label + '</span>';
  },

  formatPrices(deal, opts) {
    opts = opts || {};
    const seller = opts.seller || (deal.sellerId && WPDATA.sellers[deal.sellerId]);
    const displayPrice = deal.priceType === 'wholesale' ? deal.wholesalePrice : (deal.retailPrice || deal.wholesalePrice);
    const lastVerified = deal.lastVerified || seller?.lastVerified;
    const showBeside = opts.showVerifiedBeside === true && lastVerified;
    let html = '<div class="deal-price-row">' +
      '<div class="deal-price">' + WikiPrice.formatUGX(displayPrice) + '</div>' +
      (showBeside ? '<div class="deal-verified-beside">' + WikiPrice.daysAgo(lastVerified) + '</div>' : '') +
      '</div>';
    if (deal.priceType === 'both' && deal.wholesalePrice) {
      html += '<div class="price-secondary">Wholesale: ' + WikiPrice.formatUGX(deal.wholesalePrice) + '/pc (min ' + deal.minQuantity + ')</div>';
    }
    if (deal.priceType === 'wholesale') {
      html += '<div class="price-secondary">Min ' + deal.minQuantity + ' pcs · Total ' + WikiPrice.formatUGX(deal.wholesalePrice * deal.minQuantity) + '</div>';
    }
    if (deal.mallPrice && displayPrice) {
      const savings = Math.round((1 - displayPrice / deal.mallPrice) * 100);
      if (savings > 0) html += '<span class="savings-badge">' + savings + '% savings vs mall</span>';
    }
    return html;
  },

  /** Same trust strip on every deal card / seller profile: badge + last verified + source */
  trustSignals(deal, seller) {
    const d = deal || {};
    const s = seller || (d.sellerId && WPDATA.sellers[d.sellerId]) || {};
    const lastVerified = d.lastVerified || s.lastVerified;
    return '<div class="trust-signals" role="group" aria-label="Trust signals">' +
      WPUI.verificationBadge(d.verificationStatus ? d : Object.assign({}, d, { verificationStatus: s.verificationStatus || 'check-required' })) +
      WPUI.sourceBadge(d) +
      (lastVerified ? '<span class="trust-verified-date">' + WikiPrice.daysAgo(lastVerified) + '</span>' : '') +
      WPUI.stalePriceBadge(d) +
      ((typeof WPVerification !== 'undefined' ? WPVerification.isBestDealEligible(d) : d.isBestDeal)
        ? '<span class="badge badge-best-deal">' + WikiPrice.t('bestDeal') + '</span>' : '') +
      '</div>';
  },

  trustSignalsSeller(seller, sampleDeal) {
    const deal = sampleDeal || { verificationStatus: seller.verificationStatus || 'verified', source: 'in-person', lastVerified: seller.lastVerified };
    if (!deal.lastVerified && seller.lastVerified) deal.lastVerified = seller.lastVerified;
    if (!deal.verificationStatus) deal.verificationStatus = seller.verificationStatus || 'verified';
    return WPUI.trustSignals(deal, seller);
  },

  wholesaleWarning(deal) {
    if (deal.priceType === 'retail') return '';
    const total = deal.wholesalePrice * deal.minQuantity;
    return '<div class="warning-box warning-wholesale icon-row">' + WPIcon('box', 18) + '<span>' + WikiPrice.t('wholesaleWarning', { qty: deal.minQuantity, total: total.toLocaleString('en-UG') }) + '</span></div>';
  },

  dealCard(deal, opts) {
    opts = opts || {};
    const seller = WPDATA.sellers[deal.sellerId];
    const trust = WikiPrice.calculateTrustScore(seller || {});
    const handle = seller?.tiktokHandle || (seller?.handle && String(seller.handle).replace(/^@/, ''));
    const followerLine = handle
      ? ' · ' + WPUI.tiktokProfileLink(handle) +
        (handle ? ' · ' + WPUI.tiktokWordLink(handle) : '') +
        ((seller.followerCount || seller.tiktokFollowers) ? ' · ' + WikiPrice.formatFollowers(seller.followerCount || seller.tiktokFollowers) + ' followers' : '')
      : '';

    return '<article class="deal-card">' +
      '<a href="deal.html?id=' + deal.id + '" class="deal-card-img" data-name="' + deal.name.replace(/"/g, '') + '">' + dealImageTag(deal, 'deal-card-photo') + '</a>' +
      '<div class="deal-card-body">' +
      '<h3><a href="deal.html?id=' + deal.id + '" style="color:inherit;text-decoration:none;">' + deal.name + '</a></h3>' +
      WPUI.formatPrices(deal, { seller: seller }) +
      '<div class="deal-location icon-row">' + WPIcon('location', 16) + '<span>' + deal.location.arcade + (deal.location.stall ? ', ' + deal.location.stall : '') + '</span></div>' +
      WPUI.trustSignals(deal, seller) +
      '<div class="deal-meta">' +
      WPUI.priceTypeBadge(deal) +
      (deal.crowdConfirmations >= 5 ? '<span class="badge badge-community">' + WPIcon('users', 14) + ' Community</span>' : '') +
      '</div>' +
      '<div class="deal-seller icon-row">' + WPIcon('shop', 14) + '<span><a href="seller.html?id=' + deal.sellerId + '">' + (seller?.businessName || seller?.name || 'Unknown') + '</a>' + followerLine + ' · ' + WPIcon('star', 14) + ' ' + trust.score + '%</span></div>' +
      '<div class="deal-card-actions">' +
      '<a href="deal.html?id=' + deal.id + '" class="btn btn-primary btn-sm">' + WikiPrice.t('viewDeal') + '</a>' +
      WPUI.contactButton(deal, seller, true) +
      '</div>' +
      (opts.showWholesaleWarning ? WPUI.wholesaleWarning(deal) : '') +
      '</div></article>';
  },

  feedCard(deal) {
    const seller = WPDATA.sellers[deal.sellerId] || {};
    const handle = seller.tiktokHandle || (seller.handle && String(seller.handle).replace(/^@/, ''));
    const profileUrl = handle
      ? ((typeof WPDataLayer !== 'undefined') ? WPDataLayer.tiktokProfileUrl(handle) : 'https://www.tiktok.com/@' + handle)
      : 'deal.html?id=' + deal.id;
    const img = (typeof getDealImage === 'function') ? getDealImage(deal) : (deal.image || deal.imageUrl || '');
    const fallback = (typeof WPIMAGES !== 'undefined' && WPIMAGES.fallback) ? WPIMAGES.fallback : '/images/products/mens-sneakers.jpg';
    const poster = img || fallback;
    const price = deal.priceType === 'wholesale' ? deal.wholesalePrice : (deal.retailPrice || deal.wholesalePrice);
    const saved = (JSON.parse(localStorage.getItem('wikiprice-saved') || '[]')).indexOf(deal.id) >= 0;
    // Prefer profile when we only have placeholder video ids — still open TikTok visibly
    const videoLink = (deal.tiktokVideoId && handle && typeof WPDataLayer !== 'undefined' && String(deal.tiktokVideoId).length > 15)
      ? WPDataLayer.tiktokVideoUrl(handle, deal.tiktokVideoId)
      : profileUrl;
    const commentUrl = videoLink;
    const heartIcon = saved ? WPIcon('heartFilled', 22) : WPIcon('heart', 22);
    const alt = ((deal.name || 'Product') + ' — ' + (seller.businessName || seller.name || 'seller')).replace(/"/g, '&quot;');

    // Always show a real product poster (TikTok embeds are often blank in Uganda / with seed IDs)
    const mediaHtml =
      '<div class="feed-video" style="background-image:url(' + poster + ')">' +
      '<img src="' + poster + '" alt="' + alt + '" class="feed-poster" loading="lazy" decoding="async" ' +
      'onerror="this.onerror=null;this.src=\'' + fallback + '\';this.parentElement.style.backgroundImage=\'url(' + fallback + ')\'">' +
      '<a class="feed-video-play" href="' + videoLink + '" target="_blank" rel="noopener" aria-label="Open on TikTok">' +
      WPIcon('play', 28) + '</a>' +
      (handle ? '<span class="feed-tiktok-badge">' + WPIcon('tiktok', 14) + ' TikTok</span>' : '') +
      '</div>';

    return '<article class="feed-card" data-deal-id="' + deal.id + '">' +
      '<div class="feed-media">' + mediaHtml +
      '<div class="feed-side-actions" role="group" aria-label="Post actions">' +
      '<button type="button" class="feed-action' + (saved ? ' saved' : '') + '" data-save-deal="' + deal.id + '" aria-label="Save deal">' +
      '<span class="feed-action-icon">' + heartIcon + '</span><span>Save</span></button>' +
      '<a class="feed-action" href="' + commentUrl + '" target="_blank" rel="noopener" aria-label="Comment on TikTok">' +
      '<span class="feed-action-icon">' + WPIcon('comment', 22) + '</span><span>Comment</span></a>' +
      '<button type="button" class="feed-action" data-share-deal="' + deal.id + '" aria-label="Share deal">' +
      '<span class="feed-action-icon">' + WPIcon('share', 22) + '</span><span>Share</span></button>' +
      (handle
        ? '<a class="feed-action" href="' + profileUrl + '" target="_blank" rel="noopener" aria-label="Open seller on TikTok">' +
          '<span class="feed-action-icon">' + WPIcon('tiktok', 22) + '</span><span>TikTok</span></a>'
        : '') +
      '</div></div>' +
      '<div class="feed-body">' +
      '<div class="feed-seller-row">' +
      (handle
        ? WPUI.tiktokProfileLink(handle) + ' <span class="feed-dot">·</span> ' + WPUI.tiktokWordLink(handle)
        : '<strong>' + (seller.businessName || seller.name || 'Seller') + '</strong>') +
      '</div>' +
      '<div class="feed-price-row"><div class="feed-price">' + WikiPrice.formatUGX(price) + '</div>' +
      ((deal.lastVerified || seller.lastVerified)
        ? '<div class="feed-verified-beside">' + WikiPrice.daysAgo(deal.lastVerified || seller.lastVerified) + '</div>'
        : '') +
      '</div>' +
      '<div class="feed-meta"><a href="deal.html?id=' + deal.id + '" style="color:inherit;">' + deal.name + '</a> · ' +
      WPIcon('location', 14) + ' ' + (deal.location.arcade || '') + (deal.location.stall ? ', ' + deal.location.stall : '') + '</div>' +
      '<div class="feed-badges">' + WPUI.trustSignals(deal, seller) + '</div>' +
      '</div></article>';
  },

  emptyVerifiedExplainer() {
    return '<div class="empty-state-box">' +
      '<h3>How WikiPrice Verifies Deals</h3>' +
      '<p class="text-muted">We only list sellers after consent-based outreach and in-person physical verification — no scraping.</p>' +
      '<ol class="verify-steps">' +
      '<li><strong>Physical location</strong> — arcade/building with floor or stall number</li>' +
      '<li><strong>Video content</strong> — real products and shop, consistent posting</li>' +
      '<li><strong>Price transparency</strong> — clear, realistic prices</li>' +
      '<li><strong>Responsiveness</strong> — replies and contact info available</li>' +
      '</ol>' +
      '<p><a href="for-sellers.html" class="btn btn-accent">Nominate a seller</a> ' +
      '<a href="search.html" class="btn btn-outline">Browse sample deals</a></p>' +
      '</div>';
  },

  emptySearchState() {
    return '<div class="empty-state-box">' +
      '<h3>WikiPrice is growing — check back soon</h3>' +
      '<p class="text-muted">No deals match those filters right now. Know a trustworthy Kampala seller? Send them our way.</p>' +
      '<p><a href="for-sellers.html" class="btn btn-accent">Nominate a seller</a> ' +
      '<a href="community.html" class="btn btn-outline">Community</a></p>' +
      '</div>';
  },

  bottomNav(active) {
    const items = [
      { id: 'home', href: 'index.html', icon: 'shop', label: WikiPrice.t('home') },
      { id: 'discover', href: 'discover.html', icon: 'play', label: WikiPrice.t('discover') },
      { id: 'budget', href: 'budget-finder.html', icon: 'money', label: WikiPrice.t('budget') },
      { id: 'sellers', href: 'for-sellers.html', icon: 'users', label: WikiPrice.t('sellers') }
    ];
    return '<nav class="bottom-nav" aria-label="Primary mobile">' +
      items.map(item =>
        '<a href="' + item.href + '" class="bottom-nav-item' + (active === item.id ? ' active' : '') + '">' +
        WPIcon(item.icon, 22) + '<span>' + item.label + '</span></a>'
      ).join('') +
      '</nav>';
  },

  warningsHtml(warnings) {
    if (!warnings.length) return '';
    return warnings.map(w => {
      const cls = w.type === 'risk' ? 'warning-risk' : w.type === 'caution' ? 'warning-caution' : 'warning-info';
      return '<div class="warning-box ' + cls + ' icon-row">' + WPIcon(w.icon, 20) + '<span>' + w.text + '</span></div>';
    }).join('');
  },

  sectionTitle(icon, text) {
    return '<h2 class="section-title icon-row">' + WPIcon(icon, 22) + '<span>' + text + '</span></h2>';
  },

  header(active) {
    return '<header class="site-header">' +
      '<div class="header-inner">' +
      WPUI.logoHtml() +
      WPUI.searchBarHtml('header-search', WikiPrice.t('search')) +
      '<div class="header-actions">' +
      '<button id="lang-toggle" class="lang-toggle" type="button">LG</button>' +
      '<button id="data-saver-toggle" class="data-saver-toggle" type="button">Data Saver</button>' +
      '<button id="nav-toggle" class="nav-toggle" type="button" aria-label="Menu">' + WPIcon('menu', 22) + '</button>' +
      '</div></div>' +
      '<nav id="site-nav" class="site-nav">' +
      '<a class="nav-primary" href="index.html"' + (active === 'home' ? ' style="background:var(--bg)"' : '') + '>' + WikiPrice.t('home') + '</a>' +
      '<a class="nav-primary" href="search.html"' + (active === 'search' ? ' style="background:var(--bg)"' : '') + '>' + WikiPrice.t('findDeals') + '</a>' +
      '<a class="nav-primary nav-budget" href="budget-finder.html"' + (active === 'budget' ? ' style="background:var(--bg)"' : '') + '>' + WikiPrice.t('budgetFinder') + '</a>' +
      '<a class="nav-primary" href="for-sellers.html"' + (active === 'sellers' ? ' style="background:var(--bg)"' : '') + '>' + WikiPrice.t('forSellers') + '</a>' +
      '<span class="nav-divider" aria-hidden="true"></span>' +
      '<a href="discover.html"' + (active === 'discover' ? ' style="background:var(--bg)"' : '') + '>' + WikiPrice.t('discover') + '</a>' +
      '<a href="community.html"' + (active === 'community' ? ' style="background:var(--bg)"' : '') + '>' + WikiPrice.t('community') + '</a>' +
      '<a href="arcades.html"' + (active === 'arcades' ? ' style="background:var(--bg)"' : '') + '>Arcades</a>' +
      '<a href="about.html"' + (active === 'about' ? ' style="background:var(--bg)"' : '') + '>' + WikiPrice.t('about') + '</a>' +
      '<a href="safe-shopping.html"' + (active === 'safe' ? ' style="background:var(--bg)"' : '') + '>' + WikiPrice.t('safeShopping') + '</a>' +
      '<a href="contact.html"' + (active === 'contact' ? ' style="background:var(--bg)"' : '') + '>' + WikiPrice.t('contact') + '</a>' +
      '</nav></header>';
  },

  starRating(n) {
    let h = '<span class="review-stars">';
    for (let i = 1; i <= 5; i++) {
      h += '<span class="star-rating' + (i <= n ? ' filled' : '') + '">' + WPIcon('star', 16) + '</span>';
    }
    return h + '</span>';
  },

  trendIndicator(trend) {
    const icon = trend.dir === 'up' ? 'arrowUp' : trend.dir === 'down' ? 'arrowDown' : 'arrowRight';
    return '<span class="trend-indicator ' + trend.cls + '">' + WPIcon(icon, 16) + ' ' + trend.label + '</span>';
  },

  sectionHeading(icon, text) {
    return '<h2 class="icon-row">' + WPIcon(icon, 22) + '<span>' + text + '</span></h2>';
  },

  footer() {
    return '<footer class="site-footer">' +
      '<div class="footer-grid container">' +
      '<div><img src="images/logo.png" alt="WikiPrice" style="height:36px;margin-bottom:12px;filter:brightness(0) invert(1);opacity:0.9;"><p>Know Your Price, Save Your Money. Kampala\'s trusted price intelligence platform.</p>' +
      '<div class="footer-social">' +
      '<a href="https://www.tiktok.com/@WikiPriceUG" target="_blank" rel="noopener" title="TikTok">' + WPIcon('tiktok', 20) + '</a>' +
      '<a href="https://wa.me/256700000000" target="_blank" rel="noopener" title="WhatsApp">' + WPIcon('whatsapp', 20) + '</a>' +
      '<a href="https://linkedin.com/company/wikiprice" target="_blank" rel="noopener" title="LinkedIn">' + WPIcon('linkedin', 20) + '</a>' +
      '<a href="https://facebook.com/wikipriceug" target="_blank" rel="noopener" title="Facebook">' + WPIcon('facebook', 20) + '</a>' +
      '<a href="https://youtube.com/@WikiPriceUG" target="_blank" rel="noopener" title="YouTube">' + WPIcon('youtube', 20) + '</a>' +
      '</div><p style="margin-top:12px;font-size:0.85rem;"><a href="https://www.tiktok.com/@WikiPriceUG" target="_blank" rel="noopener">Follow us on TikTok @WikiPriceUG</a></p></div>' +
      '<div><h4>Quick Links</h4><p><a href="search.html">Find Deals</a></p><p><a href="discover.html">Discover</a></p><p><a href="budget-finder.html">Budget Finder</a></p><p><a href="for-sellers.html">List Your Business</a></p></div>' +
      '<div><h4>Connect</h4><p><a href="https://wa.me/256700000000">WhatsApp</a></p><p><a href="https://www.tiktok.com/@WikiPriceUG" target="_blank" rel="noopener">TikTok @WikiPriceUG</a></p><p><a href="contact.html">Contact Us</a></p></div>' +
      '</div>' +
      '<div class="footer-bottom"><p>&copy; 2026 WikiPrice Uganda. Built for Kampala shoppers.</p><p class="page-weight" id="page-weight"></p></div>' +
      '</footer>';
  },

  pageWeight() {
    const kb = Math.round(performance.getEntriesByType('navigation')[0]?.transferSize / 1024 || 850);
    const el = document.getElementById('page-weight');
    if (el) el.textContent = 'This page is ~' + kb + 'KB, about the size of ' + Math.max(1, Math.round(kb / 400)) + ' WhatsApp photos.';
  },

  showToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--text);color:white;padding:12px 20px;border-radius:8px;z-index:999;font-size:0.9rem;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  },

  reportModal(dealId) {
    const reasons = ['Price is fake or bait and switch', 'Seller has no physical shop', 'Seller took payment and did not deliver', 'Product quality worse than described', 'Seller is harassing or abusive'];
    const html = '<div id="report-modal" style="position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;">' +
      '<div style="background:white;border-radius:12px;padding:24px;max-width:400px;width:100%;">' +
      '<h3 class="icon-row" style="margin:0 0 16px;">' + WPIcon('flag', 22) + '<span>Report Suspicious</span></h3>' +
      reasons.map((r) => '<button class="btn btn-outline btn-block btn-sm" style="margin-bottom:8px;" onclick="WPUI.submitReport(\'' + dealId + '\',\'' + r.replace(/'/g, "\\'") + '\')">' + r + '</button>').join('') +
      '<button class="btn btn-sm" onclick="document.getElementById(\'report-modal\').remove()">Cancel</button></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
  },

  submitReport(dealId, reason) {
    document.getElementById('report-modal')?.remove();
    const reports = JSON.parse(localStorage.getItem('wikiprice-reports') || '[]');
    reports.push({ dealId, reason, date: new Date().toISOString() });
    localStorage.setItem('wikiprice-reports', JSON.stringify(reports));
    WPUI.showToast('Report submitted. WikiPrice team will investigate.');
  },

  confirmPrice(dealId) {
    const confirms = JSON.parse(localStorage.getItem('wikiprice-confirms') || '[]');
    confirms.push({ dealId, date: new Date().toISOString() });
    localStorage.setItem('wikiprice-confirms', JSON.stringify(confirms));
    WPUI.showToast('Thanks! Price confirmation recorded.');
  },

  saveDeal(dealId) {
    const saved = JSON.parse(localStorage.getItem('wikiprice-saved') || '[]');
    if (!saved.includes(dealId)) saved.push(dealId);
    localStorage.setItem('wikiprice-saved', JSON.stringify(saved));
    WPUI.showToast('Deal saved to your list!');
  }
};
