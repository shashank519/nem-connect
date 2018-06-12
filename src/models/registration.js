var mongoose = require('mongoose');
var jwt = require("jsonwebtoken");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;

var regSchema = require('./../schema/registration.js');

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "shashankdave"
};

const registerUser = function(userData){
	var RegisteredUsers = mongoose.model('users', regSchema);
	var registeredUsers = new RegisteredUsers(userData);
	return registeredUsers.save();
}

// exports.registerUser = function(userData){
// 	var RegisteredUsers = mongoose.model('users', regSchema);
// 	var registeredUsers = new RegisteredUsers(userData);
// 	return registeredUsers.save();
// }

const findIfUserExists = function(userData){
	var RegisteredUsersA = mongoose.model('users', regSchema);
	return RegisteredUsersA.findOne({email: userData.email});
}

const checkAndregisterUser = function(req, res){
	findIfUserExists(req.body).then(function(response, err) {
		if (err) {
			res.json(err);
		} else {
			if (response && response.email.length && response.email === req.body.email) {
				res.send({ message: "User alreasy exists. Try with another email.", errorWithSaving: "User already exists." });
			} else {
				registerUser(req.body).then(function(response, err) {
					if (err) {
						res.json(err);
					} else {
						res.json({ response: response, message: "User registered successfully." });
					}
				});
			}
		}
	})
	.catch(function(e) {
		throw e;
	});
}

const checkAndLoginUser = function(req, res){
	findIfUserExists(req.body).then(function(response, err) {
		if (err) {
			res.json({ err: err });
		} else {
			console.log('Yaha p hai');
			if (req.body.email === response.email) {
				var payload = { email: response.email };
				var token = jwt.sign(payload, jwtOptions.secretOrKey);
				res.status(200).json({ msg: "ok", token: token });
			} else {
				res.status(401).json({ message: "passwords did not match" });
			}
		}
	})
	.catch(function(e) {
		throw e;
	});
}

module.exports.checkAndLoginUser = checkAndLoginUser;
module.exports.checkAndregisterUser = checkAndregisterUser;