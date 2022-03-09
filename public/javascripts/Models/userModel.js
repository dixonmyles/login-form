const mongoose = require("../../../database");

// Create the User Schema
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
});
const userModel = mongoose.model("users", userSchema);

module.exports = mongoose.model("Users", userModel);
