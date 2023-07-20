const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  jwt = require("jsonwebtoken"),
  { jwtSecret } = require("../../configuration/constants"),
  Doctor = require("../../models/doctor");

// Handle sign up logic
router.post("/signup", (req, res) => {
  const newDoctor = new Doctor({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    avatar: req.body.avatar,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    specialization: req.body.specialization
  });
  Doctor.register(newDoctor, req.body.password, (err, doctor) => {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return res.json({
          type: "ERROR",
          message: "A doctor with the given email is already registered"
        });
      } else {
        return res.json({ type: "ERROR", message: err.message });
      }
    }
    passport.authenticate("localDoctor")(req, res, () => {
      const token = jwt.sign({ id: doctor.username }, jwtSecret);
      res.json({
        type: "SUCCESS",
        message: `Successfully Signed Up! Nice to meet you Dr. ${
          doctor.firstName
        } ${doctor.lastName}`,
        token,
        info: {
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          email: doctor.email,
          dateOfBirth: doctor.dateOfBirth,
          gender: doctor.gender,
          specialization: doctor.specialization
        }
      });
    });
  });
});

// Handle login logic
router.post("/login", (req, res, next) => {
  passport.authenticate("localDoctor", (err, doctor, info) => {
    if (err) {
      return next(err);
    }
    if (!doctor) {
      return res.json({
        type: "ERROR",
        message: "Incorrect username or password"
      });
    }
    req.login(doctor, { session: false }, err => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ id: doctor.username }, jwtSecret);
      return res.json({
        type: "SUCCESS",
        message: `Welcome to Project Healer Dr. ${doctor.firstName} ${
          doctor.lastName
        }!`,
        token,
        info: {
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          email: doctor.email,
          dateOfBirth: doctor.dateOfBirth,
          gender: doctor.gender,
          specialization: doctor.specialization
        }
      });
    });
  })(req, res, next);
});

// Logout logic
router.get("/logout", (req, res) => {
  req.logout();
  res.json({ type: "INFO", message: "See you later!" });
});

router.get("/online", (req, res) => {
  Doctor.find(
    { specialization: { $elemMatch: { $eq: req.query.specialization } } },
    {
      _id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      specialization: 1
    },
    (err, doctor) => {
      if (err) {
        throw err;
      }
      if (doctor.length === 0) {
        res.json("No record found");
      } else {
        res.json(doctor);
      }
    }
  );
});

module.exports = router;
