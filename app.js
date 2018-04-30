var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');

var index = require('./routes/index');
var users = require('./routes/users');
var Strategy = require('passport-http-bearer').Strategy;

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var findIfAnyUserExists = require('./src/models/registration').findIfUserExists;


var dbConnect = require('./db.connect.js');

// console.log(dbConnect);

dbConnect.connect().then(function(res, err){
	if(err) {console.log('Error occured in connection with Mongo DB');}
	else if(res){ console.log('Connection with mongodb successful.')}
});

var app = express();

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'shashankdave'
};

// var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done){
//   console.log('Jwt received', jwt_payload);

//   var user = true;
//   if(user){
//     done(null, user);
//   } else {
//     done(null, false);
//   }
// })

// passport.use(strategy);

passport.use(new Strategy(jwtOptions, function(token, cb) {
    console.log('tokenddd', token);
    findIfAnyUserExists({email: 'shashank@gmail.com'}).then(function(response, err){
      if (err) { return cb(err); } 
      else if(!response) { return cb(null, false);} 
      return cb(null, response);
    }).catch(function(e){
      return cb(null, {'message': 'erroree'})
    })
  }
));

app.use(passport.initialize());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
