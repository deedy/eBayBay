/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
var regex = /sandwich/gi;
var span = "addToCartSpan"
matches = document.location.href.match(/amazon/gi);
matches2 = document.getElementById('addToCartSpan').innerText;
prodname = document.getElementById('btAsinTitle').innerText;
price = document.getElementById('actualPriceValue').innerText;
isbn = document.body.innerText.match(/\d{10}/gi);

price
if (matches) {
  //Calculation of Amazon Price
  var numbers = price.match(/\d{1,}\.\d{2}/gi);
  var value = 0.0;
  for (var i =0; i < numbers.length;i++) {
  	value += parseFloat(numbers[i]);
  }
  
  //Getting the eBay Price
  var url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByProduct&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=MinniJin-2113-4639-be29-50cc078bc4f0&RESPONSE-DATA-FORMAT=XML&REST-PAYLOAD&productId.@type=ISBN&productId=";
  var url2 = "&paginationInput.entriesPerPage=1&paginationInput.pageNumber=1&sortOrder=PricePlusShippingLowest";
 var eBayInfo=httpGet(url+isbn[0]+url2);
   txt = eBayInfo.match(/<convertedCurrentPrice currencyId="USD">[^<]{1,}<\/convertedCurrentPrice>/gi);
  txt = txt[0].match(/\d{1,}\.\d{1,}/gi);
   var ebayprice = parseFloat(txt);

   if (ebayprice<value) {
	   //Getting the eBay URL
	   var html = eBayInfo.match(/<viewItemURL>[^<]{1,}<\/viewItemURL>/gi);
	   html = html[0].substring(html[0].indexOf(">")+1,html[0].lastIndexOf("<"));
	   console.log(html);

	  console.log(ebayprice);
	  var payload = {
	    //count: matches.length,    // Pass the number of matches back.
	    link: html,
	    price: value,
	    name: prodname,
	    eprice: ebayprice
	  };
	  chrome.extension.sendRequest(payload, function(response) {});
	}
}

function httpGet(theUrl)
{
var xmlHttp = null;
xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", theUrl, false );
xmlHttp.send( null );
return xmlHttp.responseText;
}