const CACHE = "GradesCache";
const URL =
  "https://api.github.com/repos/germanivanov0719/grades/commits/release";

async function getVersion() {
  let r = await fetch(URL);
  if (r == undefined) {
    return "N/A";
  }
  j = await r.json();
  return j["sha"].slice(0, 7);
}

async function setVersion() {
  if (localStorage["version"] == undefined) {
    localStorage["version"] = await getVersion();
  }
  let v = localStorage["version"];
  console.log("Version (localStorage): " + v);
  document.getElementById("version").textContent = v;
}

async function update() {
  document.getElementById("update").textContent = "Обновляем...";
  if (navigator.onLine) {
    caches.delete(CACHE);
    localStorage.removeItem("version");
    location.reload();
  } else {
    document.getElementById("update").textContent = "Офлайн";
  }
}

async function updateStatus() {
  if (navigator.onLine) {
    document.getElementById("update").textContent = "Обновить сейчас";
    document.getElementById("update").style.textDecoration = "underline";
  } else {
    document.getElementById("update").textContent = "Офлайн";
    document.getElementById("update").style.textDecoration = "none";
  }
}

window.ononline = window.onoffline = updateStatus;

updateStatus();
setVersion();

let initFunction = async () => {
  let version = await getVersion();
  if (version != localStorage["version"] && navigator.onLine) {
    update();
  }
};
initFunction();
