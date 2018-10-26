var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const dbConnect = require('./../database/database');
dbConnect();

///////////

//put into separate file
let testSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    portfolioName: { type: String, required: true },
    tokenTicker: { type: String, required: true },
    tokenName: { type: String, required: true },
    tokenAmount: { type: Number, required: true }
});
let Post = mongoose.model('Post', testSchema);
dbConnect();
//////////

/////////////////////////////////////////////////////////////
router.post('/addUser', function(req, res) {
    new Post({userName: req.body.userToAdd,portfolioName: "Default",tokenTicker: "btc",tokenName: "Bitcoin",tokenAmount: 0}).save();
    //res.send(200);//tells the browser that the data was send successfully
    res.redirect("/"+req.body.userToAdd)
    res.refresh();
  });

/////////////////////////////////////////////////////////////
  router.post('/addPortfolio', function(req, res) {
    new Post({userName: req.body.userName,portfolioName: req.body.portfolioToAdd,tokenTicker: "btc",tokenName: "Bitcoin",tokenAmount: 0}).save();
    //res.send(200);//tells the browser that the data was send successfully
    res.redirect("/"+req.body.userName+"/"+req.body.portfolioToAdd)
    res.refresh()
  });
/////////////////////////////////////////////////////////////
  router.post('/addCoin', function(req, res) {

    new Post({
        userName: req.body.userName,
        portfolioName: req.body.portfolioName,
        tokenTicker: req.body.tokenTickerToAdd,
        tokenName: "deleteme",
        tokenAmount: req.body.tokenAmountToAdd
    }).save();

        res.redirect("/"+req.body.userName+"/"+req.body.portfolioName)
        res.refresh();
  });


/////////////////////////////////////////////////////////////
  router.post('/deleteCoin', function(req, res){

    Post.findOneAndDelete({userName:req.body.userName,portfolioName:req.body.portfolioName,tokenTicker:req.body.coinTicker},function(error,deleteMe){
        console.log(deleteMe);
        //deleteMe.remove().exec();       
    });
    res.redirect("/"+req.body.userName+"/"+req.body.portfolioName)
  });
/////////////////////////////////////////////////////////////
router.post('/deletePortfolio', function(req, res){

    Post.deleteMany({userName:req.body.userName,portfolioName:req.body.portfolioName},function(error,deleteMe){
        console.log(deleteMe);
        //deleteMe.remove().exec();       
    });
    res.redirect("/"+req.body.userName)
  });
 

  /////////////////////////////////////////////////////////////
router.post('/deleteUser', function(req, res){

    Post.deleteMany({userName:req.body.userName},function(error,deleteMe){
        console.log(deleteMe);
        //deleteMe.remove().exec();       
    });
    res.redirect("/")
  });


/* GET home page. */
router.get('/', function(req, res, next) {
    Post.distinct('userName', function(error, users) {
        res.render('index', {usersArray:users});
    });
});

router.get('/:slug',function(req, res, next) {
    Post.distinct('portfolioName',{userName:req.params.slug}, function(error, portfolios) {
    //res.render('index', {usersArray:users});
    // console.log(portfolios[0]);
    // console.log(portfolios[1]);    
    // console.log(portfolios[2]);
    res.render('postDisp', {path1: req.params.slug, portfolios:portfolios} ); 
    });

    //filter out only slug's portfolios and display as well

});

router.get('/:slug/:slug2',function(req, res, next) {
    Post.find({userName:req.params.slug, portfolioName:req.params.slug2}, function(error, coins){
     //console.log(coins[0].tokenTicker);
     //console.log(coins[1].tokenTicker);
     //console.log(coins[2].tokenTicker);
    // console.log(portfolios[1]);    
    // console.log(portfolios[2]);
    res.render('coinsDisp', {path1: req.params.slug, path2:req.params.slug2, coins:coins} );
    });

    //filter out only slug's portfolios and display as well
    //res.render('coinsDisp', {path1: req.params.slug, path2:req.params.slug2} );
});

module.exports = router;
