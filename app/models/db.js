var mongoose = require('mongoose');
var dbURI = 'mongodb://root:fastnu007@ds131753.mlab.com:31753/radon0343';


mongoose.connect('mongodb://root:fastnu007@ds131753.mlab.com:31753/radon0343', { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log('error:' + err);
  } else {
    console.log('Connected to server');
  }
});

mongoose.connection.on('connected', function () {
	console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err){
  console.log('Mongoose connection error '+ err);
});

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});

var gracefulShutDown = function(msg, callback){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnedted through '+ msg);
    callback();
  });
};

process.once('SIGUSR2', function(){
  gracefulShutDown('nodemon restart', function(){
    process.kill(process.id, 'SIGUSR2');
  });
});

process.on('SIGINT', function(){
  gracefulShutDown('app termination', function(){
    process.exit(0);
  });
}); 

process.on('SIGTERM', function(){
  gracefulShutDown('Heroku app shutdown', function(){
    process.exit(0);
  });
});

require('./User');
require('./Article');
require('./Discussion');

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
