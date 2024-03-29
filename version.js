const CACHE = "GradesCache";
const URL =
  "https://api.github.com/repos/germanivanov0719/grades/commits/release";

async function getVersion() {
  try {
    let r = await fetch(URL);
    if (r == undefined) return "Проблемы с подключением";
    if (r.statusText == "Forbidden") return "Слишком много запросов";
    if (!r.ok) return "Ошибка сервера, напишите мне";
    j = await r.json();
    return j["sha"].slice(0, 7);
  } catch (e) {
    return "Неизвестная ошибка";
  }
}

async function setVersion() {
  if (localStorage["version"] == undefined) {
    localStorage["version"] = await getVersion();
  }
  let v = localStorage["version"];
  console.log("Version (localStorage): " + v);
  if (document.getElementById("version"))
    document.getElementById("version").textContent = v;
}

async function update() {
  document.getElementById("update").textContent = "Обновляем…";
  setUnderline(false);
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
    setUnderline(true);
  } else {
    document.getElementById("update").textContent = "Офлайн";
    setUnderline(false);
  }
}

async function setUnderline(enabled = true) {
  document.getElementById("update").style.textDecoration = enabled
    ? "underline"
    : "none";
}

window.ononline = window.onoffline = updateStatus;

if (document.getElementById("update")) {
  updateStatus();
}
setVersion();

let initFunction = async () => {
  let version = await getVersion();
  if (version != localStorage["version"] && navigator.onLine) {
    update();
  }
};
initFunction();
