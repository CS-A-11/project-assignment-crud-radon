var request = require("request");
var url = require("url");

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
          res.render('articlePostView', {
            articles: body
          });
        }
      }
    }
  )
}