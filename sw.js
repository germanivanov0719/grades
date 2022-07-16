// const CACHE = "pwabuilder-precache";

// importScripts(
//   "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
// );

// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

// workbox.routing.registerRoute(
//   new RegExp("/*"),
//   new workbox.strategies.CacheFirst({
//     cacheName: CACHE,
//   })
// );

let urlsToCache = [
  "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css",
  "index.html",
  "index.js",
  "images/arrow-back.svg",
  "images/arrow-forward.svg",
  "images/icon.svg",
  "images/icon512.png",
  "images/icon1024.png",
  "images/icon512.webp",
  "css/arrow.css",
  "css/dark.css",
  "css/enable-spin-buttons.css",
  "pages/settings.html",
  "pages/settings.js",
  "manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("pwa-assets").then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // It can update the cache to serve updated content on the next request
      return cachedResponse || fetch(event.request);
    })
  );
});
