"use strict";

// первое задание

let arr = ['642', '274', '389', '5789', '4767', '4478', '1344'];

for (let i = 0; i < arr.length; i++) {
    if (arr[i].startsWith('2') || arr[i].startsWith('4')) {
        console.log(arr[i]);
    }
}

// второе задание

let n = 100;

run:
for (let i = 2; i <= n; i++) {

  for (let j = 2; j < i; j++) {
    if (i % j === 0) continue run;
  }
  console.log("Делители этого числа: 1 и " + i);
}

