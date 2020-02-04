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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 120000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    expensesQuestion: [],
    asking: function(){

        if(confirm("Есть ли у вас дополнительный источник заработка?")) {
            let itemIncome = prompt("Какой у вас дополнительный заработок?");

            while (isNumber(itemIncome) || itemIncome.trim() === "" ) {
                itemIncome  = prompt("Какой у вас дополнительный заработок?");
            }

            let cashIncome = prompt ("Сколько в месяц вы на этом зарабатываете?");

            while (!isNumber(cashIncome)) {
                cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?");
            }

            appData.income[itemIncome] = cashIncome;

        }

        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");

            while (isNumber(addExpenses) || addExpenses.trim() === "" ) {
                addExpenses  = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
            }

            appData.addExpenses = addExpenses.split(",");

            for (let i = 0; i < appData.addExpenses.length; i++) {
                let trimmed = appData.addExpenses[i].trim();
                appData.addExpenses[i] = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
            }
            
            appData.addExpenses = appData.addExpenses.join(", ");

            appData.deposit = confirm("Есть ли у вас депозит в банке?");

            for (let i = 0; i < 2; i++) {
            
                appData.expensesQuestion[i] = prompt("Введите обязательную статью расходов?");

                while (isNumber(appData.expensesQuestion[i]) || appData.expensesQuestion[i].trim() === "" ) {
                    appData.expensesQuestion[i]  = prompt("Введите обязательную статью расходов?");
                }
                
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
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            appData.percentDeposit = prompt("Какой годовой процент?");

            while (!isNumber(appData.percentDeposit)) {
                appData.percentDeposit = prompt("Какой годовой процент?");
            }

            appData.moneyDeposit = prompt("Какая сумма заложена?");

            while (!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = prompt("Какая сумма заложена?");
            }
        }
    },
    calcSaveMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth() < 0 ? console.log("Цель не будет достигнута") : 
console.log("Цель будет достигнута за " + appData.getTargetMonth() + " месяцев");
console.log("Расходы за месяц " + appData.expensesMonth);
console.log(appData.getStatusIncome());
appData.getInfoDeposit();

for (let key in appData) {
    console.log("Наша програма включает в себя данные: " + "ключ: " + key + " значение: " + appData[key]);
}

console.log(appData.addExpenses);