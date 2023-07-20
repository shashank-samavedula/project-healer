const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  avatar: String,
  dateOfBirth: Date,
  gender: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  role: { type: String, default: "user" },
  createdOn: { type: Date, default: Date.now }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
