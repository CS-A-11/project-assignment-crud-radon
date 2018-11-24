var mongoose = require('mongoose');
var article = mongoose.model('Article');
var users = mongoose.model('users');
var discussion = mongoose.model('Discussion');
var sendPostResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};
module.exports.getAllDiscussions = function (req, res) {
  discussion.find({}, {
    title: 1,
    createdOn: 1,
    creatorName: 1
  },
  function (err, article) {
    if (err) {
      sendPostResponse(res, 400, err);
    } else {
      sendPostResponse(res, 201, article);
    }
  });
}
module.exports.signinAdmin = function (req, res) {
  users.find({
    username: req.body.username,
    password: req.body.password,
    admin: true
  }).exec(function (err, user) {
    sendPostResponse(res, 201, { status: "success", user });
  });
}
module.exports.deletePost = function (req, res) {
  article.findOneAndDelete(
    { _id: req.body.postId },
    function (err, article) {
      if (err) {
        console.log('error' + err);
        sendPostResponse(res, 400, err);
      } else {
        console.log(article);
        sendPostResponse(res, 201, article);
      }
    }
  );
}
module.exports.updatePost = function (req, res) {
  article.findOneAndUpdate(
    { _id: req.params.postId }, 
    { $set: req.body },
    {
      upsert: false,
      multi: false,
      new: true
    },
    function (err, article) {
      if (err) {
        sendPostResponse(res, 400, err);
      } else {
        sendPostResponse(res, 201, article);
      }
    }
  );
}
module.exports.getPostById = function (req, res) {
  article.findById( req.params.postId, {
    _id: 1, title: 1, content: 1
  }, function (err, article) {
    if (err) {
      sendPostResponse(res, 400, err);
    } else {
      sendPostResponse(res, 201, article)
    }
  });
}
module.exports.getPosts = function (req, res) {
  article.find({}, {
    title: 1,
    createdOn: 1,
    content: 1
  }, function (err, article) {
    if (!err) {
      sendPostResponse(res, 201, article);
    } else {
      console.log(err);
      sendPostResponse(res, 400, err);
    }
  });
}
module.exports.addArticle = function (req, res) {
  article.create(req.body, function(err, article) {
    if (err) {
      sendPostResponse(res, 400, err);
    } else {
      sendPostResponse(res, 201, { status: "success", article });
    }
  });
}