var request = require("request");
var moment = require("moment");

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
      fileName: req.file.filename
    };
  }
  var requestOptions = {
    url: req.protocol + '://' + req.get('host') + "/api/admin/update_post/" + req.params.postId,
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
    url: req.protocol + '://' + req.get('host') + "/api/admin/get_post_by_id/" + req.params.post_id,
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
      url: req.protocol + '://' + req.get('host') + "/api/admin/get_posts",
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
      createdOn: Date.now('dd-mm-yyyy'),
      imageName: "b",
      fileName: req.file.filename,
    };
    var requestOptions = {
      url: req.protocol + '://' + req.get('host') + "/api/admin/add_article_to_radon",
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

module.exports.acountSignInAjax = function (req, res) {
  var urlParams = {
    username: req.body.username,
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
          res.status(400);
          res.send('User not found');
        } else {
          req.session.user = body.user[0];
          res.status(201);
          res.send('User found');
        }
      }
    }
  );
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
          res.redirect('/admin');
        }
      }
    }
  );
}

module.exports.acountSignOut = function (req, res) {
  if (req.session) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
}
module.exports.adminlandingPage = function (req, res) {
  if (!req.session.user || req.session.user === false) {
    res.render("adminLogin", {
      title: "Admin"
    });
  } else if (!req.session.user.admin) {
    res.render("adminLogin", {
      title: "Admin"
    });
  }
  else {
    var requestOptions = {
      url: req.protocol + '://' + req.get('host') + "/api/admin/get_all_discussions",
      method: "GET",
      json: {}
    };
    request(
      requestOptions,
      function (err, response, body) {
        if (err) {
          console.log(err);
        } else {
          if (response.statusCode === 201) {}
          var docs = body;
          var stats = {};
          for (doc in docs) {
            var year = moment(doc.createdOn).year();
            var stat = stats[year];
            if (stat === undefined) {
              stat = {
                year: year,
                total: 1
              }
              stats[year] = stat;
            } else {
              stats[year].total++;
            }
          }
          for (var i = 0; i < body.length; i++) {
            body[i].name = body[i].creatorName.firstname.charAt(0).toUpperCase();
            body[i].name += body[i].creatorName.lastname.charAt(0).toUpperCase();
          }
          var statArray = [];
          for (var key in stats) {
            var obj = stats[key];
            statArray.push(obj);
          }
          res.render("adminlandingPage", { 
            title: "Admin page",
            stats: statArray,
            queries: body
          });
        }
      }
    );
  }
}