var request = require("request");
var apiOptions = {
  server: "http://localhost:5000"
};
if (process.env.NODE_ENV === "production") {
  apiOptions.server = "add something here";
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
    url: apiOptions.server + "/api/user/sigin",
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
        res.redirect("/");
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
    url: apiOptions.server + "/api/user/signup",
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
        console.log(response.body.user);
        res.redirect("/");
      }
    }
  );
}