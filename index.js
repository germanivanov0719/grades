// alert("Вы зашли на сайт, который находится в бета-тестировании. В случае обнаружения проблемы, напишите мне на электронную почту, указанную внизу страницы. Также буду рад услышать Ваши предложения по развитию сайта.")

populateStorage()


function populateStorage() {
    if (!localStorage['fraction_up']){
        localStorage['fraction_up'] = '51';
    }
    if (!localStorage['perform-calculations-round']){
        localStorage['perform-calculations-round'] = 'True';
    }
    // console.log(localStorage['perform-calculations-round'], localStorage['fraction_up'])
}

function newMean(){
    let M1 = parseFloat(document.getElementById("M1-input").value);
    let s = parseFloat(document.getElementById("s-input").value);
    let m = parseFloat(document.getElementById("m-input").value);
    let w = parseFloat(document.getElementById("w-input").value);
    // console.log(M1, s, m, w)
    // console.log(s * M1, m * w, s + w)
    res = ((s * M1 + m * w) / (s + w))
    if (!res) {
        alert("Недостаточно данных");
        return 0
    }
    // console.log(res)
    document.getElementById("M2-input").textContent = res.toFixed(3);
    tillGoals(res, s + w)
}

function customRound(n){
    a = localStorage['perform-calculations-round']
    if (a && a != 'false'){
        // console.log(Math.round((n) * 100) / 100)
        return Math.round((n) * 100) / 100
    }
    else{
        return n
    }
}

function tillGoals(mean=parseFloat(document.getElementById("M1-input").value), n=parseFloat(document.getElementById("s-input").value)){
    let f_rq = localStorage['fraction_up']; 
    console.log(localStorage)
    if (!mean || !n || !f_rq) {
        alert("Недостаточно данных");
        return 0
    }
    if (mean == parseFloat(document.getElementById("M1-input").value)) {
        document.getElementById("M2-input").textContent = "Не изменялся";
    }
    // console.log(mean)
    r = [0, 0, 0, 0];

    // 5
    console.log("5:")
    c_m = mean;
    c_n = n;
    rq = 0
    if (mean >= parseFloat(4 + '.' + f_rq)) {
        r[0] = 0
    }
    else {
        while (customRound(c_m) < parseFloat(4 + '.' + f_rq)) {
            rq += 1
            c_m = (c_m * c_n + 5) / (c_n + 1)
            c_n += 1
            console.log(c_m)
        }
        r[0] = rq
    }


    // 4
    console.log("4:")
    c_m = mean;
    c_n = n;
    rq = 0
    if (mean < parseFloat(3 + '.' + f_rq)) {
        while (customRound(c_m) < parseFloat(3 + '.' + f_rq)) {
            rq += 1
            c_m = ((c_m * c_n + 4) / (c_n + 1))
            c_n += 1
            console.log(c_m)
        }
    }
    else if (customRound(c_m) >= parseFloat(4 + '.' + f_rq)) {
        while (customRound(c_m) >= parseFloat(4 + '.' + f_rq)) {
            rq -= 1
            c_m = ((c_m * c_n + 4) / (c_n + 1))
            c_n += 1
            console.log(c_m)
        }
    }
    r[1] = rq

    // 3
    console.log("3:")
    c_m = mean;
    c_n = n;
    rq = 0
    if (mean < parseFloat(2 + '.' + f_rq)) {
        while (customRound(c_m) < parseFloat(2 + '.' + f_rq)) {
            rq += 1
            c_m = ((c_m * c_n + 3) / (c_n + 1))
            c_n += 1
            console.log(c_m)
        }
    }
    else if (c_m >= parseFloat(3 + '.' + f_rq)) {
        while (c_m >= parseFloat(3 + '.' + f_rq)) {
            rq -= 1
            c_m = ((c_m * c_n + 3) / (c_n + 1))
            c_n += 1
            console.log(c_m)
        }
    }
    r[2] = rq

    // 2
    console.log("2:")
    c_m = mean;
    c_n = n;
    rq = 0
    if (customRound(c_m) >= parseFloat(2 + '.' + f_rq)) {
        while (customRound(c_m) >= parseFloat(2 + '.' + f_rq)) {
            rq -= 1
            c_m = ((c_m * c_n + 2) / (c_n + 1))
            c_n += 1
            console.log(c_m)
        }
    }
    r[3] = rq

    if (r[0] == 0) {
        r[0] = "Готово"
    }
    if (r[1] == 0) {
        r[1] = "Готово"
    }
    if (r[2] == 0) {
        r[2] = "Готово"
    }
    if (r[3] == 0) {
        r[3] = "Готово"
    }


    document.getElementById("res-5").textContent = r[0];
    document.getElementById("res-4").textContent = r[1];
    document.getElementById("res-3").textContent = r[2];
    document.getElementById("res-2").textContent = r[3];
    // console.log(r)

}