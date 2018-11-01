var express = require("express");
var router = express.Router();
var ctrlMain = require("../controller/main.js");

/* GET home page. */
router.get("/profile", ctrlMain.profile);

module.exports = router;
