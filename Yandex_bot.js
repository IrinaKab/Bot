
Tampermonkey® by Jan Biniok
v4.12
	
Bot for Yandex
by You
1
// ==UserScript==
2
// @name         Bot for Yandex
3
// @namespace    http://tampermonkey.net/
4
// @version      0.1
5
// @description  try to take over the world!
6
// @author       You
7
// @match        https://yandex.ru/*
8
// @icon         
9
// @grant        none
10
// ==/UserScript==
11
​
12
let keywords=["гобой", "фагот", "как звучит флейта"];
13
let btn=document.getElementsByClassName('button mini-suggest__button')[0];
14
let links=document.links;
15
let keyword=keywords[getRandom(0,keywords.length)];
16
​
17
​
18
​
19
​
20
if(btn!==undefined){
21
    document.getElementsByName('text')[0].value=keyword;
22
    document.getElementsByClassName('button mini-suggest__button')[0].click();
23
    }else{
24
​
25
        for(let i=0; i<links.length; i++){
26
            if(links[i].href.indexOf('xn----7sbab5aqcbiddtdj1e1g.xn--p1ai')!=-1){
27
                let link=links[i];
28
                console.log("Нашёл фразу"+link);
29
                
30
                link.click();
31
                break;
32
            }
33
        }
34
    }
35
​
36
function getRandom(min,max){
37
    return Math.floor(Math.random()*(max-min)+min);
38
}
