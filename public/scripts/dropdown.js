/* request top 200 coins from API when window loads
in order to populate dropdown menu */
window.onload= function() { 
  requestCoinList()
}

/* When user clicks on the button toggle between
hiding and showing the dropdown content */
function showCoins() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// search functionality to filter thru coins in the dropdown
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

// takes the coins from API request and populates the dropdown list
function populateDropdown(coinList) {
  for(var i = 0; i < coinList.length; i++) {
    var coinOption = coinList[i]
    var a = document.createElement("a") // create new element for each option
    a.textContent = coinOption 
    a.value = coinOption // set values for each option
    a.id = coinOption
    document.getElementById("myDropdown").appendChild(a) // add each option to the dropdown
  }
  selectCoin()
}

// takes the selected coin and sends to a form for submission to database
function selectCoin() {
  var $ = function (selector) {
    return document.querySelector(selector);
  };

  function sendToPostBox() {
    let chosenCoin = this.innerHTML 
    setPostBox(chosenCoin)
  }

  function setPostBox(coinToPost) {
    let addToken = document.getElementById("addToken")
    addToken.value = coinToPost
  }

  var choices = $('#myDropdown').getElementsByTagName('a'); // create array of dropdown options

  for (var i = 0; i < choices.length; i++) {
    var choice = choices[i];
    choice.onclick = sendToPostBox;
  }
}

// URL variable declaration for requestCoinList function
const LIST_URL = "https://api.coinmarketcap.com/v2/listings/"

/* This function requests and creates an array of
the top 200 coins from coin-market-cap API */
function requestCoinList() {
  fetch(LIST_URL)
  .then(function(result) {
    return result.json()
  })
  .then(function(res) {
    coinList = []
    for (i=0; i<200; i++){
      let symbol = res.data[i].symbol
      //let name = res.data[i].name
      //var coin = `(${symbol}) ${name}`
      var coin = symbol
      coinList.push(coin)
    }
  console.log(coinList)
  populateDropdown(coinList)
  })
  .catch(function(error) {
  console.log(error)
  })
}