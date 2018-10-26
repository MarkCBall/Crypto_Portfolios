var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const dbConnect = require('./../database/database');
//dbConnect();

const Post = require("./../models/coins");




////////////ADD TO DATABASE//////////////////////////////////
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

////////////DELETE FROM DATABASE//////////////////////////////
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
    });
    res.redirect("/")
  });

////////////DISPLAY FROM DATABASE/////////////////////////////
/////////////////////////////////////////////////////////////
router.get('/', function(req, res, next) {
    Post.distinct('userName', function(error, users) {
        res.render('index', {usersArray:users});
    });
});

router.get('/:slug',function(req, res, next) {
    Post.distinct('portfolioName',{userName:req.params.slug}, function(error, portfolios) {
    res.render('postDisp', {path1: req.params.slug, portfolios:portfolios} ); 
    });

});

router.get('/:slug/:slug2',function(req, res, next) {
    Post.find({userName:req.params.slug, portfolioName:req.params.slug2}, function(error, coins){
    res.render('coinsDisp', {path1: req.params.slug, path2:req.params.slug2, coins:coins} );
    });
});

module.exports = router;
