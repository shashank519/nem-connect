var mongoose = require('mongoose');
var regSchema = require('./../schema/registration.js');

module.exports = function registerUser(userData){
	var RegisteredUsers = mongoose.model('users', regSchema);
	var registeredUsers = new RegisteredUsers(userData);
	return registeredUsers.save();
}