'use strict';

function DomElement(selector, height, width, bg, fontSize){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.create = function(){
    let elem = this.selector;
    let elemTag;

    if(elem[0] === "."){
        elemTag = document.createElement("div");
        elemTag.classList.add(elem.slice(1));
    } 
    else if(elem[0] === "#") {
        elemTag = document.createElement("p");
        elemTag.id = elem.slice(1);
    } else {
        alert ("Введите верный селектор!");
    }
   
    elemTag.textContent = "button";
    elemTag.style.cssText = this.height + this.width + this.bg + this.fontSize;
    document.body.prepend(elemTag);
};

let button = new DomElement(".btn", "height: 100px;", "width: 200px;", "background-color: red;", "font-size: 25px;");

button.create();

