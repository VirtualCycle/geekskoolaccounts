function showOverview() {
	document.querySelector(".overviewDiv").style.display = "block"
	document.querySelector(".transactionsDiv").style.display = "none"
	document.querySelector(".addTransDiv").style.display = "none"
}

function showTransactions() {
	document.querySelector(".overviewDiv").style.display = "none"
	document.querySelector(".transactionsDiv").style.display = "block"
	document.querySelector(".addTransDiv").style.display = "none"
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