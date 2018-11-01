var mongoose = require('mongoose');
var UserSchema = require('./User');

var topicDiscussionSchema = new mongoose.Schema({
	title: String,
	content: Buffer,
  creatorName: UserSchema.schema,
	createdOn: {type:Date, default:Date.now},
	comments: [commentSchema]	
});

mongoose.model('Article', articleSchema);