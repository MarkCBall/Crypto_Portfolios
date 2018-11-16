var express = require('express');
var router = express.Router();

const Post = require("./../models/coins");

//////User Screen Routers
router.get('/', function(req, res, next) {
    Post.distinct('userName', function(error, users) {
        res.render('index', {usersArray:users});
    });
});

router.post('/addUser', function(req, res) {
    new Post({userName: req.body.userToAdd,portfolioName: "Default",tokenTicker: "btc",tokenName: "Bitcoin",tokenAmount: 0}).save();
    //res.send(200);//tells the browser that the data was send successfully
    res.redirect("/"+req.body.userToAdd)
});

router.delete('/:userToDelete', function(req, res, next){
    Post.deleteMany({
        userName:req.params.userToDelete
    },  function(err){
            if (err) return next(err);
            res.send();
    });
});


//////Portfolio Screen Routers
router.get('/:slug',function(req, res, next) {
    Post.distinct('portfolioName',{userName:req.params.slug}, function(error, portfolios) {
    res.render('portDisp', {path1: req.params.slug, portfolios:portfolios} ); 
    });
});

router.post('/addPortfolio', function(req, res) {
    new Post({userName: req.body.userName,portfolioName: req.body.portfolioToAdd,tokenTicker: "btc",tokenName: "Bitcoin",tokenAmount: 0}).save();
    res.redirect("/"+req.body.userName+"/"+req.body.portfolioToAdd)
  });

router.delete('/:userToDelete/:portToDelete', function(req, res, next){
    Post.deleteMany({
        userName:req.params.userToDelete,
        portfolioName:req.params.portToDelete
    },  function(err){
            if (err) return next(err);
            res.send();
    });
});


///////Coin Screen Routers
router.get('/:slug/:slug2',function(req, res, next) {
    Post.find({userName:req.params.slug, portfolioName:req.params.slug2}, function(error, coins){
    res.render('coinsDisp', {path1: req.params.slug, path2:req.params.slug2, coins:coins} );
    });
});

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

router.put('/:userToUpdate/:portToUpdate/:coinToUpdate', function(req, res, next){
    Post.findOneAndUpdate({
        userName:req.params.userToUpdate,
        portfolioName:req.params.portToUpdate,
        tokenTicker:req.params.coinToUpdate
        },
        {$set:{tokenAmount:req.body.newAmount}},
        function(err){
            if (err) return next(err);
            res.send();
        }
    )
    //Why does this automatically refresh the page but delete doesn't?
});

module.exports = router;
