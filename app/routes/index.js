var express = require("express");
var multer = require('multer');
var path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage });

var router = express.Router();

var ctrlMain = require("../controller/main.js");
var ctrlUser = require("../controller/user");
var ctrlAdmin = require("../controller/admin");

/* GET home page. */
router.get("/", ctrlMain.index);

router.get("/user/signin", ctrlUser.signinPage);
router.post("/user/acount_signin", ctrlUser.acountSignIn);

router.get("/user/signup", ctrlUser.signupPage);
router.post("/user/acount_signup", ctrlUser.acountSignUp);

router.get("/admin", ctrlAdmin.adminlandingPage);
router.get("/admin/create_article", ctrlAdmin.createPostPage);
router.post("/admin/add_article", upload.single('articleImage'), ctrlAdmin.addArticle);
router.get("/admin/view_posts", ctrlAdmin.viewPosts);
router.get("/admin/edit_post/:post_id", ctrlAdmin.editPostPage);

router.post("/admin/edit_article/:postId", upload.single('articleImage'), ctrlAdmin.editArticle);
router.get("/admin/deleteArticle/:postId", ctrlAdmin.deleteArticle);

router.post("/admin/acount_signin", ctrlAdmin.acountSignIn);

module.exports = router;
