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
  "grades.webmanifest",
  "register.js",
  "version.js",
];

const CACHE = "GradesCache";

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.2/workbox-sw.js"
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

urlsToCache.forEach((url) => {
  workbox.routing.registerRoute(
    url,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: CACHE,
      plugins: [
        // Force expire every 2 weeks
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 2 * 14 * 24 * 60 * 60,
        }),
      ],
    })
  );
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", () => {
  self.clients.claim();
});
