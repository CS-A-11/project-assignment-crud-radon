var express = require('express');
var router = express.Router(); 
var userController = require('../controller/userController');

var adminController = require('../controller/adminController');

router.post('/user/signup', userController.signup);
router.post('/user/sigin', userController.signinUser);
router.get('/user/get_all_queries/:uid', userController.getAllPosts);

router.post('/admin/add_article_to_radon', adminController.addArticle);
router.get('/admin/get_posts', adminController.getPosts);
router.get('/admin/get_post_by_id/:postId', adminController.getPostById);
router.put('/admin/update_post/:postId', adminController.updatePost);
router.delete('/admin/delete_post', adminController.deletePost);

router.post('/admin/admin_signin', adminController.signinAdmin);


module.exports = router;
