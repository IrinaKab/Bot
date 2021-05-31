// ==UserScript==
// @name         Bot for Yandex за 2021-04-28
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.yandex.ru/*
// @match		 https://napli.ru/*
// @match 	 	 https://psyholog.me/
// @match 	 	 https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon
// @grant        none
// ==/UserScript==

let sites = {
	"napli.ru":['10 самых популярных шрифтов от Google',
				'Отключение редакций и ревизий в WordPress',
				'Вывод произвольных типов записей и полей в WordPress'],
    "psyholog.me":["центр здоровых отношений",
				   "Услуги центра здоровых отношений",
				   "Чекалина Елена  психолог"],
	"xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":['Гобой','Как звучит флейта', 'Кларнет','Саксофон','Тромбон','Валторна']
};

let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let yandexInput = document.getElementsByName('text')[0];
let keywords = sites[site];
let keyword = keywords[getRandom(0,keywords.length)];
let btn = document.getElementsByName('button mini-suggest__button')[0];
let i =0;
let links = document.links;

if(btn !== undefined) {
	document.cookie = "site="+site;
}else if (location.hostname == "www.yandex.ru") {
	site = getCookie("site");
}else{
	site = location.hostname;
}

if(btn !== undefined){
	document.cookie = "site="+site;
	let timerId = setInterval(()=> {
		yandexInput.value += keyword[i];
		i++;
		if(i == keyword.length) {
			clearInterval(timerId);
			btn.click();
		}
	}, 100);



}else if(location.hostname == site ) {
	//console.log("Мы на napli.ru");
	setTimeout(()=>{
		let index = getRandom(0,links.length);

		if(getRandom(0,101)>=70) {
			location.href = "https://www.yandex.ru/";
		}
if(links[index].href.indexOf(site)!=-1)
			links[index].click();
	},getRandom(4000,7000));
}
else{
	let nextYandexPage = true;
	for(let i=0; i<links.length; i++) {
    if(links[i].href.indexOf(site)!=-1) {
			let link = links[i];
			nextYandexPage = false;
			//console.log("Нашел фразу" + link);
			setTimeout(()=>{                                       link.removeAttribute("target");
				link.click();},getRandom(3000,5000));
			break;
		}
	}
	if(document.querySelector('.pager__item.pager__item_current_yes.pager__item_kind_page').innerText == "5") {
		nextYandexPage = false;
		location.href = "https://www.yandex.ru/";
	}

	if(nextYandexPage) {
		setTimeout(()=>{
			document.querySelector('.pager__item_kind_next').click();}
				   ,getRandom(3000,5000));
	}
}

function getRandom(min,max) {
	return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
