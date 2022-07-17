const CACHE = "GradesCache";
const dirsToCache = [".", "pages", "images", "css"];

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.2/workbox-sw.js"
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

for (dir in dirsToCache) {
  workbox.routing.registerRoute(
    new RegExp(dir + "/*"),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: CACHE,
    })
  );
}
