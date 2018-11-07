/* request top 200 coins from API when window loads
in order to populate dropdown menu */
window.onload= function() { 
  requestCoinList()
}

/* When user clicks on the button toggle between
hiding and showing the dropdown content */
function showCoins() {
  document.getElementById("myDropdown").classList.toggle("show");
  document.getElementById("myInput").focus()
}

/* When user clicks on a coin show
the addAmount input and submitForm button */
function showAmount() {
  document.getElementById("addAmount").style.visibility = "visible"
  document.getElementById("submitAddCoin").style.visibility = "visible"
}

//search functionality to filter thru coins in the dropdown
function filterCoins() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
      }
    }
}

//takes the coin symbol and name arrays and populates dropdown list
function populateDropdown(coinSymbol, coinName) {
  for(var i = 0; i < coinSymbol.length; i++) {
    var symbolOption = coinSymbol[i]
    var nameOption = coinName[i]
    var a = document.createElement("a") //create new <a> element for each option
    a.textContent = `(${symbolOption}) ${nameOption}`
    a.value = `(${symbolOption}) ${nameOption}` //set values for each <a> element
    a.id = symbolOption
    a.title = nameOption
    document.getElementById("myDropdown").appendChild(a) //add each option to the dropdown
  }
  selectCoin()
}

/* takes the name and symbol of selected option and
sends to a form for submission to database */
function selectCoin() {
  var $ = function (selector) {
    return document.querySelector(selector);
  };

  //create array of dropdown options
  var choices = $('#myDropdown').getElementsByTagName('a');

  /*iterate thru the array of choices and set
  onclick attribute and function for each choice */
  for (var i = 0; i < choices.length; i++) {
    var choice = choices[i];
    choice.onclick = sendToPostBox;
  }

  /* grab coin symbol, name and full readout from html
  attributes set in populateDropdown function */
  function sendToPostBox() {
    let chosenCoin = this.innerHTML
    let chosenSymbol = this.id 
    let chosenName = this.title 
    setPostBox(chosenSymbol, chosenName, chosenCoin)
    showAmount() //once coin is selected show amount box and submit button
    showCoins() //once coin is selected hide dropdown again
  }

  /* set the symbol and name value of addCoin post form
  and display selected coin in the display box beside dropdown */
  function setPostBox(chosenSymbol, chosenName, chosenCoin) {
    let displayBox = document.getElementById("displayCoinSelection")
    let symbolBox = document.getElementById("addSymbol")
    let nameBox = document.getElementById("addName")
    displayBox.value = chosenCoin
    symbolBox.value = chosenSymbol
    nameBox.value = chosenName
  }

}

// URL variable declaration for requestCoinList function
const LIST_URL = "https://api.coinmarketcap.com/v2/listings/"

/* This function queries coin-market-cap API for the top 200 coins,
then creates one array for the symbols and one for the names */
function requestCoinList() {
  fetch(LIST_URL)
  .then(function(result) {
    return result.json()
  })
  .then(function(res) {
    coinSymbol = []
    coinName = []
    for (i=0; i<200; i++){
      let symbol = res.data[i].symbol
      let name = res.data[i].name
      coinSymbol.push(symbol)
      coinName.push(name)
    }
  //console.log(coinName, coinSymbol)
  populateDropdown(coinSymbol, coinName)
  })
  .catch(function(error) {
  console.log(error)
  })
}