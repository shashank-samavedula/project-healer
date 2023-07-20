// All the middleware goes here
const passport = require("passport");

const isUserLoggedIn = (req, res, next) => {
  passport.authenticate("jwtUser", (err, user, info) => {
    if (err) {
      next(err);
    }
    if (info) {
      console.log(info.message);
      return res.json({
        type: "ERROR",
        message: "You need to be logged in to do that"
      });
    }
    res.locals.user = user;
    return next();
  })(req, res, next);
};

const isDoctorLoggedIn = (req, res, next) => {
  passport.authenticate("jwtDoctor", (err, doctor, info) => {
    if (err) {
      next(err);
    }
    if (info) {
      console.log(info.message);
      return res.json({
        type: "ERROR",
        message: "You need to be logged in to do that"
      });
    }
    res.locals.doctor = doctor;
    return next();
  })(req, res, next);
};

module.exports = { isUserLoggedIn, isDoctorLoggedIn };
