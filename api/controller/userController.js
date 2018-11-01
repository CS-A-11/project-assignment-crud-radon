var mongoose = require('mongoose');
var users = mongoose.model('users');

var sendSigninResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};
module.exports.signup = function (req, res) {
  console.log(req.body);
  users.create(req.body, function(err, user) {
    if (err) {
      console.log(err);
      sendSigninResponse(res, 400, err);
    } else {
      sendSigninResponse(res, 201, { status: "success", user });
    }
  });
};
module.exports.signinUser = function (req, res) {
  users.find({
    username: req.body.username,
    password: req.body.password
  }).exec(function (err, user) {
    sendSigninResponse(res, 201, { status: "success", user });
  });
};