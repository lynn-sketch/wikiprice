/**
 * WikiPrice site config — edit Formspree ID after creating a form at formspree.io
 */
const WPCONFIG = {
  /** Replace YOUR_FORM_ID with your Formspree form ID (e.g. xpwqkzvn) */
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
  formspreeConfigured: false, // set true after replacing YOUR_FORM_ID

  /** Launch mode: public surfaces prefer verified + physical-location deals */
  launchMode: true,

  /** Kampala metro approx bounding box (geo-fence) */
  kampalaBounds: {
    latMin: 0.20,
    latMax: 0.45,
    lngMin: 32.45,
    lngMax: 32.70,
    center: { lat: 0.3476, lng: 32.5825 },
    radiusKm: 25
  },

  /** Arcade approximate coordinates for near-me ranking */
  arcadeCoords: {
    'Mukwano Arcade': { lat: 0.3125, lng: 32.5760 },
    'New Pioneer Mall': { lat: 0.3135, lng: 32.5815 },
    'Gazaland Arcade': { lat: 0.3128, lng: 32.5755 },
    'Galiraya': { lat: 0.3140, lng: 32.5780 },
    'Galiraya Arcade': { lat: 0.3140, lng: 32.5780 },
    'Majestic Plaza': { lat: 0.3132, lng: 32.5795 },
    'Owino': { lat: 0.3110, lng: 32.5730 },
    'Owino Market': { lat: 0.3110, lng: 32.5730 },
    'Kikuubo': { lat: 0.3120, lng: 32.5745 },
    'Nsambya': { lat: 0.2980, lng: 32.5950 },
    'Energy Centre': { lat: 0.3138, lng: 32.5770 },
    'Magoba': { lat: 0.3115, lng: 32.5725 },
    'China Town': { lat: 0.3370, lng: 32.6050 },
    'Ntinda': { lat: 0.3550, lng: 32.6200 },
    'Kampala': { lat: 0.3476, lng: 32.5825 }
  },

  siteUrl: 'https://lynn-sketch.github.io/wikiprice/'
};

// Auto-detect configured Formspree
WPCONFIG.formspreeConfigured = WPCONFIG.formspreeEndpoint &&
  WPCONFIG.formspreeEndpoint.indexOf('YOUR_FORM_ID') === -1;
