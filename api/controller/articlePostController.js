var mongoose = require('mongoose');
var request = require('request');
var url = require('url');
var article = mongoose.model('Article');

var sendPostResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.searchArticle = function (req, res) {
  var url_parts = url.parse(req.url, true);
  var text = url_parts.query.searchText;
  
  article.find(
    {'title': {'$regex': text}},
    {
      _id: 1,
      title: 1,
    },
    function (err, articles) {
      if (err) {
        sendPostResponse(res, 404, err);
      } else {
        sendPostResponse(res, 201, articles);
      }
    }
  ).sort({ createdOn: -1 }).limit(2);
}

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