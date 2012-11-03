
isAmazon = document.location.href.match(/amazon/gi);
isBnN = document.location.href.match(/barnesandnoble/gi);
	  var url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByProduct&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=MinniJin-2113-4639-be29-50cc078bc4f0&RESPONSE-DATA-FORMAT=XML&REST-PAYLOAD&productId.@type=ISBN&productId=";
	  var url2 = "&paginationInput.entriesPerPage=1&paginationInput.pageNumber=1&sortOrder=PricePlusShippingLowest";
if (isAmazon) {
	isAddToCart = document.getElementById("addToCartSpan");
	prodname = document.getElementById('btAsinTitle').innerText;
	price = document.getElementById('actualPriceValue').innerText;
	isbn = document.body.innerText.match(/\d{9}(X|\d)/gi);
	var ebayDBurl = url + isbn[0]+url2;
	 var eBayInfo=httpGet(ebayDBurl);
	 console.log(eBayInfo.match(/<ack>Failure<\/ack>/gi));
	if (isAmazon!=null && isAddToCart!=null && prodname!=null && price!=null && isbn!=null && eBayInfo.match(/<ack>Failure<\/ack>/gi)==null) {

	  //Calculation of Amazon Price
	  var numbers = price.match(/\d{1,}\.\d{2}/gi);
	  var value = 0.0;
	  for (var i =0; i < numbers.length;i++) {
	  	value += parseFloat(numbers[i]);
	  }
	  //Getting the Amazon Used Price
	  if (document.getElementById('olpDivId')!=null) {
	  otherPrices = document.getElementById('olpDivId').querySelectorAll(".price");
	  var usedPrice = value;
	  for (var i=0;i<otherPrices.length;i++) {
	  	if (parseFloat(otherPrices[i].innerText.match(/\d{1,}\.\d{2}/gi))<usedPrice) {
	  		var usedPriceTxt = otherPrices[i].innerText.match(/\d{1,}\.\d{2}/gi)
	  		usedPrice = parseFloat(usedPriceTxt);

	  	}
	  }
	}
	else {
		usedPrice = value;
	}
	  
	  //Getting the eBay Price
	//http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByProduct&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=MinniJin-2113-4639-be29-50cc078bc4f0&RESPONSE-DATA-FORMAT=XML&REST-PAYLOAD&productId.@type=ISBN&productId=978-0521684033&paginationInput.entriesPerPage=1&paginationInput.pageNumber=1&sortOrder=PricePlusShippingLowest
	//ISBN(-1(?:(0)|3))?:?\x20+(?(1)(?(2)(?:(?=.{13}$)\d{1,5}([ -])\d{1,7}\3\d{1,6}\3(?:\d|x)$)|(?:(?=.{17}$)97(?:8|9)([ -])\d{1,5}\4\d{1,7}\4\d{1,6}\4\d$))|(?(.{13}$)(?:\d{1,5}([ -])\d{1,7}\5\d{1,6}\5(?:\d|x)$)|(?:(?=.{17}$)97(?:8|9)([ -])\d{1,5}\6\d{1,7}\6\d{1,6}\6\d$)))

	   txt = eBayInfo.match(/<convertedCurrentPrice currencyId="USD">[^<]{1,}<\/convertedCurrentPrice>/gi);
	  txt = txt[0].match(/\d{1,}\.\d{1,}/gi);
	   var ebayprice = parseFloat(txt);

	   //Run if eBay value is lower
	   if (ebayprice<usedPrice) {

		   //Getting the eBay URL
		   var html = eBayInfo.match(/<viewItemURL>[^<]{1,}<\/viewItemURL>/gi);
		   html = html[0].substring(html[0].indexOf(">")+1,html[0].lastIndexOf("<"));
		  var payload = {
		    //count: matches.length,    // Pass the number of matches back.
		    link: html,
		    price: value,
		    price2: usedPrice,
		    name: prodname,
		    eprice: ebayprice,
		    site: 'Amazon'
		  };
		  chrome.extension.sendRequest(payload, function(response) {});
		} else {
			console.log ("Normal Amazon Price: "+value);
			console.log ("Used Amazon Price: "+usedPrice);
			console.log ("eBay Price: "+ebayprice);
			console.log(ebayprice<value);
		}
	}
}
else if (isBnN) {
	prices = document.querySelectorAll('.price');
	if (prices.length >= 2) {

		price = parseFloat(prices[0].innerText.match(/\d{1,}\.\d{2}/gi));
		usedPrice = parseFloat(prices[1].innerText.match(/\d{1,}\.\d{2}/gi));

		if (price<usedPrice) {
			var k = usedPrice;
			usedPrice = price;
			price = k;
		}
	} else if (prices.length==1) {
		price = parseFloat(prices[0].innerText.match(/\d{1,}\.\d{2}/gi));
		usedPrice = price;
	}
	if (isNaN(usedPrice)) {
		usedPrice=price;
	}
	prodname = document.getElementsByTagName("h1")[0].innerText;
	isbn13 = document.body.innerText.match(/\d{13}/gi)[0];
	var ebayDBurl = url + isbn13+url2;
	 var eBayInfo=httpGet(ebayDBurl);
	 if (eBayInfo.match(/<ack>Failure<\/ack>/gi)!=null) {
	 	isbn13 = document.body.innerText.match(/\d{9}(X|\d)/gi)[0];
	 	ebayDBurl = url + isbn13+url2;
	    eBayInfo=httpGet(ebayDBurl);
	 }
	console.log(eBayInfo.match(/<ack>Failure<\/ack>/gi));

	if (isBnN!=null && price!=null && usedPrice!=null && prodname!=null && isbn13!=null && eBayInfo.match(/<ack>Failure<\/ack>/gi)==null) {


	  //Getting the eBay Price

	 
	   txt = eBayInfo.match(/<convertedCurrentPrice currencyId="USD">[^<]{1,}<\/convertedCurrentPrice>/gi);
	  txt = txt[0].match(/\d{1,}\.\d{1,}/gi);
	   var ebayprice = parseFloat(txt);

	   //Run if eBay value is lower

	   if (ebayprice<usedPrice) {

		   //Getting the eBay URL
		   var html = eBayInfo.match(/<viewItemURL>[^<]{1,}<\/viewItemURL>/gi);
		   html = html[0].substring(html[0].indexOf(">")+1,html[0].lastIndexOf("<"));
		
		  var payload = {
		    //count: matches.length,    // Pass the number of matches back.
		    link: html,
		    price: price,
		    price2: usedPrice,
		    name: prodname,
		    eprice: ebayprice,
		    site: 'Barnes and Noble'
		  };
		  chrome.extension.sendRequest(payload, function(response) {});
		} else {
			console.log ("Normal Barnes and Noble Price: "+price);
			console.log ("Used Barnes and Noble Price: "+usedPrice);
			console.log ("eBay Price: "+ebayprice);
			console.log(ebayprice<value);
		}
	}
		

	//price = document.getElementById('actualPriceValue').innerText;
	//isbn = document.getElementById('ps-content').innerText.match(/\d{9}(X|\d)/gi);
}

function httpGet(theUrl)
{
var xmlHttp = null;
xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", theUrl, false );
xmlHttp.send( null );
return xmlHttp.responseText;
}