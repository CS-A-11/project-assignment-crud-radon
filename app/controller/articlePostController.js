var request = require("request");
var url = require("url");
var moment = require("moment");

module.exports.articlePostsPage = function (req, res) {
  var requestOptions = {
    url: req.protocol + '://' + req.get('host') + "/api/user/get_all_article_posts",
    method: "GET",
    json: {}
  };
  request(
    requestOptions,
    function (err, response, body) {
      if (err) {
        console.log(err);
      } else {
        if (response.statusCode === 201) {
          if (req.session.user !== undefined) {
            res.render("articlePostView", {
              title: body.title,
              articles: body,
              isSessionSet: true
            });
          } else {
            res.render("articlePostView", {
              title: body.title,
              articles: body,
              isSessionSet: false
            });
          }
        }
      }
    }
  )
}

module.exports.displayPost = function (req, res) {
  var requestOptions = {
    url: req.protocol + '://' + req.get('host') + "/api/user/article_post/" + req.params.articleId,
    method: "GET",
    json: {}
  };
  request(
    requestOptions,
    function (err, response, body) {
      if (err) {
        console.log(err);
      } else {
        if (req.session.user !== undefined) {
          res.render("articlePostSingleDisplay", {
            title: body.title,
            article: body,
            isSessionSet: true,
            moment: require('moment')
          });
        } else {
          res.render("articlePostSingleDisplay", {
            title: body.title,
            article: body,
            isSessionSet: false,
            moment: require('moment')
          });
        }
      }
    }
  );
}

module.exports.postComment = function (req, res) {
  var data = {
    creatorName: req.session.user,
    body: req.body.comment
  };
  var requestOptions = {
    url: req.protocol + '://' + req.get('host') + '/api/user/article_post/add_comment/' + req.params.articleId,
    method: "POST",
    json: data
  };
  request(
    requestOptions,
    function (err, response, body) {
      if (err) {
        console.log(err);
      } else {
        var message = {};
        if (response.statusCode === 201) {
          var date = moment(new Date()).format('MMM DD, YYYY');
          var name = req.session.user.firstname + " " + req.session.user.lastname;
          var uid = req.session.user._id;
          var comment = req.body.comment;
          var content = {
            comment,
            date,
            user: {
              name,
              _id: uid,
            },
          };
          res.status(response.statusCode);
          res.json(content);
        } else {
          res.status(response.statusCode);
          res.json({
            message: 'comment not added'
          });
        }
      }
    }
  );
}