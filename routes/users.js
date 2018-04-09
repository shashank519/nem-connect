var express = require('express');
var router = express.Router();
var registerationNewUser = require('../src/models/registration').registerUser;
var findIfAnyUserExists = require('../src/models/registration').findIfUserExists;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, resp){
	findIfAnyUserExists(req.body).then(function(response, err){
		console.log(response);
		if(err) { resp.json(err)}
		else {
			if(response && response.email.length && response.email === req.body.email){
				resp.send({'message': 'User alreasy exists. Try with another email.', errorWithSaving: 'User already exists.'})
			} else {
				registerationNewUser(req.body).then(function(response, err){
					if(err) {
						resp.json(err);
					} else {
						resp.json({'response': response, 'message': 'User registered successfully.'});
					}
				})
			}
		}
	}).catch(function(e){
		throw e;
	})
	// registerationUser(req.body).then(function(err, response){
	// 	if(err) {
	// 		resp.json(err);
	// 	} else {
	// 		resp.json(response);
	// 	}
	// })
});

module.exports = router;
