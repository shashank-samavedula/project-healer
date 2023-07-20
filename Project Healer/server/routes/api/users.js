const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  jwt = require("jsonwebtoken"),
  { jwtSecret } = require("../../configuration/constants"),
  User = require("../../models/user");

// Handle sign up logic
router.post("/signup", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    avatar: req.body.avatar,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return res.json({
          type: "ERROR",
          message: "A user with the given email is already registered"
        });
      } else {
        return res.json({ type: "ERROR", message: err.message });
      }
    }
    passport.authenticate("localUser")(req, res, () => {
      const token = jwt.sign({ id: user.username }, jwtSecret);
      res.json({
        type: "SUCCESS",
        message: `Successfully Signed Up! Nice to meet you ${user.firstName} ${
          user.lastName
        }`,
        token,
        info: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender
        }
      });
    });
  });
});

// Handle login logic
router.post("/login", (req, res, next) => {
  passport.authenticate("localUser", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        type: "ERROR",
        message: "Incorrect username or password"
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ id: user.username }, jwtSecret);
      return res.json({
        type: "SUCCESS",
        message: `Welcome to Project Healer ${user.firstName} ${
          user.lastName
        }!`,
        token,
        info: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender
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

module.exports = router;
