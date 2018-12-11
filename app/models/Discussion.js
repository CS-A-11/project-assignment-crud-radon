var mongoose = require('mongoose');
var UserSchema = require('./User');

var commentSchema = new mongoose.Schema({
	comment_text: String,
	createdOn: {type:Date, default:Date.now},
	creatorName: UserSchema.schema
});

var discussionSchema = new mongoose.Schema({
	title: String,
	content: String,
  creatorName: UserSchema.schema,
	createdOn: {type:Date, default:Date.now},
	tags: [String],
	comments: [commentSchema]	
});

mongoose.model('Discussion', discussionSchema);