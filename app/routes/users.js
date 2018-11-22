var express = require('express');
var router = express.Router();

/* GET users listing. */
var userCtrl = require('../controller/user');
router.get('/user/profile', userCtrl.profilePage);
router.get('/user/logout', userCtrl.logoutProfile);

module.exports = router;
