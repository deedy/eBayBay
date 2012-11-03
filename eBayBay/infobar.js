// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Obtain the count of sandwiches from the page URL.
var params = window.location.hash.substring(1);
params = params.split("|");
var link = params[0];
var price = params[1];
var name = params[2];
var ebayprice = params[3];
var usedprice = params[4];
var site = params[5];
if (link) {
  // Replace the placeholder text with the actual count.

  var dom1 = document.querySelector('#price');
 dom1.innerText = price;
  if (name.length>40) {
  	name = name.substring(0,40) + "...";
  }
  var dom2 = document.querySelector('#name');
 dom2.innerText = name;
 
 var dom3 = document.querySelector('#ebayPrice');
 dom3.innerText = ebayprice;
  var dom4= document.querySelector('#link');
 dom4.href= link;
  var dom7= document.querySelector('#site');
  console.log(site);
 dom7.innerText= site;
 var dom8= document.querySelector('#buttonText');
 dom8.innerText= "SAVE upto "+Math.round(price - ebayprice)+"% now";
 if (usedprice!=price) {
 	console.log(link);
 	var dom5= document.querySelector('#usedtext');
 	dom5.style.display = 'inline';
 	var dom6 = dom5.querySelector('#usedPrice');
 	dom6.innerText = usedprice;
 }


  // console.log(link);
  // window.alert("boo");
  // var dom = document.getElementById('wrap');
  // dom.getElementById("link")[0].setAttribute("href",link);
}
