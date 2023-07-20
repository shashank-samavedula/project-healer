const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  dotenv = require("dotenv");

// Environment variables configuration
dotenv.config();

// Requiring routes
const diseaseRoutes = require("./routes/api/diseases"),
  userRoutes = require("./routes/api/users"),
  doctorRoutes = require("./routes/api/doctors"),
  articleRoutes = require("./routes/api/articles"),
  appointmentRoutes = require("./routes/api/appointments");

const url = process.env.DATABASE_URL || "mongodb://localhost/projectHealer";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.use(express.json());

// PASSPORT CONFIGURATION
const passport = require("passport");

app.use(passport.initialize());
require("./configuration/passport");

// Use our router configuration when we call /api
app.use("/api/disease", diseaseRoutes);
app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/appointment", appointmentRoutes);

// PRODUCTION CONFIGURATION
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(
    express.static(path.resolve(path.dirname(__dirname), "client", "build"))
  );
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(path.dirname(__dirname), "client", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
