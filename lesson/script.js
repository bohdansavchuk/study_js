"use strict";

let week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  let today = new Date().getDay();

for (let i = 0; i < week.length; i++) {
  if (i === today && i === 6 || i === 0) {
    if (week[i] === 'saturday' || week[i] === 'sunday') {
      document.write(`<p><em><b>${week[i]}</b></em></p>`);
    } else {
      document.write(`<p><b>${week[i]}</b></p>`);
    }
  } else if (week[i] === 'saturday' || week[i] === 'sunday') {
    document.write(`<p><em>${week[i]}</em></p>`);
  } else {
    document.write(`<p>${week[i]}</p>`);
  }
}