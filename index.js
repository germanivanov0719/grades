populateStorage();

function populateStorage() {
  if (!localStorage["fraction_up"]) {
    localStorage["fraction_up"] = "51";
  }
  if (!localStorage["perform-calculations-round"]) {
    localStorage["perform-calculations-round"] = "False";
  }
}

function newMean() {
  let M0 = parseFloat(document.getElementById("M0-input").value);
  let W0 = parseFloat(document.getElementById("W0-input").value);
  let x = parseFloat(document.getElementById("x-input").value);
  let w = parseFloat(document.getElementById("w-input").value);

  let res = (W0 * M0 + x * w) / (W0 + w);
  if (!res) {
    alert("Недостаточно данных");
    return 0;
  }

  document.getElementById("M1-input").textContent = res.toFixed(3);
  tillGoals(res, W0 + w);
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
  let maxGrade = parseFloat(`${goal}.${localStorage["fraction_up"]}`);
  let minGrade = parseFloat(`${goal - 1}.${localStorage["fraction_up"]}`);
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

function tillGoals(mean, n) {
  // Receive by id if undefined
  mean =
    mean == undefined
      ? (mean = parseFloat(document.getElementById("M1-input").value))
      : mean;
  n = n == undefined ? parseFloat(document.getElementById("s-input").value) : n;

  if (!mean || !n || !localStorage["fraction_up"]) {
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
