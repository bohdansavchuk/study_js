"use strict";

let isNumber = function(a) {
    return !isNaN(parseFloat(a)) && isFinite(a);
}; 

function guess() {

  let n = 88;
  
  function income() {

      let start = prompt("Угадай число от 1 до 100");

      if (+start > n) {
          alert("Загаданное число меньше");
          income();
      }
      if (+start < n && start !== null) {
          alert("Загаданное число больше");
          income();
      }
      if (!isNumber(+start)) {
          alert("Введи число!");
          income();
      }
      if (start === null) {
          return;
      }
      if (+start === n) {
          return;
      } 
  }
  
  return income();   
}

guess();

