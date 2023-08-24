populateStorage();

function populateStorage() {
  if (!localStorage["rounding_value"]) {
    localStorage["rounding_value"] = "51";
  }
  if (!localStorage["perform-calculations-round"]) {
    localStorage["perform-calculations-round"] = "False";
  }
}

function getVariable(name) {
  let element = document.getElementById(name);
  let s = element.value;
  // Remove character other than numbers, points and minuses
  s = s.replace(",", ".").replace(/[^0-9\.\-]+/g, "");
  // Remove more than one floating point
  while (s.split(".").length > 2)
    s =
      s.substring(0, s.lastIndexOf(".")) + s.substring(s.lastIndexOf(".") + 1);
  let negative = s.includes("-");
  s = s.replace(/\-/g, "");
  while (s.substring(0, 2).match(/0[0-9]+/g)) s = s.substring(1);
  s = negative ? "-" + s : s;

  element.value = s;
  if (s) {
    return parseFloat(s);
  }
  return undefined;
}

function newMean() {
  let M0 = getVariable("M0-new");
  let W0 = getVariable("W0-new");
  let x = getVariable("x-new");
  let w = getVariable("w-new");
  if (!M0 || !W0 || !x || !w) return;

  let M1 = (W0 * M0 + x * w) / (W0 + w);

  document.getElementById("M1-new").textContent = M1;
}

function customRound(n) {
  let a = localStorage["perform-calculations-round"];
  if (a && a != "false") {
    return Math.round(n * 100) / 100;
  }
  return n;
}

function getMark(n) {
  let goal = parseInt(n);
  let maxGrade = parseFloat(`${goal}.${localStorage["rounding_value"]}`);
  let minGrade = parseFloat(`${goal - 1}.${localStorage["rounding_value"]}`);
  if (minGrade <= n && n < maxGrade) {
    return parseInt(goal);
  } else if (n < minGrade) {
    return parseInt(goal - 1);
  }
  return parseInt(goal + 1);
}

function calcTillGoal(mean, weight, goal, mark = goal) {
  let r = 0;
  if (getMark(mean) == goal) {
    return r;
  }
  let negativeR = getMark(mean) > goal;
  while (getMark(mean) != goal) {
    r += negativeR ? -1 : 1;
    mean = customRound((mean * weight + mark) / (weight + 1));
    weight += 1;
  }
  return r;
}

function nounWithNumeralRussian(value, words) {
  value = Math.abs(value) % 100;
  var num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
}

function getGoalMeanByGoalValue(goal) {
  return parseFloat(`${--goal}.${localStorage["rounding_value"]}`);
}

function tillGoal() {
  let M0 = getVariable("M0-goal");
  let W0 = getVariable("W0-goal");
  let goal = getVariable("goal-value");
  let x = getVariable("x-goal");
  let M1 = getGoalMeanByGoalValue(goal);
  // if (!M0 || !W0 || !goal || !x || !M1) return;

  let w = (W0 * (M0 - M1)) / (M1 - x);

  if (w < 0) {
    document.getElementById("impossible-goal").hidden = false;
  } else {
    document.getElementById("impossible-goal").hidden = true;
  }
  document.getElementById("whole-goal").textContent =
    Math.ceil(w) +
    " " +
    nounWithNumeralRussian(Math.ceil(w), ["раз", "раза", "раз"]);
  document.getElementById("w-goal").textContent = w;
}
function tillGoals(mean, n) {
  // Receive by id if undefined
  mean =
    mean == undefined
      ? (mean = parseFloat(document.getElementById("M1-input").value))
      : mean;
  n = n == undefined ? parseFloat(document.getElementById("s-input").value) : n;

  if (!mean || !n || !localStorage["rounding_value"]) {
    alert("Недостаточно данных");
    return 0;
  }
  if (mean == parseFloat(document.getElementById("M1-input").value)) {
    document.getElementById("M2-input").textContent = "Не изменялся";
  }

  // Check for huge numbers
  if (n > 1000000) {
    alert(
      "Вес превысил 1000000. В целях безопасности, количества оценок до целей не будут вычисляться."
    );
    return;
  }
  if (n > 10000) {
    if (
      !confirm(
        "Вес превысил 10000, вычисления могу занять длительное время. Продолжить?"
      )
    ) {
      return;
    }
  }

  let r = [];
  for (let i = 0; i < 4; i++) {
    r.push(calcTillGoal(mean, n, 5 - i));
  }
  for (let i = 5; i > 1; i--) {
    if (r[5 - i] == 0) {
      r[5 - i] = "Готово";
    }

    document.getElementById("res-" + i).textContent = r[5 - i];
  }
}
