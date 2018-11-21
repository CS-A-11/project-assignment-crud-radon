var express = require('express');
var router = express.Router();

var discussionController = require('../controller/discussionController');

// router.get('/discussions', discussionController.discussionsList);

router.get('/user/discussions', discussionController.discussionsList);
//router.get('/user/discussions', discussionController.viewDiss);
router.post('/user/discussions/add_discussion_to_radon', discussionController.discussionsCreate);
//router.get('/user/discussions/get_discussions', discussionController.getDiscussions);
router.get('/user/queries/:discussionId', discussionController.discussionsReadOne);
// router.get('/user/discussions/view', discussionController.discussionsReadOne);


// router.put('/user/discussions/:discussionid',discussionController.discussionsUpdateOne);
// router.delete('/user/discussions/:discussionid', discussionController.discussionsDeleteOne);


// router.get('/admin/discussions', userController.discussionsList);
// router.post('/admin/discussions', userController.discussionsCreate);
// router.get('/admin/discussions/:discussionid', userController.discussionsReadOne);
// router.put('/admin/discussions/:discussionid',userController.discussionsUpdateOne);
// router.delete('/admin/discussions/:discussionid', userController.discussionsDeleteOne);

module.exports = router;