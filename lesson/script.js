"use strict";

let getString = function(a) {
    if (typeof(a) !== "string") {
        return ("It's not a string!");
    } else if (a.length > 30) {
        let stringClear = a.trim();
        let sliceString = stringClear.slice(0, 30);     
        let finalString = sliceString + "...";  
        return finalString;
    } else if (a.length < 30){
        let stringClear = a.trim();
        return stringClear;
    }
};

console.log(getString("    lllllvvvvvvvvvvvvvvvvgggggggggggggghhhhhhh   "));

