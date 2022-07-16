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
      cache.addAll(urlsToCache);
      return;
    })
  );
});

const putInCache = async (request, response) => {
  const cache = await caches.open("pwa-assets");
  await cache.put(request, response);
};

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});
