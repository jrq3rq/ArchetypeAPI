const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // other fields...
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
