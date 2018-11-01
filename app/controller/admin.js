var request = require("request");

var apiOptions = {
  server: "http://localhost:5000"
};
if (process.env.NODE_ENV === "production") {
  apiOptions.server = "add something here";
}
module.exports.adminlandingPage = function (req, res) {
  res.render("adminlandingPage", { 
    title: "Admin page"
  });
}
module.exports.createPostPage = function (req, res) {
  res.render("addarticle", { 
    title: "Add article"
  });
}
module.exports.addArticle = function (req, res) {
  console.log(req.file.filename);
  var urlParams = {
    title: req.body.heading,
    content: req.body.post,
    createdOn: Date.now,
    imageName: req.file.filename
  };
  var requestOptions = {
    url: apiOptions.server + "/api/admin/add_article_to_radon",
    method: "POST",
    json: urlParams
  };
  request(
    requestOptions,
    function (err, response, body) {
      if (err) {
        console.log(err) // Print the google web page.
      }
      else if (response.statusCode === 201) {
        res.redirect("/");
      }
    }
  );
}
module.exports.viewPosts = function (req, res) {
  var requestOptions = {
    url: apiOptions.server + "/api/admin/get_posts",
    method: "GET",
    json: {},
  };
  request(
    requestOptions,
    function (err, response, body) {
      if (err) {
        console.log(err);
      } else {
        console.log(body);
        res.render("adminviewposts", { articles: body });
      }
    }
  );
}