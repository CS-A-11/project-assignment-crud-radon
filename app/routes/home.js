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

var ctrlMain = require("../controller/main");

// router.get('/discussions', ctrlDiscussion.discussionsList);
router.get('/', ctrlMain.index);
// router.get('/queries/:discussionId', ctrlDiscussion.query2);
// //router.get('/queries/:query', ctrlDiscussion.query);
// router.get('/discussions/add_discussion', ctrlDiscussion.addDiscussion);
// router.post("/discussions/create_discussion", upload.single('discussionImage'), ctrlDiscussion.createDiscussion);
// //router.get("/discussions/:discussionid", ctrlDiscussion.deleteDiscussion);


module.exports = router;
