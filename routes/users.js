var express = require("express");
var router = express.Router();
var passport = require("passport");

var checkAndregisterUser = require("../src/models/registration").checkAndregisterUser;
var checkAndLoginUser = require("../src/models/registration").checkAndLoginUser;

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", checkAndregisterUser);

router.post("/login", checkAndLoginUser);

// for bearer strtgy. use "bearer" at the place of "local" and for jwtStrategy use "jwt" at the place of local.
router.post("/secret", passport.authenticate("jwt", { session: false }), function(req, resp) {
    resp.json({ Hello: "Hello world" });
  }
);

module.exports = router;
