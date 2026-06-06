const CACHE_NAME = 'love-letter-v3'; // Bumped cache version to force a system clean
const ASSETS = [
  'index.html',
  'eyes.css',
  'eyes.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// Install Service Worker and cache resources
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // Force immediate activation
  );
});

// Clean up old redundant cache blocks instantly
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// SMART NETWORK-FIRST FETCH: Checks GitHub for updates first, falls back to cache offline
self.addEventListener('fetch', (e) => {
  // Only handle HTTP/HTTPS protocols (filters out browser extensions/analytics)
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        // If valid response, update the cache container dynamically
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // If network fails (offline), fall back immediately to cached file assets
        return caches.match(e.request);
      })
  );
});
