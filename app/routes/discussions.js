var express = require('express');
var router = express.Router();

var discussionsController = require('../controller/discussion.js');

router.get('/discussions', discussionsController.discussionsList);
router.get('/queries/:query', discussionsController.query);

module.exports = router;
