"use strict";

let start = document.getElementById("start"),
    buttonFirst = document.getElementsByTagName("button")[0],
    buttonSecond = document.getElementsByTagName("button")[1],
    depositBtn = document.querySelector("#deposit-check"),
    additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
    incomeFirst = document.querySelectorAll(".additional_income-item")[0],
    incomeSecond = document.querySelectorAll(".additional_income-item")[1],
    budgetMonth = document.getElementsByClassName("budget_month-value")[0],
    budgetDay = document.getElementsByClassName("budget_day-value")[0],
    expensesMonth = document.getElementsByClassName("expenses_month-value")[0],
    addIncome = document.getElementsByClassName("additional_income-value")[0],
    addExpensesValue = document.getElementsByClassName("additional_expenses-value")[0],
    incomePeriod = document.getElementsByClassName("income_period-value")[0],
    targetMonth = document.getElementsByClassName("target_month-value")[0],
    range = document.querySelector(".period-select"),
    rangeTitle = document.querySelector(".period-amount"),
    salary = document.querySelector(".salary-amount"),
    incomeTitle = document.querySelector(".income input.income-title"),
    expensesTitle = document.querySelector(".expenses input.expenses-title"),
    expensesItems = document.querySelectorAll(".expenses-items"),
    incomeItems = document.querySelectorAll(".income-items"),
    expensesItem = document.querySelector(".additional_expenses-item"),
    missionTarget = document.querySelector(".target-amount"),
    textInput = document.querySelectorAll('[placeholder="Наименование"]'),
    numberInput = document.querySelectorAll('[placeholder="Сумма"]');
    

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let updateValue = function(e) {
    rangeTitle.textContent = e.target.value;
};

function blockButton() {
    start.disabled = !salary.value.trim() ? true : false;
}

blockButton();



let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses : [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    expensesQuestion: [],
    start: function () {  
        
        appData.budget = +salary.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getIncomeMonth();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();

    },
    showResult: function(){
        budgetMonth.value = appData.budgetMonth;
        budgetDay.value = Math.floor(appData.budgetDay);
        expensesMonth.value = appData.expensesMonth;
        addExpensesValue.value = appData.addExpenses.join(", ");
        addIncome.value = appData.addIncome.join(", ");
        targetMonth.value = Math.ceil(appData.getTargetMonth());
        incomePeriod.value = appData.calcSaveMoney();        

        range.addEventListener("input", function(){
            incomePeriod.value = appData.calcSaveMoney();
        });
        
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.childNodes[1].value = "";
        cloneExpensesItem.childNodes[3].value = "";
        cloneExpensesItem.childNodes[1].addEventListener('input',()=> {
            cloneExpensesItem.childNodes[1].value = cloneExpensesItem.childNodes[1].value.replace(/[^-.,!?\s/а-я]/, '');
        });
        cloneExpensesItem.childNodes[3].addEventListener('input',()=> {
            cloneExpensesItem.childNodes[3].value =cloneExpensesItem.childNodes[3].value.replace (/\D/g, '');
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonSecond);
        expensesItems = document.querySelectorAll(".expenses-items");
        
        if(expensesItems.length === 3){
            buttonSecond.style.display = "none";
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.childNodes[1].value = "";
        cloneIncomeItem.childNodes[3].value = "";
        cloneIncomeItem.childNodes[1].addEventListener('input',()=> {
            cloneIncomeItem.childNodes[1].value = cloneIncomeItem.childNodes[1].value.replace(/[^-.,!?\s/а-я]/, '');
        });
        cloneIncomeItem.childNodes[3].addEventListener('input',()=> {
            cloneIncomeItem.childNodes[3].value = cloneIncomeItem.childNodes[3].value.replace (/\D/g, '');
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonFirst);
        incomeItems = document.querySelectorAll(".income-items");

        if(incomeItems.length === 3){
            buttonFirst.style.display = "none";
        }
        
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector(".expenses-title").value;
            let cashExpenses = item.querySelector(".expenses-amount").value;
            if(itemExpenses !== "" && cashExpenses !== "") {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector(".income-title").value;
            let cashIncome = item.querySelector(".income-amount").value;
            if(itemIncome !== "" && cashIncome !== "") {
                appData.income[itemIncome] = +cashIncome;
            }
        });
    },
    getAddExpenses: function(){
        let addExpenses = expensesItem.value.split(",");
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== "") {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ""){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function(){
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getIncomeMonth: function(){
        for (let key in appData.income) {
            appData.incomeMonth += appData.income[key];
        }
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function(){
        return missionTarget.value / appData.budgetMonth;
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
        return appData.budgetMonth * range.value;
    },
    getInputNumber: function() {
        numberInput.forEach(function(input){
            input.addEventListener('input',()=> {
                input.value = input.value.replace (/\D/g, '');
            });
        });
    },
    getInputText: function() {
        textInput.forEach(function(input){
            input.addEventListener('input',()=> {
                input.value = input.value.replace(/[^-.,!?\s/а-я]/, '');
            });
        });
    }
};

start.addEventListener("click", appData.start);

buttonSecond.addEventListener("click", appData.addExpensesBlock);

buttonFirst.addEventListener("click", appData.addIncomeBlock);

range.addEventListener("input", updateValue);

salary.addEventListener("input", blockButton);

appData.getInputNumber();

appData.getInputText();


// appData.getTargetMonth() < 0 ? console.log("Цель не будет достигнута") : 
// console.log("Цель будет достигнута за " + appData.getTargetMonth() + " месяцев");
// appData.getInfoDeposit();

