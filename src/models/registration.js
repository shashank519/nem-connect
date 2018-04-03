var mongoose = require('mongoose');
var regSchema = require('./../schema/registration.js');

// module.exports = function registerUser(userData){
// 	console.log('userData');
// 	// var RegisteredUsers = mongoose.model('users', regSchema);
// 	// var registeredUsers = new RegisteredUsers(userData);
// 	// return registeredUsers.save();
// }

// module.exports = function findIfUserExists(userData){
// 	console.log('Hello bahi loog');
// 	// var RegisteredUsers = mongoose.model('users', regSchema);
// 	// RegisteredUsers.find({firstName: userData.name}, function(err, result){
// 	// 	if(err) return {'error': err}
// 	// 	return result;
// 	// })
// }

exports.registerUser = function(userData){
	var RegisteredUsers = mongoose.model('users', regSchema);
	var registeredUsers = new RegisteredUsers(userData);
	return registeredUsers.save();
}

exports.findIfUserExists = function(userData){
	var RegisteredUsersA = mongoose.model('users', regSchema);
	return RegisteredUsersA.findOne({firstName: userData.firstName});
}