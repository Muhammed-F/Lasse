// Lightweight and robust Service Worker for Lasse Karriärälg
const CACHE_NAME = "karriaralg-pwa-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
];

// Install event - caching basic shell
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).catch(err => console.log("SW Install cache load skipped", err))
  );
});

// Activate event - clean old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Cache falling back to network strategy with quick feedback
self.addEventListener("fetch", (e) => {
  // Only intercept HTTP/HTTPS requests
  if (!e.request.url.startsWith(self.location.origin)) return;

  // Ignore POST requests (like API evaluations/chat, which must remain real-time)
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in the background
        fetch(e.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(e.request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(e.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseToCache);
        });
        return networkResponse;
      }).catch(async () => {
        // Check if loading main document, fall back if offline
        if (e.request.mode === "navigate") {
          return caches.match("/");
        }
        return new Response("Offline standard layout", { status: 503, statusText: "Offline" });
      });
    })
  );
});
