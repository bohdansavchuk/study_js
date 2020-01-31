"use strict";

let isNumber = function(a) {
    return !isNaN(parseFloat(a)) && isFinite(a);
}; 

function guess() {

    let n = 88;
    let count = 10;

    function income() {

        let start = prompt("Угадай число от 1 до 100");

        if (start === null) {
            alert ("До скорой встречи!");
            return;
        }

        start = start.trim();

        if (!isNumber(+start) || start === "") {
            alert("Введи число!");
            return income();
        }
        
        count--; 

        if (+start === n) {
            if (!confirm("Поздравляю, Вы угадали!!! Хотели бы сыграть еще?")) {
                alert ("До скорой встречи!");
                return;
            } else {
                count = 10;
                n = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
                return income();
            } 
        } 

        if (count === 0){
            if (!confirm("Попытки закончились, хотите сыграть еще?")) {
                alert ("До скорой встречи!");
                return;
            } else {
                count = 10;
                return income();
            }
        }

        if (+start > n) {
            alert("Загаданное число меньше, у вас осталось " + count + " попыток");
            return income();
        }

        if (+start < n && start !== null) {
            alert("Загаданное число больше, у вас осталось " + count + " попыток");
            return income();
        }
      
    }

    return income();
    
}

guess();

