var express = require('express');
var router = express.Router();

var ctrl = require("../controller/articlePostController");

router.get("/articles_posts", ctrl.articlePostsPage);

module.exports = router;