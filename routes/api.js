// this file is temporary and code will be moved elsewhere once testing is complete

var express = require('express');
var router = express.Router()
var fetch = require("node-fetch");

// URL variable declaration for requestCoinList function
const LIST_URL = "https://api.coinmarketcap.com/v2/listings/"

// This function requests and displays top 200 coins from coin-market-cap API
function requestCoinList() {
    fetch(LIST_URL)
    .then(function(result) {
        return result.json()
    })
    .then(function(res) {
        for (i=0; i<200; i++){
            console.log(res.data[i])
        }
        //document.getElementById("totalSupply").innerHTML = cleanEthSupply
    })
    .catch(function(error) {
        console.log(error)
    })
}

var apiRouter = module.exports = requestCoinList()

router.get('/api', function(req, res, next) {
});

module.exports = router