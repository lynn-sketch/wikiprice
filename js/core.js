/* WikiPrice Core — utilities, risk scoring, search, i18n */
const WikiPrice = (function () {
  // Fallback strings; overwritten by data/i18n/{en,lg,sw}.json when available
  const LANG = {
    en: {},
    lg: {},
    sw: {}
  };

  // Embedded seed (used before/without fetch). // TODO: keep in sync with data/i18n/*.json
  const EMBEDDED = {
    en: {
      verified: 'Verified', deal: 'Deal', wholesale: 'Wholesale', retail: 'Retail',
      search: 'Search deals...', budgetFinder: 'Budget Finder', viewDeal: 'View Deal',
      contactWhatsApp: 'Contact on WhatsApp', saveDeal: 'Save Deal', reportPrice: 'Report Price Changed',
      confirmPrice: 'Confirm Price', shareDeal: 'Share Deal', trustedSeller: 'Trusted Seller',
      cautionAdvised: 'Caution Advised', highRisk: 'High Risk', inStock: 'In Stock',
      limitedStock: 'Limited Stock', callToConfirm: 'Call to Confirm', outOfStock: 'Out of Stock',
      retailOnly: 'Retail Only', wholesaleOnly: 'Wholesale Only', both: 'Retail & Wholesale',
      communityVerified: 'Community Verified', mentionedTiktok: 'Mentioned on TikTok',
      dataSaver: 'Data Saver', dataSaverOff: 'Full Mode',
      wholesaleWarning: 'Wholesale price requires minimum purchase of {qty} pieces. Total cost would be UGX {total}.',
      showRetailOnly: 'Show retail only', knowYourPrice: 'Know Your Price, Save Your Money',
      findDeals: 'Find Deals', forSellers: 'For Sellers', home: 'Home', discover: 'Discover',
      budget: 'Budget', sellers: 'Sellers', allCategories: 'All Categories',
      nominateSeller: 'Nominate a seller', bestDeal: 'Best Deal',
      priceMayBeOutdated: 'Price may be outdated', community: 'Community', about: 'About',
      contact: 'Contact', safeShopping: 'Safe Shopping'
    },
    lg: {
      verified: 'Kakasidwa', deal: 'Ddiiru', wholesale: 'Mubungi bungi', retail: 'Kutunda kitono',
      search: 'Noonya ddiiru...', budgetFinder: 'Noonya ku bajeti', viewDeal: 'Laba Ddiiru',
      contactWhatsApp: 'Wuliza ku WhatsApp', saveDeal: 'Tereka', reportPrice: 'Laga nti ssente zakyuka',
      confirmPrice: 'Kakasa omuwendo', shareDeal: 'Gabana', trustedSeller: 'Omusuubuzi Omwesigwa',
      cautionAdvised: 'Weegendereza', highRisk: 'Obulabe Bungi', inStock: 'Eriwo',
      limitedStock: 'Ebitono', callToConfirm: 'Kubira okukakasa', outOfStock: 'Tekiriwo',
      retailOnly: 'Kitono Bukka', wholesaleOnly: 'Mubungi Bungi', both: 'Kitono ne Bungi',
      communityVerified: 'Abantu Bakakase', mentionedTiktok: 'Kyogerwako ku TikTok',
      dataSaver: 'Tereka Data', dataSaverOff: 'Full Mode',
      wholesaleWarning: 'Mubungi bungi yeetaaga okugula {qty} obutundu. Omugatte UGX {total}.',
      showRetailOnly: 'Laga kitono bukka', knowYourPrice: 'Manya Omuwendo, Ssaawo Ssente',
      findDeals: 'Noonya Ddiiru', forSellers: 'Ku Basuubuzi', home: 'Awaka', discover: 'Zuula',
      budget: 'Bajeti', sellers: 'Basuubuzi', allCategories: 'Ebika Byonna',
      nominateSeller: 'Londa omusuubuzi', bestDeal: 'Ddiiru Esinga',
      priceMayBeOutdated: 'Omuwendo guyinza okuba ogukadde', community: 'Abantu', about: 'Kukwata ku',
      contact: 'Tuukirira', safeShopping: 'Kugula kwa Bulamu'
      // TODO: needs native speaker review
    },
    sw: {
      verified: 'Imethibitishwa', deal: 'Ofa', wholesale: 'Jumla', retail: 'Rejareja',
      search: 'Tafuta ofa...', budgetFinder: 'Kitafuta Bajeti', viewDeal: 'Angalia Ofa',
      contactWhatsApp: 'Wasiliana WhatsApp', saveDeal: 'Hifadhi', reportPrice: 'Ripoti bei imebadilika',
      confirmPrice: 'Thibitisha bei', shareDeal: 'Shiriki', trustedSeller: 'Muuzaji Anayeaminika',
      cautionAdvised: 'Tahadhari', highRisk: 'Hatari Kubwa', inStock: 'Inapatikana',
      limitedStock: 'Stock chache', callToConfirm: 'Piga thibitisha', outOfStock: 'Haipatikani',
      retailOnly: 'Rejareja tu', wholesaleOnly: 'Jumla tu', both: 'Rejareja na Jumla',
      communityVerified: 'Jamii Imethibitisha', mentionedTiktok: 'Imetajwa TikTok',
      dataSaver: 'Hifadhi Data', dataSaverOff: 'Hali Kamili',
      wholesaleWarning: 'Bei ya jumla inahitaji ununuzi wa angalau vipande {qty}. Jumla UGX {total}.',
      showRetailOnly: 'Onyesha rejareja tu', knowYourPrice: 'Jua Bei Yako, Okoa Pesa',
      findDeals: 'Tafuta Ofa', forSellers: 'Kwa Wauzaji', home: 'Nyumbani', discover: 'Gundua',
      budget: 'Bajeti', sellers: 'Wauzaji', allCategories: 'Kategoria Zote',
      nominateSeller: 'Pendekeza muuzaji', bestDeal: 'Ofa Bora',
      priceMayBeOutdated: 'Bei inaweza kuwa ya zamani', community: 'Jamii', about: 'Kuhusu',
      contact: 'Wasiliana', safeShopping: 'Ununuzi Salama'
      // TODO: needs native speaker review
    }
  };

  Object.assign(LANG.en, EMBEDDED.en);
  Object.assign(LANG.lg, EMBEDDED.lg);
  Object.assign(LANG.sw, EMBEDDED.sw);

  let currentLang = localStorage.getItem('wikiprice-lang') || 'en';
  if (!LANG[currentLang]) currentLang = 'en';
  let dataSaver = localStorage.getItem('wikiprice-data-saver') === 'true';
  const LANG_CYCLE = ['en', 'lg', 'sw'];

  function t(key, vars) {
    let s = (LANG[currentLang] && LANG[currentLang][key]) || LANG.en[key] || key;
    if (vars) Object.keys(vars).forEach(k => { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }

  function loadI18nFiles() {
    return Promise.all(['en', 'lg', 'sw'].map(code =>
      fetch('data/i18n/' + code + '.json', { cache: 'no-cache' })
        .then(r => r.ok ? r.json() : null)
        .catch(() => null)
        .then(json => {
          if (json) {
            const clean = Object.assign({}, json);
            delete clean._meta;
            LANG[code] = Object.assign({}, LANG[code] || {}, clean);
          }
        })
    ));
  }

  function formatUGX(n) {
    return 'UGX ' + Number(n).toLocaleString('en-UG');
  }

  function daysAgo(dateStr) {
    const d = new Date(dateStr);
    const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
    if (diff === 0) return 'Last verified today';
    if (diff === 1) return 'Last verified 1 day ago';
    return 'Last verified ' + diff + ' days ago';
  }

  function getDisplayPrice(deal, preferRetail) {
    if (deal.priceType === 'wholesale' && !preferRetail) {
      return { price: deal.wholesalePrice, type: 'wholesale', qty: deal.minQuantity };
    }
    if (deal.priceType === 'retail' || preferRetail) {
      return { price: deal.retailPrice, type: 'retail', qty: 1 };
    }
    return { price: deal.retailPrice, type: 'both', qty: 1 };
  }

  function getBaseline(category, subCategory) {
    const b = WPDATA.baselines.find(x =>
      x.category === category && (x.subCategory === subCategory || !x.subCategory)
    );
    return b || { min: 0, max: 999999999 };
  }

  function calculateRiskScore(deal, seller) {
    let score = 0;
    const flags = [];

    // Physical location (15%)
    if (deal.location.arcade && deal.location.stall) score += 15;
    else if (deal.location.arcade) score += 8;
    else flags.push('no-location');

    // Location specificity (10%)
    if (deal.location.floor && deal.location.landmark) score += 10;
    else if (deal.location.building) score += 5;

    // Price vs market (20%)
    const baseline = getBaseline(deal.category, deal.subCategory);
    const avg = (baseline.min + baseline.max) / 2;
    const price = deal.retailPrice;
    if (avg > 0) {
      const ratio = price / avg;
      if (ratio >= 0.8) score += 20;
      else if (ratio >= 0.5) score += 10;
      else { score += 0; flags.push('low-price'); }
      if (ratio < 0.5) flags.push('scam-price');
      if (ratio < 0.6) flags.push('abnormally-low');
    } else score += 10;

    // Account age (10%)
    if (seller && seller.accountAgeMonths >= 6) score += 10;
    else if (seller && seller.accountAgeMonths >= 3) score += 5;
    else if (seller && seller.accountAgeMonths < 1) flags.push('new-account');

    // Followers (5%)
    if (seller && seller.tiktokFollowers >= 1000) score += 5;
    else if (seller && seller.tiktokFollowers >= 100) score += 2;

    // Video history (10%)
    if (seller && seller.shopShownInVideos) score += 10;

    // Contact info (10%) — missing contact is a flag; "phone-only bio" is separate scam signal
    if (seller && (seller.phone || seller.whatsapp)) score += 10;
    else flags.push('no-contact');

    // User reports (10%)
    if (seller && seller.scamReports === 0) score += 10;
    else if (seller && seller.scamReports < 3) score += 3;
    else flags.push('scam-reports');

    // Verification source (10%)
    if (deal.verificationStatus === 'verified' && deal.verificationMethod === 'physical') score += 10;
    else if (deal.verificationStatus === 'verified') score += 6;
    else score += 2;

    // Part 4 scam signals
    if (typeof WPVerification !== 'undefined') {
      if (WPVerification.isNationwideNoFixedLocation(seller, deal)) flags.push('nationwide-no-location');
      if (WPVerification.isPhoneOnlyBio(seller)) flags.push('phone-only-bio');
      if (WPVerification.isPriceStale(deal)) flags.push('stale-price');
      if (WPVerification.isNewAccount(seller)) flags.push('new-account');
    } else {
      if (seller && seller.accountAgeMonths < 1) flags.push('new-account');
    }

  // Auto triggers
    if (flags.includes('scam-price')) flags.push('auto-high-risk');
    if (flags.includes('nationwide-no-location') || flags.includes('phone-only-bio')) flags.push('auto-high-risk');
    if (!deal.location.arcade || deal.location.arcade === 'Kampala') flags.push('vague-location');
    if (seller && seller.scamReports >= 3) flags.push('auto-high-risk');

    const autoHighRisk = flags.filter(f =>
      ['scam-price', 'auto-high-risk', 'scam-reports', 'nationwide-no-location', 'phone-only-bio'].includes(f)
    ).length >= 2;

    let label, badgeClass, message;
    if (autoHighRisk || score < 50) {
      label = 'High Risk'; badgeClass = 'badge-danger'; message = 'Suspected scam. No verified location. Avoid paying upfront.';
    } else if (score < 80) {
      label = 'Caution Advised'; badgeClass = 'badge-caution'; message = 'Price seems low. We recommend visiting in person.';
    } else {
      label = 'Trusted Seller'; badgeClass = 'badge-verified'; message = 'WikiPrice verified. Physical shop confirmed.';
    }

    return { score, label, badgeClass, message, flags, autoHighRisk };
  }

  function calculateTrustScore(seller) {
    let score = 0;
    if (seller.verificationHistory >= 80) score += 50;
    else score += seller.verificationHistory * 0.5;
    score += (seller.avgRating / 5) * 30;
    if (seller.responseTimeHours <= 2) score += 10;
    else if (seller.responseTimeHours <= 24) score += 5;
    const months = seller.platformMonths || 12;
    score += Math.min(10, months * 0.5);
    score = Math.round(Math.min(100, score));
    let adj;
    if (score >= 90) adj = 'Excellent';
    else if (score >= 75) adj = 'Good';
    else if (score >= 50) adj = 'Average';
    else adj = 'Poor';
    return { score, adj };
  }

  function searchDeals(query, filters) {
    const q = (query || '').toLowerCase().trim();
    const synonyms = {
      engatto: 'shoes', shoes: 'shoes', sneakers: 'sneakers',
      tv: 'television', phone: 'smartphone', perfume: 'perfume'
    };
    let expanded = q;
    Object.keys(synonyms).forEach(k => {
      if (q.includes(k)) expanded += ' ' + synonyms[k];
    });

    const pool = (typeof WPDataLayer !== 'undefined' && WPDataLayer.getSearchableDeals)
      ? WPDataLayer.getSearchableDeals()
      : WPDATA.deals;

    return pool.filter(deal => {
      const seller = WPDATA.sellers[deal.sellerId];
      const text = [
        deal.name, deal.category, deal.subCategory,
        deal.location.arcade, deal.location.building, deal.location.stall,
        seller?.name, seller?.tiktokHandle, deal.source
      ].join(' ').toLowerCase();

      if (q && !text.includes(q) && !expanded.split(' ').some(w => w.length > 2 && text.includes(w))) return false;

      if (filters) {
        if (filters.priceType && filters.priceType !== 'all') {
          if (filters.priceType === 'retail' && deal.priceType !== 'retail') return false;
          if (filters.priceType === 'wholesale' && deal.priceType !== 'wholesale') return false;
          if (filters.priceType === 'both' && deal.priceType !== 'both') return false;
        }
        if (filters.retailOnly && deal.priceType === 'wholesale') return false;
        if (filters.category && deal.category !== filters.category) return false;
        if (filters.subCategory && deal.subCategory !== filters.subCategory) return false;
        if (filters.location && deal.location.arcade !== filters.location) return false;
        if (filters.verifiedOnly && deal.verificationStatus !== 'verified') return false;
        if (filters.inStockOnly && deal.stockStatus === 'out-of-stock') return false;
        if (filters.hasTiktok && !seller?.tiktokHandle) return false;
        if (filters.source && deal.source !== filters.source) return false;
        if (filters.minPrice && deal.retailPrice < filters.minPrice) return false;
        if (filters.maxPrice && deal.retailPrice > filters.maxPrice) return false;
        if (filters.minQty) {
          const mq = deal.minQuantity || 1;
          if (filters.minQty === '1-5' && mq > 5) return false;
          if (filters.minQty === '6-10' && (mq < 6 || mq > 10)) return false;
          if (filters.minQty === '11-20' && (mq < 11 || mq > 20)) return false;
          if (filters.minQty === '20+' && mq <= 20) return false;
        }
        if (filters.trustMin) {
          const trust = calculateTrustScore(seller || { verificationHistory: 50, avgRating: 3, responseTimeHours: 24, platformMonths: 6 });
          if (trust.score < filters.trustMin) return false;
        }
      }
      return true;
    });
  }

  function sortDeals(deals, sortBy) {
    const sorted = [...deals];
    const freshness = (d) => (d.freshnessRankPenalty || 0) + ((d.priceMayBeOutdated) ? 500 : 0);
    switch (sortBy) {
      case 'price-low': return sorted.sort((a, b) => freshness(a) - freshness(b) || a.retailPrice - b.retailPrice);
      case 'price-high': return sorted.sort((a, b) => freshness(a) - freshness(b) || b.retailPrice - a.retailPrice);
      case 'trust': return sorted.sort((a, b) => {
        const sa = WPDATA.sellers[a.sellerId];
        const sb = WPDATA.sellers[b.sellerId];
        return freshness(a) - freshness(b) ||
          calculateTrustScore(sb || {}).score - calculateTrustScore(sa || {}).score;
      });
      case 'nearest':
        if (typeof WPGeo !== 'undefined' && WPGeo.userPos) {
          return WPGeo.sortByNearest(sorted).sort((a, b) => freshness(a) - freshness(b));
        }
        return sorted.sort((a, b) => freshness(a) - freshness(b) || new Date(b.lastVerified) - new Date(a.lastVerified));
      default: return sorted.sort((a, b) => freshness(a) - freshness(b) || new Date(b.lastVerified) - new Date(a.lastVerified));
    }
  }

  function budgetFinder(amount, retailOnly, category) {
    const filters = { retailOnly: retailOnly, maxPrice: amount };
    if (category && category !== 'all' && category !== 'All Categories') {
      filters.category = category;
    }
    return searchDeals('', filters).filter(d => {
      if (category && category !== 'all' && category !== 'All Categories' && d.category !== category) return false;
      if (retailOnly) return d.retailPrice <= amount;
      const eff = d.priceType === 'wholesale' ? d.wholesalePrice : d.retailPrice;
      return eff <= amount || d.retailPrice <= amount;
    });
  }

  function whatsappLink(phone, deal) {
    const num = (phone || '').replace(/\D/g, '');
    const msg = encodeURIComponent(
      'Hi, I saw your ' + deal.name + ' on WikiPrice for ' + formatUGX(deal.retailPrice) + '. Is it still available?'
    );
    return 'https://wa.me/' + num + '?text=' + msg;
  }

  function getSubCategories(category) {
    return WPDATA.categories[category] || [];
  }

  function getDealWarnings(deal, seller, risk) {
    const warnings = [];
    if (deal.priceMayBeOutdated || (typeof WPVerification !== 'undefined' && WPVerification.isPriceStale(deal))) {
      warnings.push({
        type: 'caution',
        icon: 'clock',
        text: 'Price may be outdated. This price has not been re-confirmed within 30 days. Ask the seller to confirm before buying — it is not eligible for Best Deal until re-verified.'
      });
    }
    if (!deal.location.arcade || deal.location.arcade === 'Kampala') {
      warnings.push({ type: 'info', icon: 'location', text: 'Location Not Verified. This seller has not provided a specific arcade, building, or stall number. Legitimate Kikuubo sellers usually have a fixed location. Proceed with caution.' });
    }
    if (seller && !seller.physicalShop && deal.location.arcade === 'Kampala') {
      warnings.push({ type: 'caution', icon: 'phone', text: 'Online-Only Seller. This seller has not provided a physical shop location. We recommend paying only on delivery and never upfront. Ask for a video call to see the product before paying.' });
    }
    if (risk.flags && (risk.flags.includes('nationwide-no-location'))) {
      warnings.push({ type: 'risk', icon: 'warning', text: 'Nationwide delivery with no fixed shop location is a scam-warning signal. Prefer sellers with a verified arcade/stall.' });
    }
    if (risk.flags && risk.flags.includes('phone-only-bio')) {
      warnings.push({ type: 'risk', icon: 'warning', text: 'Phone-number-only bio with no clear shop name is a scam-warning signal.' });
    }
    if (risk.flags.includes('abnormally-low') || risk.flags.includes('low-price') || risk.flags.includes('scam-price')) {
      const avg = (getBaseline(deal.category, deal.subCategory).min + getBaseline(deal.category, deal.subCategory).max) / 2;
      warnings.push({ type: 'risk', icon: 'money', text: 'Price Alert: Unusually Low. This price is significantly below the Kampala market average of ' + formatUGX(avg) + '. Scammers sometimes use extremely low prices to attract buyers. Verify the seller has a physical shop before paying.' });
    }
    if (seller && seller.accountAgeMonths < 3) {
      warnings.push({ type: 'caution', icon: 'new', text: 'New Seller. This account was created recently. We recommend starting with a small purchase or visiting their physical shop before larger transactions.' });
    }
    if (risk.autoHighRisk) {
      warnings.push({ type: 'risk', icon: 'warning', text: 'This seller has multiple scam indicators. We strongly recommend physical pickup and cash payment only.' });
    }
    if (deal.imageConfirmed !== true && !(typeof hasCuratedProductImage === 'function' && hasCuratedProductImage(deal))) {
      warnings.push({ type: 'info', icon: 'warning', text: 'Seller photo not yet confirmed for this listing.' });
    }
    return warnings;
  }

  function setLang(lang) {
    if (!LANG[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('wikiprice-lang', lang);
    document.documentElement.lang = lang === 'lg' ? 'lg' : lang;
  }

  function nextLang() {
    const i = LANG_CYCLE.indexOf(currentLang);
    return LANG_CYCLE[(i + 1) % LANG_CYCLE.length];
  }

  function langLabel() {
    return ({ en: 'EN', lg: 'LG', sw: 'SW' })[currentLang] || 'EN';
  }

  function setDataSaver(on) {
    dataSaver = on;
    localStorage.setItem('wikiprice-data-saver', on ? 'true' : 'false');
    document.body.classList.toggle('data-saver', on);
  }

  function bottomNavActiveFromPath() {
    const p = (location.pathname || '').toLowerCase();
    if (p.indexOf('discover') >= 0) return 'discover';
    if (p.indexOf('budget') >= 0) return 'budget';
    if (p.indexOf('for-sellers') >= 0) return 'sellers';
    if (p.indexOf('search') >= 0 || p.indexOf('deal') >= 0 || p.indexOf('seller') >= 0) return '';
    if (p.indexOf('index') >= 0 || /\/(wikiprice)?\/?$/.test(p) || p.endsWith('/')) return 'home';
    return '';
  }

  function initGlobal(activeBottom) {
    if (typeof WikiPrice !== 'undefined' && WikiPrice.loadI18nFiles) {
      WikiPrice.loadI18nFiles().catch(function () {});
    }
    document.body.classList.toggle('data-saver', dataSaver);
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.textContent = langLabel();
      langBtn.setAttribute('aria-label', 'Language: ' + currentLang);
      langBtn.onclick = () => {
        setLang(nextLang());
        location.reload();
      };
    }
    const dsBtn = document.getElementById('data-saver-toggle');
    if (dsBtn) {
      dsBtn.textContent = dataSaver ? t('dataSaver') : t('dataSaverOff');
      dsBtn.onclick = () => {
        setDataSaver(!dataSaver);
        dsBtn.textContent = dataSaver ? t('dataSaver') : t('dataSaverOff');
      };
    }
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('site-nav');
    if (navToggle && nav) {
      navToggle.onclick = () => nav.classList.toggle('open');
    }
    if (typeof WPUI !== 'undefined' && WPUI.bottomNav && !document.getElementById('bottom-nav-root')) {
      const active = activeBottom != null ? activeBottom : bottomNavActiveFromPath();
      const wrap = document.createElement('div');
      wrap.id = 'bottom-nav-root';
      wrap.innerHTML = WPUI.bottomNav(active);
      document.body.appendChild(wrap);
      document.body.classList.add('has-bottom-nav');
    }
  }

  function getPriceTrend(history) {
    if (!history || history.length < 2) return { dir: 'stable', label: 'Stable', cls: 'trend-stable' };
    const recent = history[0].price;
    const older = history[history.length - 1].price;
    if (recent < older) return { dir: 'down', label: 'Decreasing', cls: 'trend-down' };
    if (recent > older) return { dir: 'up', label: 'Increasing', cls: 'trend-up' };
    return { dir: 'stable', label: 'Stable', cls: 'trend-stable' };
  }

  function getBestPriceMonths(history) {
    if (!history || history.length < 2) return null;
    const min = Math.min(...history.map(h => h.price));
    const current = history[0].price;
    if (current <= min) {
      const months = history.length;
      return 'Best price in ' + months + ' months';
    }
    return null;
  }

  function shareSMS(deal) {
    return 'WikiPrice: ' + deal.name + ' - ' + formatUGX(deal.retailPrice) + ' at ' + deal.location.arcade + '. ' + location.origin + '/deal.html?id=' + deal.id;
  }

  function searchSuggestions(query, limit) {
    const q = query.toLowerCase().trim();
    const results = [];
    const seen = new Set();
    WPDATA.deals.forEach(d => {
      if (results.length >= limit) return;
      const seller = WPDATA.sellers[d.sellerId];
      const text = [d.name, d.category, d.subCategory, d.location.arcade, seller?.name, seller?.tiktokHandle].join(' ').toLowerCase();
      if (text.includes(q) && !seen.has(d.id)) {
        seen.add(d.id);
        results.push({ label: d.name, meta: formatUGX(d.retailPrice || d.wholesalePrice) + ' · ' + d.location.arcade, url: 'deal.html?id=' + d.id });
      }
    });
    Object.values(WPDATA.sellers).forEach(s => {
      if (results.length >= limit) return;
      const text = [s.name, s.tiktokHandle, s.about].join(' ').toLowerCase();
      if (text.includes(q) && !seen.has('s-' + s.id)) {
        seen.add('s-' + s.id);
        results.push({ label: s.name, meta: s.tiktokHandle ? '@' + s.tiktokHandle : 'Seller', url: 'seller.html?id=' + s.id });
      }
    });
    return results;
  }

  function formatFollowers(n) {
    if (!n) return '0';
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'K';
    return String(n);
  }

  return {
    t, formatUGX, daysAgo, getDisplayPrice, calculateRiskScore, calculateTrustScore,
    searchDeals, sortDeals, budgetFinder, whatsappLink, getSubCategories,
    getDealWarnings, initGlobal, getPriceTrend, getBestPriceMonths, shareSMS,
    getLang: () => currentLang, isDataSaver: () => dataSaver,
    searchSuggestions, formatFollowers, loadI18nFiles, setLang, langLabel,
    isPriceStale: (deal) => (typeof WPVerification !== 'undefined' ? WPVerification.isPriceStale(deal) : false)
  };
})();
