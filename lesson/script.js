"use strict";

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function () {
        do {
            money = prompt("Ваш месячный доход?");
        }
        while (!isNumber(money));
    };

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses : [],
    deposit: false,
    mission: 120000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    expensesQuestion: [],
    asking: function(){
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
            appData.addExpenses = addExpenses.toLowerCase().split(", ");
            appData.deposit = confirm("Есть ли у вас депозит в банке?");

            for (let i = 0; i < 2; i++) {
            
                appData.expensesQuestion[i] = prompt("Введите обязательную статью расходов?");
                
                let amount = prompt("Во сколько это обойдется?");
    
                while (!isNumber(amount)) {
                    amount = prompt("Во сколько это обойдется?");
                }
    
                appData.expenses[appData.expensesQuestion[i]] = +amount;
            }
    },
    getExpensesMonth: function(){
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
            return ("У вас высокий уровень дохода");
        } else if ((appData.budgetDay >= 600) && (appData.budgetDay < 1200)) {
            return ("У вас средний уровень дохода");
        } else if ((appData.budgetDay < 600) && (appData.budgetDay >= 0)) {
            return ("К сожалению у вас уровень дохода ниже среднего");
        } else {
            return ("Что то пошло не так");
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth() < 0 ? console.log("Цель не будет достигнута") : 
console.log("Цель будет достигнута за " + appData.getTargetMonth() + " месяцев");
console.log("Расходы за месяц " + appData.expensesMonth);
console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log("Наша програма включает в себя данные: " + "ключ: " + key + " значение: " + appData[key]);
}

