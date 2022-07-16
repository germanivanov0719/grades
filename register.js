const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener("activate", (event) => {
  event.waitUntil(enableNavigationPreload());
});

window.addEventListener("load", () => {
  // Is service worker available?
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => {
        console.log("Service worker registered!");
      })
      .catch((error) => {
        console.warn("Error registering service worker:");
        console.warn(error);
      });
  }
});

window.onbeforeunload = function () {
  if (window.navigator.onLine) {
    caches.delete("pwa-assets");
  }
};
