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
    start: () =>  {  
        
        this.budget = +salary.value;

        appData.getExpenses().call(appData);
        appData.getIncome().call(appData);
        appData.getIncomeMonth().call(appData);
        appData.getExpensesMonth().call(appData);
        appData.getAddExpenses().call(appData);
        appData.getAddIncome().call(appData);
        appData.getBudget().call(appData);
        appData.showResult().call(appData);

    },
    showResult: () => {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = Math.floor(this.budgetDay);
        expensesMonth.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(", ");
        addIncome.value = this.addIncome.join(", ");
        targetMonth.value = Math.ceil(this.getTargetMonth());
        incomePeriod.value = this.calcSaveMoney();        

        range.addEventListener("input", function(){
            incomePeriod.value = this.calcSaveMoney();
        });
    },
    addExpensesBlock: () => {
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
    addIncomeBlock: () => {
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
    getExpenses: () => {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector(".expenses-title").value;
            let cashExpenses = item.querySelector(".expenses-amount").value;
            if(itemExpenses !== "" && cashExpenses !== "") {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: () => {
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector(".income-title").value;
            let cashIncome = item.querySelector(".income-amount").value;
            if(itemIncome !== "" && cashIncome !== "") {
                this.income[itemIncome] = +cashIncome;
            }
        });
    },
    getAddExpenses: () => {
        let addExpenses = expensesItem.value.split(",");
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== "") {
                this.addExpenses.push(item);
            }
        });
    },
    getAddIncome: () => {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ""){
                this.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: () => {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },
    getIncomeMonth: () => {
        for (let key in appData.income) {
            this.incomeMonth += this.income[key];
        }
    },
    getBudget: () => {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },
    getTargetMonth: () => {
        return missionTarget.value / this.budgetMonth;
    },
    getStatusIncome: () => {
        if (this.budgetDay >= 1200) {
            return ("У вас высокий уровень дохода");
        } else if ((this.budgetDay >= 600) && (this.budgetDay < 1200)) {
            return ("У вас средний уровень дохода");
        } else if ((this.budgetDay < 600) && (this.budgetDay >= 0)) {
            return ("К сожалению у вас уровень дохода ниже среднего");
        } else {
            return ("Что то пошло не так");
        }
    },
    getInfoDeposit: () => {
        if(this.deposit){
            this.percentDeposit = prompt("Какой годовой процент?");

            while (!isNumber(this.percentDeposit)) {
                this.percentDeposit = prompt("Какой годовой процент?");
            }

            this.moneyDeposit = prompt("Какая сумма заложена?");

            while (!isNumber(this.moneyDeposit)) {
                this.moneyDeposit = prompt("Какая сумма заложена?");
            }
        }
    },
    calcSaveMoney: () => {
        return this.budgetMonth * range.value;
    },
    getInputNumber: () =>  {
        numberInput.forEach(function(input){
            input.addEventListener('input',()=> {
                input.value = input.value.replace (/\D/g, '');
            });
        });
    },
    getInputText: () =>  {
        textInput.forEach(function(input){
            input.addEventListener('input',()=> {
                input.value = input.value.replace(/[^-.,!?\s/а-я]/, '');
            });
        });
    }
};

start.addEventListener("click", appData.start.bind(appData));

buttonSecond.addEventListener("click", appData.addExpensesBlock);

buttonFirst.addEventListener("click", appData.addIncomeBlock);

range.addEventListener("input", updateValue);

salary.addEventListener("input", blockButton);

appData.getInputNumber();

appData.getInputText();


// appData.getTargetMonth() < 0 ? console.log("Цель не будет достигнута") : 
// console.log("Цель будет достигнута за " + appData.getTargetMonth() + " месяцев");
// appData.getInfoDeposit();

