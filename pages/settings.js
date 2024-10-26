load();

function save() {
  localStorage["fraction_up"] = document.getElementById("fraction-input").value;
  localStorage["perform-calculations-round"] = document.getElementById(
    "perform-calculations-round"
  ).checked;
  console.log(localStorage);
  if (
    customRound(0 + "." + localStorage["fraction_up"]) > 0 &&
    localStorage["fraction_up"].length <= 3
  ) {
    alert("Сохранено");
  } else {
    alert(
      "Ошибка, число слишком длинное или отрицательное. Настройки будут сброшены."
    );
    reset();
  }
}

function reset() {
  localStorage["perform-calculations-round"] = "false";
  localStorage["fraction_up"] = "51";
  window.location.reload();
}

function load() {
  document.getElementById("fraction-input").value = localStorage["fraction_up"];
  if (localStorage["perform-calculations-round"] == "true") {
    document
      .getElementById("perform-calculations-round")
      .setAttribute("checked", "");
    document.getElementById("perform-calculations-round").checked = true;
  } else {
    document
      .getElementById("perform-calculations-round")
      .removeAttribute("checked");
  }
}
