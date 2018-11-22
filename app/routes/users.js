var express = require('express');
var router = express.Router();

/* GET users listing. */
var userCtrl = require('../controller/user');
router.get('/user/profile', userCtrl.profilePage);

module.exports = router;
