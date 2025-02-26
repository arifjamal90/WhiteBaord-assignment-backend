// models/User.js
const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Admin", "Editor", "Viewer"], 
    default: "viewer",
  },
});




const User = mongoose.model("User", userSchema);






module.exports = User;



