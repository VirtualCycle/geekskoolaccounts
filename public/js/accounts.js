function showOverview() {
	document.querySelector(".overviewDiv").style.display = "block"
	document.querySelector(".transactionsDiv").style.display = "none"
	document.querySelector(".addTransDiv").style.display = "none"
}

function showTransactions() {
	document.querySelector(".overviewDiv").style.display = "none"
	document.querySelector(".transactionsDiv").style.display = "block"
	document.querySelector(".addTransDiv").style.display = "none"
	displayTransactionList()
}

function showAddTrans() {
	document.querySelector(".overviewDiv").style.display = "none"
	document.querySelector(".transactionsDiv").style.display = "none"
	document.querySelector(".addTransDiv").style.display = "block"
}

function getCashBal() {
	var xhttp
	if (window.XMLHttpRequest) {
	    xhttp = new XMLHttpRequest()
	} else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP")
	}
	xhttp.open("GET", "/cashbal", true)
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	document.getElementById("cashAccount").innerHTML = xhttp.responseText
	    }
	}
	xhttp.send()
}

function getCardBal() {
	var xhttp
	if (window.XMLHttpRequest) {
	    xhttp = new XMLHttpRequest()
	} else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP")
	}
	xhttp.open("GET", "/cardbal", true)
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	document.getElementById("cardAccount").innerHTML = xhttp.responseText
	    }
	}
	xhttp.send()
}

function displayTransactionList() {
	var xhttp
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest()
	} else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP")
	}
	xhttp.open("GET", "/getTransactionsCount", true)
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	for (var i = 1; i <= xhttp.responseText; i++) {
	    		getTransactions(i)
	    	}
	    }
	}
	xhttp.send()
}

function getTransactions(counter) {
	var xhttp
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest()
	} else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP")
	}
	xhttp.open("GET", "/getTransactions/" + counter, true)
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	console.log(xhttp.responseText)
	    	cloneTemplate(JSON.parse(xhttp.responseText))
	    }
	}
	xhttp.send()
}

function cloneTemplate(data) {
	var content = document.querySelector("template").content
	var main = document.getElementById("transactionsDiv")
	var newContent = document.importNode(content, true)
	var date = newContent.querySelector(".dateDiv")
	date.innerHTML = data.date
	var desc = newContent.querySelector(".transDescDiv")
	desc.innerHTML = data.description
	var amount = newContent.querySelector(".transAmountDiv")
	amount.innerHTML = data.amount
	var type = newContent.querySelector(".transTypeDiv")
	type.innerHTML = data.type
	var mode = newContent.querySelector(".transModeDiv")
	mode.innerHTML = data.mode
    main.appendChild(newContent)
}