window.addEventListener('DOMContentLoaded', function(){

    "use strict";

    const getHello = document.getElementById('hello'),
        getToday = document.getElementById('today'),
        getTime = document.getElementById('time'),
        getDays = document.getElementById('days');

    function getData() {
        let date = new Date(),
        hours = date.getHours(),
        weekDay = date.toLocaleString('ru', {weekday: 'long'}),
        time = date.toLocaleTimeString('en'),  
        daysToNewYear = Math.floor((Date.parse('31 december 2020') - Date.now()) / 1000 / 60 / 60 / 24);

        if (hours <= 6) {
            getHello.textContent = 'Доброй ночи!';
        } else if (hours > 6 && hours <= 10) {
            getHello.textContent = 'Доброе утро!';
        } else if (hours > 10 && hours <= 18) {
            getHello.textContent = 'Добрый день!';
        } else {
            getHello.textContent = 'Добрый вечер!';
        }

        getToday.textContent = "Сегодня: " + weekDay;
        getTime.textContent = "Текущее время: " + ("0" + time);
        getDays.textContent = "До Нового Года осталось " + daysToNewYear + " дней!";
    }

    getData();
    setInterval(getData, 1000);
});

