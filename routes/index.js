var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
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
