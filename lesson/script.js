"use strict";

let dateTime = function() {

    let currentDatetime = new Date(),
        year = currentDatetime.getFullYear(),
        hours = currentDatetime.getHours(),
        minutes = currentDatetime.getMinutes(),
        seconds = currentDatetime.getSeconds(),
        hoursForm = ["час", "часа", "часов"],
        minutesForm = ["минута", "минуты", "минут"],
        secondsForm = ["секунда", "секунды", "секунд"],
        options = {
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };

    let num = function(n, forms) {  
        n = Math.abs(n) % 100; 
        let n1 = n % 10;
        if (n > 10 && n < 20) {
             return forms[2]; 
        }
        if (n1 > 1 && n1 < 5) { 
            return forms[1]; 
        }
        if (n1 === 1) {
             return forms[0]; 
        }
        return forms[2];
    };
    

    return "Сегодня" + " " + currentDatetime.toLocaleString("ru", options) + " " + year + " года" + " - " + hours + " " + num(hours, hoursForm) + " " + minutes + " " + num(minutes, minutesForm) + " " + seconds + " "  + num(seconds, secondsForm);
};

setInterval(function () {
    document.getElementById('time').innerHTML = dateTime();
}, 1000);

