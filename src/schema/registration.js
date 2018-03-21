var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registerSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  address: String,
  mobile: Number
});

module.exports = registerSchema;