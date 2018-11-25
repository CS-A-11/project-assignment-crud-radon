var express = require('express');
var router = express.Router();

var ctrl = require('../controller/articlePostController');

router.get('/user/get_all_article_posts', ctrl.getAllArticlPosts);

module.exports = router;