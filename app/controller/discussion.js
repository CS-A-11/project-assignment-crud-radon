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