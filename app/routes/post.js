var express = require("express");
var router = express.Router();
var ctrlMain = require('../controller/main.js');

router.get('/', ctrlMain.researchPost);

module.exports = router;