var request = require("request");
var apiOptions = {
  server: "http://localhost:5000"
};
if (process.env.NODE_ENV === "production") {
  apiOptions.server = "add something here";
}

module.exports.logoutProfile = function (req, res) {
  if (req.session) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
}

module.exports.profilePage = function (req, res) {
  if (!req.session.user) {
    res.redirect("/user/signin");
  } else {
    var requestOptions = {
      url: req.protocol + '://' + req.get('host') + '/api/user/get_all_queries/' + req.session.user._id,
      method: 'GET',
      json: {}
    };
    request(
      requestOptions,
      function (err, response, body) {
        if (!err && response.statusCode === 201) {
          res.render("userProfilePage", {
            title: "Profile",
            queries: body,
            isSessionSet: true,
            moment: require('moment')
          });
        }
      }
    );
  }
}

module.exports.signinPage = function (req, res) {
  res.render("login", { 
    title: "Sign in"
  });
};
module.exports.acountSignIn = function (req, res) {
  var urlParams = {
    username: req.body.name,
    password: req.body.password
  };
  var requestOptions = {
    url: req.protocol + '://' + req.get('host') + "/api/user/sigin",
    method: "POST",
    json: urlParams
  };
  request(
    requestOptions,
    function (err, response, body) {
      if (err) {
        console.log(err) // Print the google web page.
      }
      if (response.statusCode === 201 && body.user.length !== 0) {
        req.session.user = body.user[0];
        res.status(201);
        res.send({
          message: 'User found'
        });
      } else {
        res.status(404);
        res.send({
          message: 'User not found'
        });
      }
    }
  );
};
module.exports.signupPage = function (req, res) {
  res.render("signup", { 
    title: "Sign up"
  });
}
module.exports.acountSignUp = function (req, res) {
  var urlParams = {
    firstname: req.body.fname,
    lastname: req.body.lname,
    username: req.body.name,
    password: req.body.password,
    email: req.body.email,
    dateOfBirth: req.body.dob
  };
  var requestOptions = {
    url: req.protocol + '://' + req.get('host') + "/api/user/signup",
    method: "POST",
    json: urlParams
  };
  request(
    requestOptions,
    function (err, response, body) {
      if (err) {
        console.log(err) // Print the google web page.
      }
      if (response.statusCode === 201) {
        req.session.user = body.user;
        console.log(req.session.user);
        res.json({ user: body.user[0] });
      }
    }
  );
}