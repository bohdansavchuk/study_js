"use strict";

let income = "freelace",
    mission = 120000,
    period = 12,
    money = +prompt("Ваш месячный доход?"),
    addExpences = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    arr = addExpences.toLowerCase().split(", "),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    expenses1 = prompt("Введите обязательную статью расходов?"),
    amount1 = +prompt("Во сколько это обойдется?"),
    expenses2 = prompt("Введите обязательную статью расходов?"),
    amount2 = +prompt("Во сколько это обойдется?");

let showTypeOf = function(data){
    return (typeof(data));
};
function getExpensesMonth(){
    return amount1 + amount2;
}
function getAccumulatedMonth(){
    return money - getExpensesMonth();
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

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log(getExpensesMonth());
console.log(arr);
console.log("Цель будет достигнута за " + getTargetMonth() + " месяцев");
console.log("Бюджет на день: " + budgetDay);
console.log(getStatusIncome());

