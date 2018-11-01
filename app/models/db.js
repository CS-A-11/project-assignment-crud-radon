var mongoose = require('mongoose');
var graceFullShutDown;

mongoose.connect('mongodb://root:fastnu007@ds131753.mlab.com:31753/radon0343', { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log('error:' + err);
  } else {
    console.log('Connected to server');
  }
});

mongoose.connection.on('connected', function () {
	console.log('connected');
});

require('./User');
require('./Article');

// var loginSchema = new mongoose.Schema({
// 	user: userSchema,
// 	timing: Date
// });

// var topicDiscussionSchema = new mongoose.Schema({
// 	title: String,
// 	content: Buffer,
// 	creatorName: userSchema,
// 	createdOn: {type:Date, default:Date.now},
// 	comments: [commentSchema]	
// });

// mongoose.model('User', userSchema);
// mongoose.model('Login', loginSchema);
// mongoose.model('TopicDiscussion', topicDiscussionSchema);
