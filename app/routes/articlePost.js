var express = require('express');
var router = express.Router();

var ctrl = require("../controller/articlePostController");

router.get("/", ctrl.articlePostsPage);
router.get("/article_post/:articleId", ctrl.displayPost);
router.post("/article_post/post_comment/:articleId", ctrl.postComment);

module.exports = router;