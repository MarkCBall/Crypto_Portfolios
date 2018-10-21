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

/* GET home page. */
router.get('/', function(req, res, next) {
 
    Post.distinct('userName', function(error, users) {
        res.render('index', {usersArray:users});
    });

  
});

router.get('/:slug',function(req, res, next) {
    //filter out only slug's portfolios and display as well
    res.render('postDisp', {path1: req.params.slug} ); 
});

router.get('/:slug/:slug2',function(req, res, next) {
    //filter out only slug's portfolios and display as well
    res.render('coinsDisp', {path1: req.params.slug, path2:req.params.slug2} );
});

module.exports = router;
