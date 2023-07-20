const passport = require("passport"),
  LocalStrategy = require("passport-local"),
  { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt"),
  { jwtSecret } = require("./constants"),
  User = require("../models/user"),
  Doctor = require("../models/doctor");

passport.use(
  "localUser",
  new LocalStrategy({ session: false }, User.authenticate())
);
passport.use(
  "localDoctor",
  new LocalStrategy({ session: false }, Doctor.authenticate())
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: jwtSecret
};

passport.use(
  "jwtUser",
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ username: jwt_payload.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, {
          type: "ERROR",
          message: "You need to be logged in to do that"
        });
      }
    });
  })
);

passport.use(
  "jwtDoctor",
  new JwtStrategy(opts, (jwt_payload, done) => {
    Doctor.findOne({ username: jwt_payload.id }, (err, doctor) => {
      if (err) {
        return done(err);
      }
      if (doctor) {
        return done(null, doctor);
      } else {
        return done(null, false, {
          type: "ERROR",
          message: "You need to be logged in to do that"
        });
      }
    });
  })
);
