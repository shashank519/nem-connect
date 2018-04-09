var mongoose = require('mongoose');
var regSchema = require('./../schema/registration.js');

exports.registerUser = function(userData){
	var RegisteredUsers = mongoose.model('users', regSchema);
	var registeredUsers = new RegisteredUsers(userData);
	return registeredUsers.save();
}

exports.findIfUserExists = function(userData){
	var RegisteredUsersA = mongoose.model('users', regSchema);
	return RegisteredUsersA.findOne({email: userData.email});
}