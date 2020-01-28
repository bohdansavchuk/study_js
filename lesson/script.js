"use strict";

// let money = 1500;
let income = "freelace";
let addExpences = "Internet, Books, Car";
let arr = addExpences.toLowerCase().split(", ");
// let deposit = true;
let mission = 120000;
let period = 12;  

let money = prompt("Ваш месячный доход?");
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let deposit = confirm("Есть ли у вас депозит в банке?");
let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = +prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = +prompt("Во сколько это обойдется?");
let budgetMonth = +money - (amount1 + amount2);
let target = Math.ceil(mission / budgetMonth); 
let budgetDay = Math.floor(budgetMonth / 30);

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpences.length);
console.log(arr);
console.log("Цель заработать " + mission + " гривен");  
console.log("Период равен " + period + " месяцев");   
console.log("Бюджет на месяц " + budgetMonth);
console.log("Цель будет достигнута за " + target + " месяцев");
console.log("Бюджет на день: " + budgetDay);

if (budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода");
} else if ((budgetDay >= 600) && (budgetDay < 1200)) {
    console.log("У вас средний уровень дохода");
} else if ((budgetDay < 600) && (budgetDay >= 0)) {
    console.log("К сожалению у вас уровень дохода ниже среднего");
} else {
    console.log("Что то пошло не так");
}

