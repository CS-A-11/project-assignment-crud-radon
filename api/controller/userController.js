var mongoose = require('mongoose');
var users = mongoose.model('users');
var queries = mongoose.model('Discussion');

var sendSigninResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};
var sendResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};
module.exports.getAllPosts = function (req, res) {
  queries.find(
    { "creatorName._id": req.params.uid },
    "title content createdOn",
    function (err, queries) {
      if (!err) {
        sendResponse(res, 201, queries);
      } else {
        sendResponse(res, 400, err);
      }
    }
  ).sort({"createdOn":-1});
}

module.exports.signup = function (req, res) {
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
module.exports.checkUser = function (req, res) {
  users.find( { 
    $or:[
      {'username': req.body.name}, 
      {'email': req.body.email} 
    ]}, 
    function(err,user){
      if (err) {
        sendSigninResponse(res, 400, err);
      } else {
        if (user.length === 1)
          sendSigninResponse(res, 400, { status: "email or username already exits" });
        else {
          sendSigninResponse(res, 201, { status: "user not found", user });
        }
      }
  });
}