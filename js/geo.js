/**
 * Geo-fencing for Kampala metro — near-me ranking + outside-area banner
 */
const WPGeo = {
  userPos: null,
  status: 'unknown', // unknown | inside | outside | denied

  haversineKm(a, b) {
    const R = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLng = (b.lng - a.lng) * Math.PI / 180;
    const la1 = a.lat * Math.PI / 180;
    const la2 = b.lat * Math.PI / 180;
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  },

  isInsideKampala(pos) {
    const b = WPCONFIG.kampalaBounds;
    return pos.lat >= b.latMin && pos.lat <= b.latMax &&
      pos.lng >= b.lngMin && pos.lng <= b.lngMax;
  },

  arcadeCoord(arcade) {
    return (WPCONFIG.arcadeCoords && WPCONFIG.arcadeCoords[arcade]) || WPCONFIG.kampalaBounds.center;
  },

  distanceToDeal(deal) {
    if (!this.userPos || !deal?.location?.arcade) return null;
    return this.haversineKm(this.userPos, this.arcadeCoord(deal.location.arcade));
  },

  requestLocation(cb) {
    if (!navigator.geolocation) {
      this.status = 'denied';
      if (cb) cb(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        this.status = this.isInsideKampala(this.userPos) ? 'inside' : 'outside';
        localStorage.setItem('wikiprice-geo', JSON.stringify({ pos: this.userPos, status: this.status }));
        if (cb) cb(this.userPos);
        document.dispatchEvent(new CustomEvent('wikiprice:geo', { detail: { pos: this.userPos, status: this.status } }));
      },
      () => {
        this.status = 'denied';
        if (cb) cb(null);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  },

  restore() {
    try {
      const raw = localStorage.getItem('wikiprice-geo');
      if (!raw) return;
      const data = JSON.parse(raw);
      this.userPos = data.pos;
      this.status = data.status;
    } catch (e) { /* ignore */ }
  },

  bannerHtml() {
    if (this.status === 'outside') {
      return '<div class="geo-banner geo-outside" role="status">' +
        '<strong>Outside Kampala?</strong> WikiPrice focuses on Kampala markets and arcades. ' +
        'Deals and directions are optimized for the Kampala metro area.' +
        '</div>';
    }
    if (this.status === 'inside') {
      return '<div class="geo-banner geo-inside" role="status">' +
        'Showing Kampala deals' + (this.userPos ? ' — you can sort by nearest arcade' : '') +
        '</div>';
    }
    return '<div class="geo-banner geo-ask" id="geo-ask">' +
      '<span>Find deals near you in Kampala</span> ' +
      '<button type="button" class="btn btn-sm btn-accent" id="geo-enable">Use my location</button>' +
      '</div>';
  },

  mountBanner(container) {
    if (!container) return;
    this.restore();
    container.innerHTML = this.bannerHtml();
    const btn = document.getElementById('geo-enable');
    if (btn) {
      btn.addEventListener('click', () => {
        this.requestLocation(() => {
          container.innerHTML = this.bannerHtml();
        });
      });
    }
  },

  sortByNearest(deals) {
    if (!this.userPos) return deals;
    return deals.slice().sort((a, b) => {
      const da = this.distanceToDeal(a);
      const db = this.distanceToDeal(b);
      if (da == null) return 1;
      if (db == null) return -1;
      return da - db;
    });
  }
};

WPGeo.restore();
