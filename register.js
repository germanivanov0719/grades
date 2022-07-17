const swPaths = ["/grades/sw.js", "/sw.js", "./sw.js", "../sw.js"];

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
  register();
});

async function register() {
  for (let i = 0; i < swPaths.length; i++) {
    try {
      await navigator.serviceWorker.register(swPaths[i]);
      console.log("Service worker registered!");
      return true;
    } catch (error) {
      console.warn(
        "Failed to register service worker on path " +
          swPaths[i] +
          ": \n\n" +
          error
      );
    }
  }
  return false;
}
