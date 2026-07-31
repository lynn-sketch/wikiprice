/**
 * Client for WikiPrice Netlify Functions + Database.
 * Falls back silently when the API / DB is not provisioned yet.
 */
const WPAPI = (function () {
  const base = (typeof WPCONFIG !== 'undefined' && WPCONFIG.apiBase) ? WPCONFIG.apiBase : '/api';

  async function request(path, options) {
    const res = await fetch(base.replace(/\/$/, '') + path, Object.assign({
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }, options || {}));
    let data = null;
    try { data = await res.json(); } catch (e) { data = null; }
    if (!res.ok) {
      const err = new Error((data && data.error) || ('HTTP ' + res.status));
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  async function health() {
    try {
      return await request('/health');
    } catch (e) {
      return { ok: false, database: 'unavailable', error: e.message };
    }
  }

  async function fetchCatalog() {
    return request('/catalog');
  }

  async function submitForm(formType, payload) {
    return request('/forms', {
      method: 'POST',
      body: JSON.stringify(Object.assign({ formType: formType }, payload || {}))
    });
  }

  return { base, health, fetchCatalog, submitForm, request };
})();
