var request = require("request");

var apiOptions = {
  server: "http://localhost:5000"
};
if (process.env.NODE_ENV === "production") {
  apiOptions.server = "add something here";
}
module.exports.deleteArticle = function (req, res) {
  var urlParams = {
    postId: req.params.postId
  };
  var requestOptions = {
    url: req.protocol + '://' + req.get('host') + '/api/admin/delete_post',
    method: 'DELETE',
    json: urlParams
  };
  request (
    requestOptions,
    function (err, response, body) {
      if (err) {
        console.log(err);
      }
      else if (response.statusCode === 201) {
        res.redirect("/admin/view_posts");
      }
    }
  );
}
module.exports.editArticle = function (req, res) {
  if (req.file === undefined) {
    var urlParams = {
      title: req.body.heading,
      content: req.body.content,
      createdOn: Date.now
    };
  } else {
    var urlParams = {
      title: req.body.heading,
      content: req.body.content,
      createdOn: Date.now,
      imageName: req.file.filename
    };
  }
  var requestOptions = {
    url: apiOptions.server + "/api/admin/update_post/" + req.params.postId,
    method: "PUT",
    json: urlParams
  };
  request(
    requestOptions,
    function (err, response, body) {
      if (err) {
        console.log(err);
      }
      else if (response.statusCode === 201) {
        res.redirect("/admin/view_posts");
      }
    }
  );
}
module.exports.editPostPage = function (req, res) {
  var requestOptions = {
    url: apiOptions.server + "/api/admin/get_post_by_id/" + req.params.post_id,
    method: "GET",
    json: {}
  }
  request(
    requestOptions,
    function (err, response, body) {
      if (!err && response.statusCode === 201) {
        res.render("addarticle", {
          title: "Edit Post",
          postId: req.params.post_id,
          article: body
        });  
      }
    }
  );
}
module.exports.viewPosts = function (req, res) {
  if (!req.session.user || req.session.user === false) {
    res.redirect("/admin");
  } else {
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
          res.render("adminviewposts", { articles: body, title: "Articles Posted" });
        }
      }
    );
  }
}
module.exports.addArticle = function (req, res) {
  if (req.file === undefined || req.body.heading === '' || req.body.content === '') {
    res.render("addarticle", {
      title: "Add Article",
      message: "Some fields are missing.",
      article: {
        _id: '',
        title: '',
        content: '',
      }
    });
  } else {
    var urlParams = {
      title: req.body.heading,
      content: req.body.content,
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
          res.redirect("/admin/view_posts");
        }
      }
    );
  }
}
module.exports.createPostPage = function (req, res) {
  if (!req.session.user || req.session.user === false) {
    res.redirect("/admin");
  } else {
    res.render("addarticle", {
      title: "Add article",
      article: {
        _id: '',
        title: '',
        content: '',
      }
    });
  }
}
module.exports.adminlandingPage = function (req, res) {
  if (!req.session.user || req.session.user === false) {
    res.render("adminLogin", {
      title: "Admin"
    });
  }
  else {
    res.render("adminlandingPage", { 
      title: "Admin page"
    });
  }
}
module.exports.acountSignIn = function (req, res) {
  var urlParams = {
    username: req.body.name,
    password: req.body.password
  };
  var requestOptions = {
    url: req.protocol + '://' + req.get('host') + "/api/admin/admin_signin",
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
        if (body.user.length === 0) {
          res.render('adminLogin', {
            title: 'Admin', 
            message: 'User name or password are incorrect'
          });
        } else {
          req.session.user = body.user[0];
          res.render('adminlandingPage', {
            title: "Admin page"
          });
        }
      }
    }
  );
}