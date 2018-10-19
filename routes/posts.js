var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts_controller');

// GET all posts listings.
router.get('/', postsController.index)

// Get an Individual post listing

router.get('/:slug', postsController.show)

module.exports = router;
