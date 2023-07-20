const express = require("express"),
  router = express.Router(),
  Disease = require("../../models/disease");

// Handle disease index request
router.get("/index", (req, res) => {
  Disease.findOne(
    { letter: { $eq: req.query.letter } },
    { "results.id": 1, "results.name": 1 },
    (err, diseases) => {
      if (err) {
        throw err;
      }
      if (!diseases) {
        res.json({ results: "No record found" });
      } else {
        res.json(diseases);
      }
    }
  );
});

// Handle disease information request
router.get("/information", (req, res) => {
  Disease.findOne(
    { "results.id": { $eq: req.query.id } }, // First find the results array of disease by ID
    { results: { $elemMatch: { id: req.query.id } } }, // Next to filter data of only that disease
    (err, disease) => {
      if (err) {
        throw err;
      }
      if (!disease) {
        res.json({ results: "No record found" });
      } else {
        res.json(disease);
      }
    }
  );
});

module.exports = router;
