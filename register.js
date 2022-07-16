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
  register("sw.js");
  return;
});

function register(script) {
  navigator.serviceWorker
    .register(script)
    .then(() => {
      console.log("Service worker registered!");
    })
    .catch(() => {
      try {
        navigator.serviceWorker.register("../" + script);
      } catch (error) {
        console.warn("Error registering service worker:");
        console.warn(error);
      }
    });
}
