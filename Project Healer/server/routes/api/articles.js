const express = require("express"),
  router = express.Router(),
  Article = require("../../models/article"),
  { isDoctorLoggedIn } = require("../../middleware/middleware");

// INDEX - show all articles
router.get("/", (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      throw err;
    }
    if (!articles.length) {
      res.json({ results: "No record found" });
    } else {
      res.json({ results: articles });
    }
  });
});

// Create Article
router.post("/", isDoctorLoggedIn, (req, res) => {
  const { _id: id, username, firstName, lastName } = res.locals.doctor;
  const newArticle = {
    ...req.body,
    author: { id, username, firstName, lastName }
  };
  Article.create(newArticle, (err, article) => {
    if (err) {
      res.json({ type: "ERROR", message: err.message });
    }
    res.json({
      type: "SUCCESS",
      message: "Your article was successfully posted!"
    });
  });
});

module.exports = router;
