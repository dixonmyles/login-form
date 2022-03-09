const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Create the User Schema
const userSchema = new mongoose.Schema({
  username: String,
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;
