var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var passportJWT = require("passport-jwt");
var passport = require("passport");

var ExtractJwt = passportJWT.ExtractJwt;

var registerationNewUser = require("../src/models/registration").registerUser;
var findIfAnyUserExists = require("../src/models/registration").findIfUserExists;

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "shashankdave"
};
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", function(req, resp) {
  findIfAnyUserExists(req.body).then(function(response, err) {
		console.log(response);
		if (err) {
			resp.json(err);
		} else {
			if (response && response.email.length && response.email === req.body.email) {
				resp.send({ message: "User alreasy exists. Try with another email.", errorWithSaving: "User already exists." });
			} else {
				registerationNewUser(req.body).then(function(response, err) {
					if (err) {
						resp.json(err);
					} else {
						resp.json({ response: response, message: "User registered successfully." });
					}
				});
			}
		}
	})
	.catch(function(e) {
		throw e;
	});
});

router.post("/login", function(req, resp) {
  findIfAnyUserExists(req.body).then(function(response, err) {
		if (err) {
			resp.json({ err: err });
		} else {
			if (req.body.email === response.email) {
				var payload = { email: response.email };
				var token = jwt.sign(payload, jwtOptions.secretOrKey);
				resp.json({ msg: "ok", token: token });
			} else {
				resp.status(401).json({ message: "passwords did not match" });
			}
		}
	})
	.catch(function(e) {
		resp.status(401).json({ message: "Wrong credentials" });
	});
});

// for bearer strtg. use "bearer" at the place of "local".
router.post("/secret", passport.authenticate("local", { session: false }), function(req, resp) {
    resp.json({ Hello: "Hello world" });
  }
);

module.exports = router;
