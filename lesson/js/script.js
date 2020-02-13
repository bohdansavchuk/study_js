"use strict";

const start = document.getElementById("start"),
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
    expensesItem = document.querySelector(".additional_expenses-item"),
    missionTarget = document.querySelector(".target-amount"),
    textInput = document.querySelectorAll('[placeholder="Наименование"]'),
    numberInput = document.querySelectorAll('[placeholder="Сумма"]'),
    cancel = document.getElementById("cancel"),
    inputTypeText = document.querySelectorAll('[type="text"]');

let expensesItems = document.querySelectorAll(".expenses-items"),
incomeItems = document.querySelectorAll(".income-items");
    


class AppData {
    constructor(){
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.expensesQuestion = [];
    }

    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    start(){  
        this.budget = +salary.value;
        
        this.getExpenses();
        this.getIncome();
        this.getIncomeMonth();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        this.getInputsBlocked();
    }

    showResult() {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = Math.floor(this.budgetDay);
        expensesMonth.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(", ");
        addIncome.value = this.addIncome.join(", ");
        targetMonth.value = Math.ceil(this.getTargetMonth());
        incomePeriod.value = this.calcSaveMoney();        
    
        range.addEventListener("input", () => {
            incomePeriod.value = this.calcSaveMoney();
        });
    }

    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.classList.add("new");
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
    }

    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.classList.add("new");
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
    }

    getExpenses() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector(".expenses-title").value;
            const cashExpenses = item.querySelector(".expenses-amount").value;
            if(itemExpenses !== "" && cashExpenses !== "") {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    }

    getIncome() {
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector(".income-title").value;
            const cashIncome = item.querySelector(".income-amount").value;
            if(itemIncome !== "" && cashIncome !== "") {
                this.income[itemIncome] = +cashIncome;
            }
        });
    }

    getAddExpenses() {
        const addExpenses = expensesItem.value.split(",");
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== "") {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== ""){
                this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for (const key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }

    getIncomeMonth() {
        for (const key in this.income) {
            this.incomeMonth += this.income[key];
        }
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    }

    getTargetMonth() {
        return missionTarget.value / this.budgetMonth;
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return ("У вас высокий уровень дохода");
        } else if ((this.budgetDay >= 600) && (this.budgetDay < 1200)) {
            return ("У вас средний уровень дохода");
        } else if ((this.budgetDay < 600) && (this.budgetDay >= 0)) {
            return ("К сожалению у вас уровень дохода ниже среднего");
        } else {
            return ("Что то пошло не так");
        }
    }

    getInfoDeposit() {
        if(this.deposit){
            this.percentDeposit = prompt("Какой годовой процент?");
    
            while (!this.isNumber(this.percentDeposit)) {
                this.percentDeposit = prompt("Какой годовой процент?");
            }
    
            this.moneyDeposit = prompt("Какая сумма заложена?");
    
            while (!this.isNumber(this.moneyDeposit)) {
                this.moneyDeposit = prompt("Какая сумма заложена?");
            }
        }
    }

    calcSaveMoney() {
        return this.budgetMonth * range.value;
    }

    getInputNumber()  {
        numberInput.forEach((input) => {
            input.addEventListener('input',()=> {
                input.value = input.value.replace (/\D/g, '');
            });
        });
    }

    getInputText() {
        textInput.forEach((input) => {
            input.addEventListener('input',()=> {
                input.value = input.value.replace(/[^-.,!?\s/а-я]/, '');
            });
        });
    }

    getInputsBlocked(){
        expensesItem.disabled = true;
        buttonFirst.disabled = true;
        buttonSecond.disabled = true;
        let inputTypeText = document.querySelectorAll('[type="text"]');
        inputTypeText.forEach((input) => {
            input.disabled = "true";
        });
        start.style.display = "none";
        cancel.style.display = "block";        
    }

    blockButton() {
        start.disabled = !salary.value.trim() ? true : false;
    }

    updateValue(e){
        rangeTitle.textContent = e.target.value;
    }

    reset() {
        expensesItem.disabled = false;
        buttonFirst.disabled = false;
        buttonSecond.disabled = false;
        buttonFirst.style.display = "block";
        buttonSecond.style.display = "block";
        rangeTitle.textContent = 1;
        range.value = "1";
        start.style.display = "block";
        cancel.style.display = "none"; 
        const newInputs = document.querySelectorAll(".new");
        let inputTypeText = document.querySelectorAll('[type="text"]');
        newInputs.forEach((input) => {
            input.remove();
        });
        textInput.forEach((input) => {
            input.disabled = false;
        });
        numberInput.forEach((input) => {
            input.disabled = false;
        });
        inputTypeText.forEach((input) => {
            input.value = "";
            input.disabled = false;
        });
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses  = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.expensesQuestion = [];
    }
    
    eventListeners(){
        start.addEventListener("click", this.start.bind(this));
    
        cancel.addEventListener("click", this.reset.bind(this));
    
        buttonSecond.addEventListener("click", this.addExpensesBlock);
    
        buttonFirst.addEventListener("click", this.addIncomeBlock);
    
        range.addEventListener("input", this.updateValue);
    
        salary.addEventListener("input", this.blockButton);
    
        this.getInputNumber();
    
        this.getInputText();
    
        this.blockButton();
    }
}

const appData = new AppData();

appData.eventListeners();


// appData.getTargetMonth() < 0 ? console.log("Цель не будет достигнута") : 
// console.log("Цель будет достигнута за " + appData.getTargetMonth() + " месяцев");
// appData.getInfoDeposit();

