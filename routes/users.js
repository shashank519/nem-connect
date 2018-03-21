var express = require('express');
var router = express.Router();
var registerUser = require('../src/models/registration.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, resp){
	console.log(req.body);
	// registerUser(req.body, function(err, response){
	// 	console.log('Hello world');
	// 	if(err) {
	// 		console.log('Hye buddy');
	// 		resp.json({err: err});
	// 	} else {
	// 		console.log('Hello world');
	// 		resp.json({"data": response});
	// 	} 
	// });
	registerUser(req.body).then(function(err, response){
		if(err) {
			resp.json(err);
		} else {
			resp.json(response);
		}
	})
});

module.exports = router;
