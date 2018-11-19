var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstname: {type: String, required:true},
	lastname: {type: String, required:true},
	username: {type: String, required: true},
	password: {type: String, required: true},
	dateOfBirth: {type: Date, required: true},
	email: {type: String, required: true},
	admin: {type: Boolean, default: false, required: false}
});


module.exports = mongoose.model('users', UserSchema);