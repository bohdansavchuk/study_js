"use strict";

// if

let lang = 'en';
if (lang === 'ru') {
    let arr = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    console.log(arr);
}
if (lang === 'en') {
    let arr = ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'];
    console.log(arr);
}

// switch-case

let lang1 = 'ru';
switch (lang1) {
	case 'ru':
        let arr1 = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
        console.log(arr1);
	break;
	case 'en':
        let arr2 = ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'];
        console.log(arr2);
	break;
}

// многомерный масив

let lang2 = 'en';
let arrey = {
	'ru':['пн', 'вт', 'ср','чт', 'пт', 'сб', 'вс'],
	'en':['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn']
};
console.log(arrey[lang2]);

let namePerson = "я";

let person = (namePerson === "Артем") ? console.log("директор") : 
(namePerson === "Максим") ? console.log("преподаватель") : 
console.log("студент");

