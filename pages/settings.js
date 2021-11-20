load()
function save(){
    localStorage['fraction_up'] = document.getElementById("fraction-input").value;
    localStorage['perform-calculations-round'] = document.getElementById("perform-calculations-round").checked;
    console.log(localStorage)
    if (customRound(0 + '.' + localStorage['fraction_up']) > 0 && localStorage['fraction_up'].length <= 3) {
        alert("Сохранено")
    }
    else {
        alert("Ошибка. Либо число не положительное (возможно, отключение округления поможет), либо слишком длинное. В целях воизбежания бесконечных/очень длительных вычислений, настройки будут сброшены.")
        reset()
    } 
}

function reset(){
    localStorage['perform-calculations-round'] = 'True';
    localStorage['fraction_up'] = '51';
    window.location.reload()
}

function load(){
    document.getElementById("fraction-input").value = localStorage['fraction_up']
    document.getElementById("perform-calculations-round").checked = (localStorage['perform-calculations-round'] == 'true')
}