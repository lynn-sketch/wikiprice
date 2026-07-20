const CACHE_NAME = 'wikiprice-v5';
const ASSETS = [
  '/',
  '/index.html',
  '/search.html',
  '/budget-finder.html',
  '/deal.html',
  '/seller.html',
  '/css/styles.css',
  '/images/logo.png',
  '/js/data.js',
  '/js/data-extended.js',
  '/js/icons.js',
  '/js/images.js',
  '/js/core.js',
  '/js/components.js',
  '/js/ui-enhance.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetched = fetch(e.request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});
