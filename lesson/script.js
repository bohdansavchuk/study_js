'use strict';

let body = document.querySelector("body"),
    button = document.querySelector("#btn"),
    div = document.createElement("div");
    
document.body.append(div);

let generateColor = function() {
  let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  body.style.background = color;
  button.style.color = color;
  div.textContent = color;
};

generateColor();

button.addEventListener("click", generateColor);

