var request = require("request");
var apiOptions = {
  server: "http://localhost:5000"
};
if (process.env.NODE_ENV === "production") {
  apiOptions.server = "add something here";
}

module.exports.viewDiss = function (req, res) {
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
        res.render("discussions", {discussions: heading});
      }
    }
  );
}

module.exports.deleteDiscussion = function (req, res) {
  var urlParams = {
    postId: req.params.discussionId
  };
  var requestOptions = {
    url: req.protocol + '://' + req.get('host') + '/api/user/delete_discussion/',
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
      imageName: req.file.filename
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
  res.render("addDiscussion", {
    title: "Add Discussion",
    discussions: {
      _id: '',
      title: '',
      content:'',
    }
  });   
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

module.exports.query = function (req, res) {
  res.render('query', {
    user: {
      userId: 11,
      userName: "Fauz",
      img: 'https://www.process-worldwide.com/shared/vogelonline/img/bep30/user_default.jpg'
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
          img: '/images/pic.jpg'
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        date: 'Monday, August 20, 2018',
      }
    ]
  });
}

