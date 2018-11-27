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

// C
router.get('/discussions/add_discussion', ctrlDiscussion.addDiscussion);
router.post("/discussions/create_discussion", upload.single('discussionImage'), ctrlDiscussion.createDiscussion);
//router.get('/queries/:query', ctrlDiscussion.query);

// R
router.get('/discussions', ctrlDiscussion.viewDiss);
router.get('/queries/:discussionId', ctrlDiscussion.query2);
router.post('/queries/:discussionId', ctrlDiscussion.createComment);
// router.get('/queries/:discussionId/comments/:commentId', ctrlDiscussion.createComment);

// U
router.get("/edit_discussion/:discussionId", ctrlDiscussion.editDiscussionPage);
router.post("/edit_query/:discussionId", upload.single('discussionImage'), ctrlDiscussion.editDiscussion);


// D
router.get("/delete_discussion/:discussionId", ctrlDiscussion.deleteDiscussion);

module.exports = router;
