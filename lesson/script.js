"use strict";

document.addEventListener("DOMContentLoaded", function(event) {
   
    function DomElement(selector, height, width, bg, position){
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.position = position;
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
       
        elemTag.style.cssText = this.height + this.width + this.bg + this.position;
        document.body.prepend(elemTag);

        elemTag.style.left = 0;
        elemTag.style.top = 0;
        let positionX = 0;
        let positionY = 0;

        document.addEventListener("keydown", function(e){
            if(e.keyCode === 39) return (elemTag.style.left = (positionX += 10) + "px");
            if(e.keyCode === 37) return (elemTag.style.left = (positionX -= 10) + "px");
            if(e.keyCode === 38) return (elemTag.style.top = (positionY -= 10) + "px");
            if(e.keyCode === 40) return (elemTag.style.top = (positionY += 10) + "px");
        });
    };
    
    let button = new DomElement(".btn", "height: 100px;", "width: 100px;", "background-color: red;", "position: absolute;");
    
    button.create();

});

