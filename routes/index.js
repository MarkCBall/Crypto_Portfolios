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
  });

/////////////////////////////////////////////////////////////
  router.post('/addPortfolio', function(req, res) {
    new Post({userName: req.body.userName,portfolioName: req.body.portfolioToAdd,tokenTicker: "btc",tokenName: "Bitcoin",tokenAmount: 0}).save();
    //res.send(200);//tells the browser that the data was send successfully
    res.redirect("/"+req.body.userName+"/"+req.body.portfolioToAdd)
  });
/////////////////////////////////////////////////////////////
  router.post('/addCoin', function(req, res) {
    new Post({
        userName: req.body.userName,
        portfolioName: req.body.portfolioName,
        tokenTicker: req.body.tokenTickerToAdd,
        tokenName: req.body.tokenNameToAdd,
        tokenAmount: req.body.tokenAmountToAdd
    }).save();

        res.redirect("/"+req.body.userName+"/"+req.body.portfolioName)
  });

////////////UPDATE//////////////////////////////
/////////////////////////////////////////////////////////////
  router.post('/updateAmount', function(req, res){

    Post.findOneAndUpdate({userName:req.body.userName,portfolioName:req.body.portfolioName,tokenTicker:req.body.tokenTicker},{$set:{tokenAmount:req.body.newAmount}},{new: true}, function(error,doc){
        if(error){
            console.log(error)
        }
        console.log(doc)
    });
    res.redirect("/"+req.body.userName+"/"+req.body.portfolioName)
  });


//DELETE COIN ROUTER  -- error handling to be completed
//will delete all coins with ticker
  router.delete('/:userToDelete/:portToDelete/:coinToDelete', function(req, res, next){
    Post.deleteMany({
        userName:req.params.userToDelete,
        portfolioName:req.params.portToDelete,
        tokenTicker:req.params.coinToDelete
    },  function(err){
            if (err) return next(err);
            res.send();
    });
  });

//DELETE PORTFOLIO ROUTER  -- error handling to be completed
  router.delete('/:userToDelete/:portToDelete', function(req, res, next){
    Post.deleteMany({
        userName:req.params.userToDelete,
        portfolioName:req.params.portToDelete
    },  function(err){
            if (err) return next(err);
            res.send();
    });
  });

  //DELETE USER ROUTER - error handling to be completed
  router.delete('/:userToDelete', function(req, res, next){
    Post.deleteMany({
        userName:req.params.userToDelete
    },  function(err){
            if (err) return next(err);
            res.send();
    });
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
    res.render('portDisp', {path1: req.params.slug, portfolios:portfolios} ); 
    });

});

router.get('/:slug/:slug2',function(req, res, next) {
    Post.find({userName:req.params.slug, portfolioName:req.params.slug2}, function(error, coins){
    res.render('coinsDisp', {path1: req.params.slug, path2:req.params.slug2, coins:coins} );
    });
});

module.exports = router;
