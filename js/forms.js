/**
 * Forms helper — Formspree when configured, else localStorage fallback
 */
const WPForms = {
  async submit(formType, payload) {
    const record = Object.assign({ formType: formType, date: new Date().toISOString() }, payload);
    const key = 'wikiprice-forms-' + formType;
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push(record);
    localStorage.setItem(key, JSON.stringify(list));

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
