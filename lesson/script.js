"use strict";

let banner = document.querySelector(".adv"),
    body = document.querySelector("body"),
    blocks = document.querySelector(".books"),
    block = document.querySelectorAll(".book"),
    title = document.querySelectorAll("a"),
    item = document.createElement("li"),
    books = document.querySelectorAll("ul"),
    chapter = books[2].querySelectorAll("li"),
    article = books[0].querySelectorAll("li"),
    section = books[5].querySelectorAll("li");


banner.remove();
body.setAttribute("style", "background-image: url(image/you-dont-know-js.jpg)");
blocks.appendChild(block[2]);
blocks.insertBefore(block[1], block[0]);
blocks.insertBefore(block[4], block[3]);
title[4].textContent = "Книга 3. this и Прототипы Объектов";
item.textContent = "Глава 8: За пределами ES6";
books[2].insertBefore(item, chapter[9]);
books[0].insertBefore(article[2], article[10]);
books[0].insertBefore(article[6], article[4]);
books[0].insertBefore(article[8], article[4]);
books[5].insertBefore(section[9], section[2]);
books[5].insertBefore(section[5], section[8]);
books[5].insertBefore(section[2], section[6]);
