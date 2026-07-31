/* UI enhancements — autocomplete, animated stats, TikTok embeds */
const WPUIEnhance = {
  initSearchAutocomplete(inputEl, suggestionsEl) {
    if (!inputEl) return;
    let debounce;
    inputEl.addEventListener('input', function () {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const q = inputEl.value.trim();
        if (q.length < 2) {
          if (suggestionsEl) { suggestionsEl.classList.remove('open'); suggestionsEl.innerHTML = ''; }
          return;
        }
        const results = WikiPrice.searchSuggestions(q, 8);
        if (!suggestionsEl) return;
        if (!results.length) {
          suggestionsEl.innerHTML = '<div class="search-suggestion">No matches — try "shoes" or "TV"</div>';
        } else {
          suggestionsEl.innerHTML = results.map(r =>
            '<a class="search-suggestion" href="' + r.url + '">' + r.label + '<small>' + r.meta + '</small></a>'
          ).join('');
        }
        suggestionsEl.classList.add('open');
      }, 200);
    });
    document.addEventListener('click', e => {
      if (suggestionsEl && !inputEl.contains(e.target) && !suggestionsEl.contains(e.target)) {
        suggestionsEl.classList.remove('open');
      }
    });
  },

  initAllSearchBars() {
    document.querySelectorAll('[data-search-autocomplete]').forEach(wrap => {
      const input = wrap.querySelector('input[type="search"]');
      const sug = wrap.querySelector('.search-suggestions');
      WPUIEnhance.initSearchAutocomplete(input, sug);
    });
  },

  animateCounters() {
    const els = document.querySelectorAll('[data-count-to]');
    if (!els.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.countTo);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          const val = Math.floor(target * (1 - Math.pow(1 - p, 3)));
          el.textContent = prefix + val.toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.3 });
    els.forEach(el => observer.observe(el));
  },

  renderStatsGrid(container, stats) {
    if (!container) return;
    const meta = (WPDATA && WPDATA.meta) || {};
    const liveDeals = stats.verifiedDeals != null ? stats.verifiedDeals : 0;
    const liveSellers = stats.sellers != null ? stats.sellers : 0;
    const usersLive = meta.usersLive === true && stats.users != null;
    const savingsLive = meta.savingsLive === true && stats.totalSavings != null;

    let html =
      '<div class="stat-card stat-live"><div class="stat-icon-wrap">' + WPIcon('tag', 32) + '</div>' +
      '<div class="stat-number" data-count-to="' + liveDeals + '">0</div>' +
      '<div class="stat-label">Verified deals</div>' +
      '<div class="stat-tag">Live catalog</div></div>' +
      '<div class="stat-card stat-live"><div class="stat-icon-wrap">' + WPIcon('shop', 32) + '</div>' +
      '<div class="stat-number" data-count-to="' + liveSellers + '">0</div>' +
      '<div class="stat-label">Verified sellers</div>' +
      '<div class="stat-tag">Live · real count</div></div>';

    if (usersLive) {
      html +=
        '<div class="stat-card stat-live"><div class="stat-icon-wrap">' + WPIcon('users', 32) + '</div>' +
        '<div class="stat-number" data-count-to="' + stats.users + '">0</div>' +
        '<div class="stat-label">Users</div><div class="stat-tag">Live</div></div>';
    } else {
      html +=
        '<div class="stat-card stat-illustrative"><div class="stat-icon-wrap">' + WPIcon('users', 32) + '</div>' +
        '<div class="stat-number stat-placeholder">—</div>' +
        '<div class="stat-label">Users</div><div class="stat-tag">Illustrative — coming soon</div></div>';
    }

    if (savingsLive) {
      html +=
        '<div class="stat-card stat-live"><div class="stat-icon-wrap">' + WPIcon('money', 32) + '</div>' +
        '<div class="stat-number" data-count-to="' + Math.round(stats.totalSavings / 1000000) + '" data-prefix="UGX " data-suffix="M+">0</div>' +
        '<div class="stat-label">Total savings</div><div class="stat-tag">Live</div></div>';
    } else {
      html +=
        '<div class="stat-card stat-illustrative"><div class="stat-icon-wrap">' + WPIcon('money', 32) + '</div>' +
        '<div class="stat-number stat-placeholder">—</div>' +
        '<div class="stat-label">Total savings</div><div class="stat-tag">Illustrative — coming soon</div></div>';
    }

    html += '<p class="stats-disclaimer" style="grid-column:1/-1;">Showing real catalog counts only. Users and savings stay blank until we have real analytics — we do not invent large numbers.</p>';
    container.innerHTML = html;
    WPUIEnhance.animateCounters();
  },

  showSkeletons(container, count, type) {
    if (!container) return;
    count = count || 3;
    type = type || 'card';
    if (type === 'feed') {
      container.innerHTML = Array.from({ length: count }, () =>
        '<div class="skeleton-feed" aria-hidden="true">' +
        '<div class="skeleton skeleton-media"></div>' +
        '<div class="skeleton-feed-body"><div class="skeleton skeleton-line w60"></div>' +
        '<div class="skeleton skeleton-line w40"></div></div></div>'
      ).join('');
    } else if (type === 'list') {
      container.innerHTML = Array.from({ length: count }, () =>
        '<div class="skeleton-card" aria-hidden="true">' +
        '<div class="skeleton skeleton-img"></div>' +
        '<div class="skeleton-card-body"><div class="skeleton skeleton-line"></div>' +
        '<div class="skeleton skeleton-line w60"></div>' +
        '<div class="skeleton skeleton-line w40"></div></div></div>'
      ).join('');
    } else {
      container.innerHTML = Array.from({ length: count }, () =>
        '<div class="skeleton-card" aria-hidden="true">' +
        '<div class="skeleton skeleton-img"></div>' +
        '<div class="skeleton-card-body"><div class="skeleton skeleton-line"></div>' +
        '<div class="skeleton skeleton-line w70"></div>' +
        '<div class="skeleton skeleton-line w50"></div></div></div>'
      ).join('');
    }
  },

  initDiscoveryFeed(container, opts) {
    if (!container) return;
    opts = opts || {};
    const pageSize = opts.pageSize || 3;
    const pool = (typeof WPDataLayer !== 'undefined' && WPDataLayer.getSearchableDeals)
      ? WPDataLayer.getSearchableDeals()
      : (WPDATA.deals || []);
    let deals = WikiPrice.sortDeals(
      pool.filter(d => d.verificationStatus !== 'scam-warning' && d.id !== 'scam-iphone' && !d.demoOnly),
      'newest'
    );
    // Discovery first: TikTok-mentioned / video deals, then the rest
    deals = deals.slice().sort((a, b) => {
      const score = (d) => (d.tiktokVideoId ? 2 : 0) + (d.mentionedOnTiktok ? 1 : 0);
      return score(b) - score(a);
    });
    let offset = 0;

    function renderMore() {
      const slice = deals.slice(offset, offset + pageSize);
      if (!slice.length && offset === 0) {
        container.innerHTML = WPUI.emptyVerifiedExplainer();
        return;
      }
      const sentinel = document.getElementById('feed-sentinel');
      if (sentinel) sentinel.remove();
      container.insertAdjacentHTML('beforeend', slice.map(d => WPUI.feedCard(d)).join(''));
      offset += slice.length;
      // Product posters only — TikTok embed.js left off (seed embeds render blank)
      if (offset < deals.length) {
        const s = document.createElement('div');
        s.id = 'feed-sentinel';
        s.className = 'feed-sentinel';
        s.setAttribute('aria-hidden', 'true');
        container.appendChild(s);
        io.observe(s);
      } else {
        container.insertAdjacentHTML('beforeend',
          '<p class="feed-end">End of discovery feed · <a href="search.html">Find Deals with filters</a></p>');
      }
    }

    container.innerHTML = '';
    container.classList.add('discovery-feed-active');

    const io = new IntersectionObserver(entries => {
      if (entries[0] && entries[0].isIntersecting && offset < deals.length) {
        renderMore();
      }
    }, { root: opts.root || null, rootMargin: '120px', threshold: 0.01 });

    renderMore();

    container.addEventListener('click', function (e) {
      const saveBtn = e.target.closest('[data-save-deal]');
      if (saveBtn) {
        e.preventDefault();
        const id = saveBtn.getAttribute('data-save-deal');
        let saved = JSON.parse(localStorage.getItem('wikiprice-saved') || '[]');
        const nowSaved = saved.indexOf(id) < 0;
        if (nowSaved) saved.push(id);
        else saved = saved.filter(x => x !== id);
        localStorage.setItem('wikiprice-saved', JSON.stringify(saved));
        saveBtn.classList.toggle('saved', nowSaved);
        const iconWrap = saveBtn.querySelector('.feed-action-icon');
        if (iconWrap) iconWrap.innerHTML = nowSaved ? WPIcon('heartFilled', 22) : WPIcon('heart', 22);
        WPUI.showToast(nowSaved ? 'Saved' : 'Removed from saved');
        return;
      }
      const shareBtn = e.target.closest('[data-share-deal]');
      if (shareBtn) {
        e.preventDefault();
        const id = shareBtn.getAttribute('data-share-deal');
        const base = location.origin + (location.pathname.includes('/')
          ? location.pathname.replace(/[^/]*$/, '')
          : '/');
        const url = base + 'deal.html?id=' + id;
        if (navigator.share) {
          navigator.share({ title: 'WikiPrice deal', url: url }).catch(() => {});
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => WPUI.showToast('Link copied'));
        }
      }
    });
  },

  renderTikTokFeed(container) {
    if (!container || !WPDATA.tiktokFeed) return;
    const fallback = (typeof WPIMAGES !== 'undefined' && WPIMAGES.fallback)
      ? WPIMAGES.fallback
      : '/images/products/mens-sneakers.jpg';
    container.innerHTML = WPDATA.tiktokFeed.map(v => {
      const handle = String(v.handle || '').replace(/^@/, '');
      const profileUrl = handle
        ? ('https://www.tiktok.com/@' + handle)
        : 'discover.html';
      let img = v.image || '';
      if (!img && v.dealId && typeof getDealImage === 'function') {
        const deal = (WPDATA.deals || []).find(d => d.id === v.dealId);
        if (deal) img = getDealImage(deal);
      }
      if (!img) img = fallback;
      const dealHref = v.dealId ? ('deal.html?id=' + v.dealId) : profileUrl;
      return '<div class="tiktok-embed-card tiktok-poster-card">' +
        '<a class="tiktok-poster-link" href="' + profileUrl + '" target="_blank" rel="noopener" aria-label="Open @' + handle + ' on TikTok">' +
        '<img src="' + img + '" alt="@' + handle + ' — ' + String(v.caption || 'TikTok').replace(/"/g, '') + '" class="tiktok-poster-img" loading="lazy" ' +
        'onerror="this.onerror=null;this.src=\'' + fallback + '\'">' +
        '<span class="tiktok-poster-play">' + WPIcon('play', 28) + '</span>' +
        '<span class="feed-tiktok-badge">' + WPIcon('tiktok', 14) + ' @' + handle + '</span>' +
        '</a>' +
        '<div class="tiktok-caption">' + (v.caption || '') + '</div>' +
        '<p class="tiktok-card-actions"><a href="' + profileUrl + '" target="_blank" rel="noopener">Open on TikTok</a>' +
        (v.dealId ? ' · <a href="' + dealHref + '">View deal</a>' : '') + '</p></div>';
    }).join('');
  },

  formatFollowers(n) {
    if (!n) return '';
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'K';
    return n.toLocaleString();
  },

  sellerFollowerLine(seller) {
    const handle = seller?.tiktokHandle || (seller?.handle && String(seller.handle).replace(/^@/, ''));
    if (!handle) return '';
    const f = WPUIEnhance.formatFollowers(seller.followerCount || seller.tiktokFollowers);
    const url = (typeof WPDataLayer !== 'undefined') ? WPDataLayer.tiktokProfileUrl(handle) : ('https://www.tiktok.com/@' + handle);
    return ' · <a href="' + url + '" target="_blank" rel="noopener">@' + handle + '</a>' + (f ? ' · ' + f + ' followers' : '');
  },

  renderTikTokDealSection(deal, seller) {
    const handle = deal.tiktokHandle || seller?.tiktokHandle || (seller?.handle && String(seller.handle).replace(/^@/, ''));
    if (!handle) return '';
    const extracts = [];
    if (seller?.bioExtracts) seller.bioExtracts.forEach(e => extracts.push(e));
    if (seller?.videoCaptions) seller.videoCaptions.forEach(c => extracts.push({ source: 'From video caption', text: c }));
    if (seller?.commentReplies) seller.commentReplies.forEach(c => extracts.push({ source: 'From comment reply', text: '@' + c.user + ' asked "' + c.question + '" — ' + c.reply }));
    if (seller?.ocrExtracts) seller.ocrExtracts.forEach(o => extracts.push(o));
    const profileUrl = (typeof WPDataLayer !== 'undefined') ? WPDataLayer.tiktokProfileUrl(handle) : ('https://www.tiktok.com/@' + handle);
    const img = (typeof getDealImage === 'function') ? getDealImage(deal) : (deal.image || '/images/products/mens-sneakers.jpg');
    const fallback = (typeof WPIMAGES !== 'undefined' && WPIMAGES.fallback) ? WPIMAGES.fallback : '/images/products/mens-sneakers.jpg';
    const poster =
      '<div class="tiktok-embed-card tiktok-poster-card mt-16">' +
      '<a class="tiktok-poster-link" href="' + profileUrl + '" target="_blank" rel="noopener" aria-label="Open @' + handle + ' on TikTok">' +
      '<img src="' + img + '" alt="' + (deal.name || 'Product').replace(/"/g, '') + ' on TikTok" class="tiktok-poster-img" loading="lazy" ' +
      'onerror="this.onerror=null;this.src=\'' + fallback + '\'">' +
      '<span class="tiktok-poster-play">' + WPIcon('play', 28) + '</span>' +
      '<span class="feed-tiktok-badge">' + WPIcon('tiktok', 14) + ' Open on TikTok</span>' +
      '</a></div>';
    return '<div class="detail-card">' + WPUI.sectionHeading('tiktok', 'TikTok Integration') +
      '<p><a href="' + profileUrl + '" target="_blank" rel="noopener">@' + handle + '</a>' +
      ((seller?.followerCount || seller?.tiktokFollowers) ? ' · ' + WPUIEnhance.formatFollowers(seller.followerCount || seller.tiktokFollowers) + ' followers' : '') + '</p>' +
      poster +
      (extracts.length ? '<h3 style="font-size:0.95rem;margin:16px 0 8px;">Extracted Information</h3>' + extracts.map(e => '<div class="tiktok-extract"><span class="source-label">' + e.source + '</span><br>' + e.text + '</div>').join('') : '') +
      '</div>';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  WPUIEnhance.initAllSearchBars();
});
