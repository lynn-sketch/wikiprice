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
    container.innerHTML =
      '<div class="stat-card"><div class="stat-icon-wrap">' + WPIcon('tag', 32) + '</div>' +
      '<div class="stat-number" data-count-to="' + stats.verifiedDeals + '">0</div><div class="stat-label">Verified Deals</div></div>' +
      '<div class="stat-card"><div class="stat-icon-wrap">' + WPIcon('shop', 32) + '</div>' +
      '<div class="stat-number" data-count-to="' + stats.sellers + '">0</div><div class="stat-label">Sellers</div></div>' +
      '<div class="stat-card"><div class="stat-icon-wrap">' + WPIcon('users', 32) + '</div>' +
      '<div class="stat-number" data-count-to="' + stats.users + '">0</div><div class="stat-label">Users</div></div>' +
      '<div class="stat-card"><div class="stat-icon-wrap">' + WPIcon('money', 32) + '</div>' +
      '<div class="stat-number" data-count-to="' + Math.round(stats.totalSavings / 1000000) + '" data-prefix="UGX " data-suffix="M+">0</div><div class="stat-label">Total Savings</div></div>';
    WPUIEnhance.animateCounters();
  },

  renderTikTokFeed(container) {
    if (!container || !WPDATA.tiktokFeed) return;
    container.innerHTML = WPDATA.tiktokFeed.map(v =>
      '<div class="tiktok-embed-card">' +
      '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@' + v.handle + '/video/' + v.videoId + '" data-video-id="' + v.videoId + '" style="max-width:100%;min-width:280px;">' +
      '<section><a target="_blank" rel="noopener" href="https://www.tiktok.com/@' + v.handle + '/video/' + v.videoId + '">@' + v.handle + '</a></section></blockquote>' +
      '<div class="tiktok-caption">' + v.caption + '</div></div>'
    ).join('');
    if (!document.getElementById('tiktok-embed-script')) {
      const s = document.createElement('script');
      s.id = 'tiktok-embed-script';
      s.src = 'https://www.tiktok.com/embed.js';
      s.async = true;
      document.body.appendChild(s);
    }
  },

  formatFollowers(n) {
    if (!n) return '';
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'K';
    return n.toLocaleString();
  },

  sellerFollowerLine(seller) {
    if (!seller?.tiktokHandle) return '';
    const f = WPUIEnhance.formatFollowers(seller.tiktokFollowers);
    return ' · <a href="https://tiktok.com/@' + seller.tiktokHandle + '" target="_blank" rel="noopener">@' + seller.tiktokHandle + '</a>' + (f ? ' · ' + f + ' followers' : '');
  },

  renderTikTokDealSection(deal, seller) {
    const handle = deal.tiktokHandle || seller?.tiktokHandle;
    if (!handle) return '';
    const extracts = [];
    if (seller?.bioExtracts) seller.bioExtracts.forEach(e => extracts.push(e));
    if (seller?.videoCaptions) seller.videoCaptions.forEach(c => extracts.push({ source: 'From video caption', text: c }));
    if (seller?.commentReplies) seller.commentReplies.forEach(c => extracts.push({ source: 'From comment reply', text: '@' + c.user + ' asked "' + c.question + '" — ' + c.reply }));
    if (seller?.ocrExtracts) seller.ocrExtracts.forEach(o => extracts.push(o));
    const videoId = deal.tiktokVideoId || (WPDATA.tiktokFeed && WPDATA.tiktokFeed.find(t => t.handle === handle)?.videoId);
    let embed = '';
    if (videoId) {
      embed = '<div class="tiktok-embed-card mt-16"><blockquote class="tiktok-embed" cite="https://www.tiktok.com/@' + handle + '/video/' + videoId + '" data-video-id="' + videoId + '" style="max-width:100%;"><section><a href="https://tiktok.com/@' + handle + '/video/' + videoId + '" target="_blank" rel="noopener">Watch on TikTok</a></section></blockquote></div>';
    }
    return '<div class="detail-card">' + WPUI.sectionHeading('tiktok', 'TikTok Integration') +
      '<p><a href="https://tiktok.com/@' + handle + '" target="_blank" rel="noopener">@' + handle + '</a>' +
      (seller?.tiktokFollowers ? ' · ' + WPUIEnhance.formatFollowers(seller.tiktokFollowers) + ' followers' : '') + '</p>' +
      embed +
      (extracts.length ? '<h3 style="font-size:0.95rem;margin:16px 0 8px;">Extracted Information</h3>' + extracts.map(e => '<div class="tiktok-extract"><span class="source-label">' + e.source + '</span><br>' + e.text + '</div>').join('') : '') +
      '</div>';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  WPUIEnhance.initAllSearchBars();
});
