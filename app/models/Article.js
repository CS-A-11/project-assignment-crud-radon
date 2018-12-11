var mongoose = require('mongoose');

var UserSchema = require('./User');
var commentSchema = new mongoose.Schema({
	body: String,
	createdOn: {type:Date, default:Date.now},
	creatorName: UserSchema.schema
});

var articleSchema = new mongoose.Schema({
	title: String,
	content: String,
	createdOn: {type: Date, default: Date.now},
	imageName: String,
	comments: [commentSchema],
	fileName: String
});

mongoose.model('Article', articleSchema);