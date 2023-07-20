const express = require("express"),
  router = express.Router(),
  Appointment = require("../../models/appointment"),
  Doctor = require("../../models/doctor"),
  { isUserLoggedIn, isDoctorLoggedIn } = require("../../middleware/middleware");

// Show User Appointments
router.get("/user", isUserLoggedIn, (req, res) => {
  Appointment.find(
    { "bookedBy.id": { $eq: res.locals.user._id } },
    (err, appointments) => {
      if (err) {
        throw err;
      }
      if (!appointments.length) {
        res.json({ results: "No record found" });
      } else {
        res.json({ results: appointments });
      }
    }
  );
});

// Cancel User Appointment
router.delete("/user", isUserLoggedIn, (req, res) => {
  Appointment.findByIdAndDelete(req.query.appointmentId, (err, appointment) => {
    if (err) {
      res.json({ type: "ERROR", message: err.message });
    }
    res.json({
      type: "SUCCESS",
      message: "Your appointment was successfully cancelled!"
    });
  });
});

// Book Appointment
router.post("/", isUserLoggedIn, async (req, res) => {
  const { _id: id, firstName, lastName, email } = res.locals.user;
  const {
    appointmentFor,
    appointmentDateTime,
    description,
    doctorId,
    firstName: patientFirstName,
    lastName: patientLastName,
    relationship
  } = req.body;
  let newAppointment = {},
    doctor = {};

  await Doctor.findById(doctorId, (err, foundDoctor) => {
    if (err) {
      throw err;
    }
    doctor = {
      id: foundDoctor._id,
      firstName: foundDoctor.firstName,
      lastName: foundDoctor.lastName
    };
  });

  if (appointmentFor === "self") {
    newAppointment = {
      appointmentDateTime,
      description,
      bookedBy: {
        id,
        firstName,
        lastName,
        email
      },
      doctor,
      patient: {
        firstName,
        lastName
      }
    };
  } else if (appointmentFor === "someoneelse") {
    newAppointment = {
      appointmentDateTime,
      description,
      bookedBy: {
        id,
        firstName,
        lastName,
        email
      },
      doctor,
      patient: {
        relationship,
        firstName: patientFirstName,
        lastName: patientLastName
      }
    };
  }

  Appointment.create(newAppointment, (err, appointment) => {
    if (err) {
      res.json({ type: "ERROR", message: err.message });
    }
    res.json({
      type: "SUCCESS",
      message: "Your appointment was successfully booked!"
    });
  });
});

// Show Doctor Appointments
router.get("/doctor", isDoctorLoggedIn, (req, res) => {
  Appointment.find(
    { "doctor.id": { $eq: res.locals.doctor._id } },
    (err, appointments) => {
      if (err) {
        throw err;
      }
      if (!appointments.length) {
        res.json({ results: "No record found" });
      } else {
        res.json({ results: appointments });
      }
    }
  );
});

// Cancel Doctor Appointment
router.delete("/doctor", isDoctorLoggedIn, (req, res) => {
  Appointment.findByIdAndUpdate(
    req.query.appointmentId,
    { status: "Declined" },
    (err, appointment) => {
      if (err) {
        res.json({ type: "ERROR", message: err.message });
      }
      res.json({
        type: "SUCCESS",
        message: "Appointment was successfully declined!"
      });
    }
  );
});

// Accept Doctor Appointment
router.post("/doctor", isDoctorLoggedIn, (req, res) => {
  Appointment.findByIdAndUpdate(
    req.body.appointmentId,
    { status: "Accepted" },
    (err, appointment) => {
      if (err) {
        res.json({ type: "ERROR", message: err.message });
      }
      res.json({
        type: "SUCCESS",
        message: "Appointment was successfully accepted!"
      });
    }
  );
});

module.exports = router;
