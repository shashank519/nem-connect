var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var registerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

module.exports = registerSchema;
