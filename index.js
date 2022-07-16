populateStorage();

function populateStorage() {
  if (!localStorage["fraction_up"]) {
    localStorage["fraction_up"] = "51";
  }
  if (!localStorage["perform-calculations-round"]) {
    localStorage["perform-calculations-round"] = "True";
  }
}

function newMean() {
  let M1 = parseFloat(document.getElementById("M1-input").value);
  let s = parseFloat(document.getElementById("s-input").value);
  let m = parseFloat(document.getElementById("m-input").value);
  let w = parseFloat(document.getElementById("w-input").value);

  let res = (s * M1 + m * w) / (s + w);
  if (!res) {
    alert("Недостаточно данных");
    return 0;
  }

  document.getElementById("M2-input").textContent = res.toFixed(3);
  tillGoals(res, s + w);
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
