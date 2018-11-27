var express = require('express');
var router = express.Router();

var ctrl = require('../controller/articlePostController');

router.get('/user/get_all_article_posts', ctrl.getAllArticlPosts);
router.get('/user/search_articles', ctrl.searchArticle);
router.get('/user/article_post/:articleId', ctrl.getArticle);
router.post('/user/article_post/add_comment/:articleId', ctrl.addComment);

module.exports = router;