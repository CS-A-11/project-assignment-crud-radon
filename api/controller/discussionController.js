var mongoose = require('mongoose');
var discussion = mongoose.model('Discussion');
var sendPostResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.discussionsCreate = function(req, res){
    discussion.create(req.body, function(err, disc)
      {
        if(err){
          sendPostResponse(res, 400, err);
        }
        else{
          sendPostResponse(res, 201, {status: "success", disc});
        }
      }
    );
  }
  
  
  module.exports.viewDiss = function(req, res){
    discussion.find({}, {
      title: 1,
      createdOn: 1,
      content: 1
    }, function(err, disc){
      if (!err){
        sendPostResponse(res, 201, disc);
      } else {
        console.log(err);
        sendPostResponse(res, 400, err);
      }
    });
  }

  module.exports.discussionsList = function(req, res){
    discussion.find({}, {
      title: 1,
      content: 1,
      createdOn: 1
    }, function(err, disc){
      if (!err){
        sendPostResponse(res, 201, disc);
      } else {
        console.log(err);
        sendPostResponse(res, 400, err);
      }
    });
  }
  
  module.exports.discussionsReadOne = function (req, res){
    discussion.findById(req.params.discussionId, {
      _id:1, title:1, content:1, createdOn:1, creatorName:1
    }, function(err, disc){
      if (err){
        sendPostResponse(res, 400, err);
      } else {
        sendPostResponse(res, 201, disc);
      }
    });
  }
  
  module.exports.discussionsUpdateOne = function(req, res){
    discussion.findOneAndUpdate(
      { _id: req.params.discussionId },
      { $set: req.body},
      {
        upsert: false,
        multi: false,
        new: true
      },
      function(err, disc){
        if (err){
          sendPostResponse(res, 400, err);
        } else {
          sendPostResponse(res, 201, disc);
        }
      }
    );
  }
  
  module.exports.discussionsDeleteOne = function(req, res){
    discussion.findOneAndDelete(
      { _id: req.body.discussionId },
      function (err, disc) {
        if (err) {
          console.log('error' + err);
          sendPostResponse(res, 400, err);
        } else {
          console.log(disc);
          sendPostResponse(res, 201, disc);
        }
      }
    );
  };
  
  module.exports.commentsCreate = function (req, res){
    var disc_ID = req.params.discussionId;
    if (disc_ID){
      discussion.findById(disc_ID).select('comments')
      .exec(
        function(err, disc){
          if (err){
            sendPostResponse(res, 400, err);
          } else {
            doAddComment(req, res, disc);
          }
        });
    } else {
      sendPostResponse(res, 404, {"message": "Not found, discussionID required"});
    }
  };
  // adding & saving a subdocument
  var doAddComment = function (req, res, disc){
    if (!disc){
      sendPostResponse(res, 404, {"message": "discussionID not found"});
    } else {
      disc.comments.push({
        comment_text: req.body.comment_text,
        createdOn: req.body.createdOn,
        creatorName:req.body.creatorName
      });
      disc.save(function(err, disc){
        thisComment;
        if (err) {
          sendPostResponse(res, 400, err);
        }
        else {
          thisComment = disc.comments[disc.comments.length - 1];
          sendPostResponse(res, 201, thisComment);
        }
      })
    }
  }
  
  module.exports.commentsDeleteOne = function(req, res){
    if (!req.params.discussionId || !req.params.commentid){
      sendPostResponse(res, 404, {"message": "Not found, discussionID & commentID are both required"});
      return;
    }
    discussion
    .findById(req.params.discussionId)
    .select('comments')
    .exec(
      function(err, disc){
        if(!disc){
          sendPostResponse(res, 404, {"message": "discussionID not found"});
          return;
        } else if (err){
          sendPostResponse(res, 400, err);
          return;
        }
        if (disc.comments && disc.comments.length > 0){
          if (!disc.comments.id(req.params.commentid)){
            sendPostResponse(res, 404, {"message": "commentID not found"});
          } else {
            disc.comments.id(req.params.commentid).remove();
            disc.save(function(err){
              if(err){
                sendPostResponse(res, 404, err);
              } else {
                updateCommenting(discussion._id);
                sendPostResponse(res, 204, null);
              }
            });
          }
        } else {
          sendPostResponse(res, 404, {"message": "No comment to delete"});
        }
      }
    );
  };