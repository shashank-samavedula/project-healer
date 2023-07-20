const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const DoctorSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  avatar: String,
  dateOfBirth: Date,
  gender: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  specialization: { type: Array },
  role: { type: String, default: "doctor" },
  createdOn: { type: Date, default: Date.now }
});

DoctorSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Doctor", DoctorSchema);
