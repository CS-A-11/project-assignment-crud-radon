var request = require("request");
var apiOptions = {
  server: "http://localhost:5000"
};
if (process.env.NODE_ENV === "production") {
  apiOptions.server = "add something here";
}

module.exports.editDiscussion = function (req, res) {
  if (req.file === undefined) {
    var urlParams = {
      title: req.body.heading,
      content: req.body.content,
      createdOn:Date.now,
      // imageName: req.body.file.filename,
      // creatorName: req.session.user
    };
  } else {
    var urlParams = {
      title: req.body.heading,
      content: req.body.content,
      createdOn: Date.now,
      imageName: req.file.filename,
      creatorName: req.session.user
    };
  }
  var requestOptions = {
    url: req.protocol + "://" + req.get("host") + "/api/user/update_discussion/" + req.params.discussionId,
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
        res.redirect("/discussions");
      }
    }
  );
}

module.exports.editDiscussionPage = function (req, res) {
  var requestOptions = {
    url: req.protocol + "://" + req.get("host") + "/api/user/queries/" + req.params.discussionId,
    method: "GET",
    json: {}
  }
  request(
    requestOptions,
    function (err, response, body) {
      if (!err && response.statusCode === 201) {
        res.render("editDiscussion", {
          title: "Edit Discussion",
          discussions: body
        });  
      }
    }
  );
}


module.exports.viewDiss = function (req, res) {
  var ans;
  if (!req.session.user)
    ans=false;
  else 
    ans=true ; 

  var requestOptions = {
    url: apiOptions.server + "/api/user/discussions",
    method: "GET",
    json: {},
  };
  request(
    requestOptions,
    function (err, respose, body) {
      if (err) {
        console.log(err);
      } else {
        res.render("discussions", {discussions: body, title:"Discussions", isSessionSet:ans });
      }
    }
  );
}

module.exports.deleteDiscussion = function (req, res) {
  var urlParams = {
    discussionId: req.params.discussionId
  };
  var requestOptions = {
    url: req.protocol + '://' + req.get('host') + '/api/user/delete_discussion',
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
        res.redirect("/discussions");
      }
    }
  );
}

module.exports.createComment =function (req, res) {
  if (req.body.commentBox === undefined) {
    res.render("query", {
      title:"Discussion Details",
      comments: {
        _id:'',
        comment_text:''
        }      
    
      });  
  }
  else {
    var urlParams = {
      comment_text: req.body.commentBox,
      createdOn: Date.now,
      creatorName: req.session.user
    };

    var requestOptions = {
      url: apiOptions.server + "/api/user/add_comment/" + req.params.discussionId,
      method: "POST",
      json: urlParams
    };

    request(requestOptions,
      function(err, response, body) {
        if (err){
          console.log(err);   //print the google web page
        }
        else if (response.statusCode === 201){
          res.redirect("/queries/" + req.params.discussionId);
        }
      })

  }
}

module.exports.query2 = function (req, res) {
  var ans;
  if (!req.session.user)
    ans=false;
  else 
    ans=true ;
  
  // var urlParams = {
  //   discussionId: req.params.discussionId
  // };
  var requestOptions = {
    url: apiOptions.server + "/api/user/queries/" + req.params.discussionId,
    method: "GET",
    json: {}
  }
  request(
    requestOptions, 
    function(err, response, body) {
      if (!err && response.statusCode === 201) {
        res.render('query', {
          title: "Discussion Details",
          isSessionSet:ans,
          discussion: body,
          // // : req.params.discussionId,
          // //discussionId: req.params.discussion_id,
          // // queryTopic: req.params.title, 
          // queryDetails: 'ksncl3n34',
          // //discussion: body
          //  queryTopic: 'sd;vhfbivjokqewkvdn scijm', 
          // // queryTopic: response.title,
          // // queryDetails: content,
          // // date: response.createdOn,
          // date: '1234',
          tags: [
            { id: 11, name: 'webApp' },
            { id: 22, name: 'mobile_development' },
            { id: 23, name: 'meanstack'}
          ],
          user: {
            userId: 11,
            userName: response.creatorName,
            // userName: "Fauz Ahmad"
            img: '/images/userIcon.png'
          },
          comments: [
            {
              user: {
                userId: 10,
                userName: "Waneed",
                img: '/images/userIcon.png'
              },
              comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
              date: 'Monday, August 20, 2018',
            }
          ]
          // comments: [
          //   {
          //     user: {
          //       userId: 10,
          //       // userName: response.comments.creatorName
          //       userName:"Fauz Ahmad"
          //     },
          //     comment_text: response.comments.comment_text,
          //     date: response.comments.createdOn
          //   }
          // ]
        });
        // res.redirect("");
      }
    }
  )
}

