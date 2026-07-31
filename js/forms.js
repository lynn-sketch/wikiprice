/**
 * Forms helper — Formspree when configured, else localStorage fallback
 * Client rate-limit + HTML escape helpers (Part 12.6). Server validation still required at Formspree/edge.
 */
const WPForms = {
  RATE_WINDOW_MS: 60000,
  RATE_MAX: 5,

  escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  sanitizePayload(payload) {
    const out = {};
    Object.keys(payload || {}).forEach(k => {
      const v = payload[k];
      if (typeof v === 'string') out[k] = v.trim().slice(0, 2000);
      else out[k] = v;
    });
    return out;
  },

  checkRateLimit(formType) {
    const key = 'wikiprice-rate-' + formType;
    const now = Date.now();
    let arr = [];
    try { arr = JSON.parse(sessionStorage.getItem(key) || '[]'); } catch (e) { arr = []; }
    arr = arr.filter(t => now - t < WPForms.RATE_WINDOW_MS);
    if (arr.length >= WPForms.RATE_MAX) {
      return { ok: false, error: 'Too many submissions. Please wait a minute and try again.' };
    }
    arr.push(now);
    sessionStorage.setItem(key, JSON.stringify(arr));
    return { ok: true };
  },

  /** Append a nomination/intake row into the same outreach tracker admin uses */
  pushToOutreachTracker(row) {
    const key = 'wp-outreach-tracker';
    let rows = [];
    try { rows = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { rows = []; }
    rows.push(Object.assign({
      id: 'tr-' + Date.now(),
      stage: 'contacted',
      status: 'contacted',
      contactedAt: new Date().toISOString().slice(0, 10)
    }, row));
    localStorage.setItem(key, JSON.stringify(rows));
    return rows;
  },

  async submit(formType, payload) {
    const rate = WPForms.checkRateLimit(formType);
    if (!rate.ok) return { ok: false, via: 'rate-limit', error: rate.error };

    const clean = WPForms.sanitizePayload(payload);
    const record = Object.assign({ formType: formType, date: new Date().toISOString() }, clean);
    const key = 'wikiprice-forms-' + formType;
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push(record);
    localStorage.setItem(key, JSON.stringify(list));

    if (formType === 'nominate' || formType === 'admin-intake' || formType === 'seller-signup') {
      WPForms.pushToOutreachTracker({
        businessName: clean.businessName || clean.name || 'Unknown',
        handle: clean.handle || clean.tiktokHandle || '',
        sellerHandle: clean.handle || clean.tiktokHandle || '',
        notes: [
          clean.location || '',
          clean.arcade ? (clean.arcade + ' ' + (clean.stall || '')) : '',
          clean.source ? ('source=' + clean.source) : '',
          clean.notes || '',
          'via=' + formType
        ].filter(Boolean).join(' | ')
      });
    }

    if (typeof WPCONFIG !== 'undefined' && WPCONFIG.formspreeConfigured) {
      try {
        const res = await fetch(WPCONFIG.formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(record)
        });
        if (!res.ok) throw new Error('Formspree ' + res.status);
        return { ok: true, via: 'formspree' };
      } catch (e) {
        console.warn('[WPForms] Formspree failed, kept local copy', e);
        return { ok: true, via: 'local', warning: e.message };
      }
    }
    return { ok: true, via: 'local' };
  }
};
