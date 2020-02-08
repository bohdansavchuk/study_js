"use strict";

let mainBtn = document.getElementById("start");
let buttonFirst = document.getElementsByTagName("button")[0];
let buttonSecond = document.getElementsByTagName("button")[1];
let depositBtn = document.querySelector("#deposit-check");
let incomeFirst = document.querySelectorAll(".additional_income-item")[0];
let incomeSecond = document.querySelectorAll(".additional_income-item")[1];
let budgetMonth = document.getElementsByClassName("budget_month-value")[0];
let budgetDay = document.getElementsByClassName("budget_day-value")[0];
let expensesMonth = document.getElementsByClassName("expenses_month-value")[0];
let addIncom = document.getElementsByClassName("additional_income-value")[0];
let addExpenses = document.getElementsByClassName("additional_expenses-value")[0];
let incomePeriod = document.getElementsByClassName("income_period-value")[0];
let targetMonth = document.getElementsByClassName("target_month-value")[0];
let range = document.querySelector(".period-select");
let salary = document.querySelector(".salary-amount");
let incomeTitle = document.querySelector(".income input.income-title");
let incomeAmount = document.querySelector(".income-amount");
let expensesTitle = document.querySelector(".expenses input.expenses-title");
let expensesAmount = document.querySelector(".expenses-amount");
let expensesItem = document.querySelector(".additional_expenses-item");
let missionTarget = document.querySelector(".target-amount");

console.log(mainBtn);
console.log(buttonFirst);
console.log(buttonSecond);
console.log(depositBtn);
console.log(incomeFirst);
console.log(incomeSecond);
console.log(budgetMonth);
console.log(budgetDay);
console.log(expensesMonth);
console.log(addIncom);
console.log(addExpenses);
console.log(incomePeriod);
console.log(targetMonth);
console.log(range);
console.log(salary);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(expensesItem);
console.log(missionTarget);

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
                itemIncome  = prompt("Есть ли у вас дополнительный источник заработка?");
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

            appData.addExpenses = addExpenses.split(", ");

            for (let i = 0; i < appData.addExpenses.length; i++) {
                appData.addExpenses[i] = appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].slice(1).toLowerCase();
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
                appData.moneyDeposit = prompt("ККакая сумма заложена?");
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

for (let key in appData) {
    console.log("Наша програма включает в себя данные: " + "ключ: " + key + " значение: " + appData[key]);
}

console.log(appData.addExpenses);


