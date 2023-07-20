const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  status: { type: String, default: "Under Approval" },
  appointmentDateTime: Date,
  description: String,
  bookedBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    firstName: String,
    lastName: String,
    email: String
  },
  doctor: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
    },
    firstName: String,
    lastName: String
  },
  patient: {
    relationship: String,
    firstName: String,
    lastName: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
