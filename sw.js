const CACHE = "GradesCache";

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.2/workbox-sw.js"
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp("./*"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
  })
);

// const updateInterval = 24 * 60 * 60 * 1000; // 1 day in ms

// let urlsToCache = new Set([
//   "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css",
//   "index.html",
//   "index.js",
//   "images/arrow-back.svg",
//   "images/arrow-forward.svg",
//   "images/icon.svg",
//   "images/icon512.png",
//   "images/icon1024.png",
//   "images/icon512.webp",
//   "css/arrow.css",
//   "css/dark.css",
//   "css/enable-spin-buttons.css",
//   "pages/settings.html",
//   "pages/settings.js",
//   "manifest.json",
// ]);

// let active = "A";
// let cachingLock = false;
// let updater;

// // Cache stored in A/B Storages

// self.addEventListener("install", (event) => {
//   event.waitUntil(updateCache());
// });

// self.addEventListener("activate", (event) => {
//   updater = setInterval(function () {
//     updateCache(), updateInterval;
//   });
//   event.waitUntil(true);
// });

// async function updateCache() {
//   if (!navigator.onLine) {
//     if (caches.has("A") || caches.has("B")) {
//       return true;
//     }
//     return false;
//   }

//   // Obtain lock
//   if (!cachingLock) {
//     cachingLock = true;
//   }

//   // set active storage
//   if (await caches.has("A")) {
//     active = "B";
//   } else {
//     active = "A";
//   }

//   // Make sure saving cache to empry storage
//   (await caches.has(active)) && (await caches.delete(active));

//   // Cache new files to new cache
//   let cache = await caches.open(active);
//   await cache.addAll([...new Set(urlsToCache)]);

//   // Remove old cache
//   if (active === "A") {
//     caches.delete("B");
//   } else {
//     caches.delete("A");
//   }

//   // Free lock
//   cachingLock = false;

//   return true;
// }

// const putInCache = async (request) => {
//   urlsToCache.add(request.url);
// };

// const cacheFirst = async (request) => {
//   const responseFromCache = await caches.match(request);
//   if (responseFromCache) {
//     return responseFromCache;
//   }
//   putInCache(request);
//   const responseFromNetwork = await fetch(request);
//   return responseFromNetwork;
// };

// self.addEventListener("fetch", (event) => {
//   if (event.request.method === "GET") {
//     event.respondWith(cacheFirst(event.request));
//   }
// });
