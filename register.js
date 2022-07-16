// import "https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate";

// const el = document.createElement("pwa-update");
// document.body.appendChild(el);

window.addEventListener("load", () => {
  // Is service worker available?
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("Service worker registered!");
      })
      .catch((error) => {
        console.warn("Error registering service worker:");
        console.warn(error);
      });
  }
});
