
// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema   = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  description: {type: String, default: "Hi everyone, I'm new to ShareThePik"},
  location:{type: String},
  profilepic: {type: String},

  date_created:  {type: Date, default: Date.now},

  number_photo: {type: Number, default: 0},

  list_event:{type: [String]}

});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
