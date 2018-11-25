var mongoose = require('mongoose');
var article = mongoose.model('Article');

var sendPostResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getAllArticlPosts = function (req, res) {
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
  }).sort({ createdOn: -1 });
}