module.exports.createDiscussion = function (req,res){
  if (req.file === undefined || req.body.heading === '' || req.body.content===''){
    res.render("addDiscussion", {
      title: "Create Discussion",
      message: "Some fields are missing.",
      discussions: {
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
      imageName: req.file.filename,
      creatorName: req.session.user
    };
    var requestOptions = {
      url: apiOptions.server + "/api/user/discussions/add_discussion_to_radon",
      method: "POST",
      json: urlParams
    };
    request(
      requestOptions,
      function(err, response, body){
        if (err){
          console.log(err);   //print the google web page
        }
        else if (response.statusCode === 201){
          res.redirect("/discussions");
        }
      }
    )
  }
}


module.exports.addDiscussion = function (req, res){
  if (!req.session.user) {
    res.redirect("/user/signin");
  } else {
    res.render("addDiscussion", {
      title: "Add Discussion",
      discussions: {
        _id: '',
        title: '',
        content:'',
      }
    });
  }
}

module.exports.discussionsList = function (req, res) {
  res.render("discussions", {
    title: 'Discussions',
    discussions: [
      {
        user: {
          userId: 10,
          userName: "Waneed",
          img: '/images/pic.jpg'
        },
        queryTopic: "Creates an Express application",
        queryExcerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 
        tags: [
          { id: 10, name: 'express' },
          { id: 20, name: 'MEAN stack' }
        ],
        date: 'Monday, August 20, 2018', 
        id: 25,
      },
      {
        user: {
          userId: 11,
          userName: "Fauz",
          img: 'https://www.process-worldwide.com/shared/vogelonline/img/bep30/user_default.jpg'
        },
        queryTopic: "Creates a react native application",
        queryExcerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 
        tags: [
          { id: 11, name: 'react native' },
          { id: 22, name: 'mobile development' }
        ],
        date: 'Monday, August 20, 2018', 
        id: 26,
      }
    ]
  });
}


module.exports.query3 = function (req, res) {
  var urlParams = {
    discussionId: req.params.discussionId
  };
  var requestOptions = {
    // url: apiOptions.server + "/api/user/discussions/" + req.params.discussionid,
    // url: apiOptions.server + "/api/user/discussions/view",
    // url: req.protocol + "://" + req.get('host') + "/api/query",
    url: apiOptions.server + "/user/queries/" + req.params.discussionId,
    method: "GET",
    json: urlParams
  }
  request(
    requestOptions, 
    function(err, response, body) {
      if (!err && response.statusCode === 201) {
        res.render('query', {
          user: {
            userId: 11,
            userName: "Fauz",
            // img: '/images/userIcon.png'
          },
          queryTopic: "Creates a react native application",
          queryDetails: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
          tags: [
            { id: 11, name: 'react native' },
            { id: 22, name: 'mobile development' }
          ],
          date: 'Monday, August 20, 2018', 
          id: 26,
          comments: [
            {
              user: {
                userId: 10,
                userName: "Waneed",
                // img: '/images/userIcon.png'
              },
              comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
              date: 'Monday, August 20, 2018',
            }
          ]
        });
      }
    }
  )
}



module.exports.query = function (req, res) {
  res.render('query', {
    user: {
      userId: 11,
      userName: "Fauz",
      // img: '/images/userIcon.png'
    },
    queryTopic: "Creates a react native application",
    queryDetails: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
    tags: [
      { id: 11, name: 'react native' },
      { id: 22, name: 'mobile development' }
    ],
    date: 'Monday, August 20, 2018', 
    id: 26,
    comments: [
      {
        user: {
          userId: 10,
          userName: "Waneed",
          // img: '/images/userIcon.png'
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        date: 'Monday, August 20, 2018',
      }
    ]
  });
}

