// ==UserScript==
// @name         Bot for Yandex за 2021-04-27
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match		 https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon
// @grant        none
// ==/UserScript==

let keywords=["гобой", "флюгельгорн", "как звучит флейта"];

let btn=document.getElementsByClassName('button mini-suggest__button')[0];
let links=document.links;
let keyword=keywords[getRandom(0,keywords.length)];
let yandexInput = document.getElementsByName('text')[0];
let i = 0;


if(btn!==undefined){
    let timerId = setInterval(()=> {
		yandexInput.value += keyword[i];
		i++;
		if(i == keyword.length) {
			clearInterval(timerId);
			btn.click();
		}
	}, 1000);



    }else if(location.hostname == "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai" ) {
	console.log("Мы на Музыкалка-онлайн");
	setTimeout(()=>{
		let index = getRandom(0,links.length);

		if(getRandom(0,101)>=70) {
			location.href = "https://www.yandex.ru/";
		}
		if(links[index].href.indexOf('xn----7sbab5aqcbiddtdj1e1g.xn--p1ai')!=-1)
			links[index].click();
	},getRandom(2000,3500));
}
else{
	let nextYandexPage = true;
	for(let i=0; i<links.length; i++) {
		if(links[i].href.indexOf('xn----7sbab5aqcbiddtdj1e1g.xn--p1ai')!=-1) {
			let link = links[i];
			nextYandexPage = false;
			console.log("Нашел фразу" + link);
			setTimeout(()=>{
                link.removeAttribute("target");
                link.click();},getRandom(1000,4500));
			break;
		}
	}





	if(document.querySelector('.pager__item.pager__item_current_yes.pager__item_kind_page').innerText == "5") {
		nextYandexPage = false;
		location.href = "https://www.yandex.ru/";
	}

	if(document.querySelector('.pager__item.pager__item_current_yes.pager__item_kind_page').innerText !== "5") {
        setTimeout(()=>{
			document.querySelector('.pager__item_kind_next').click();}
				   ,getRandom(3000,5000));
	}
}

function getRandom(min,max) {
	return Math.floor(Math.random()*(max-min)+min);
}
