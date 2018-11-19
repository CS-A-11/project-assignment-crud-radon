var express = require('express');
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

var ctrlDiscussion = require("../controller/discussions");

router.get('/discussions', ctrlDiscussion.discussionsList);
//router.get('/discussions', ctrlDiscussion.viewDiss);
router.get('/queries/:query', ctrlDiscussion.query);
router.get('/discussions/add_discussion', ctrlDiscussion.addDiscussion);
router.post("/discussions/create_discussion", upload.single('discussionImage'), ctrlDiscussion.createDiscussion);
router.get("/discussions/:discussionid", ctrlDiscussion.deleteDiscussion);

// router.get("/admin/create_article", ctrlAdmin.createPostPage);
// router.post("/admin/add_article", upload.single('articleImage'), ctrlAdmin.addArticle);

module.exports = router;
