"use strict";

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let income = "freelace",
    mission = 120000,
    period = 12,
    money,
    addExpences = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    arr = addExpences.toLowerCase().split(", "),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    expenses = [];

let start = function () {

    do {
        money = prompt("Ваш месячный доход?");
    }
    
    while (!isNumber(money));
};

start();

let showTypeOf = function(data){
    return (typeof(data));
};
function getExpensesMonth(){

    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt("Введите обязательную статью расходов?");
        
        let amount = prompt("Во сколько это обойдется?");

        while (!isNumber(amount)) {
            amount = prompt("Во сколько это обойдется?");
        }

        sum += +amount;
    }

    return sum;
}

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth(){
    return money - expensesAmount;
}
let accumulatedMonth = getAccumulatedMonth();
function getTargetMonth(){
    return Math.ceil(mission / accumulatedMonth);
}
let budgetDay = Math.floor(accumulatedMonth / 30);
let getStatusIncome = function(){
    if (budgetDay >= 1200) {
        return ("У вас высокий уровень дохода");
    } else if ((budgetDay >= 600) && (budgetDay < 1200)) {
        return ("У вас средний уровень дохода");
    } else if ((budgetDay < 600) && (budgetDay >= 0)) {
        return ("К сожалению у вас уровень дохода ниже среднего");
    } else {
        return ("Что то пошло не так");
    }
};

getTargetMonth() < 0 ? console.log("Цель не будет достигнута") : 
console.log("Цель будет достигнута за " + getTargetMonth() + " месяцев");

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log(expensesAmount);
console.log(arr);
console.log("Бюджет на день: " + budgetDay);
console.log(getStatusIncome());

