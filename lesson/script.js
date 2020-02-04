"use strict";

let zero = function(date) {

    if (date < 10) {
        date = '0' + date;
    }

    return date;
};

let dateTime = function() {

    let currentDatetime = new Date();
    let day = zero(currentDatetime.getDate());
    let month = zero(currentDatetime.getMonth() + 1);
    let year = currentDatetime.getFullYear();
    let hours = zero(currentDatetime.getHours());
    let minutes = zero(currentDatetime.getMinutes());
    let seconds = zero(currentDatetime.getSeconds());

    return day + "." + month + "." + year + " - " + hours + ":" + minutes + ":" + seconds;
};

setInterval(function () {
    document.getElementById('time').innerHTML = dateTime();
}, 1000);

