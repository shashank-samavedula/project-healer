const mongoose = require("mongoose");

const DiseaseSchema = new mongoose.Schema({
  letter: { type: String },
  results: { type: Array, required: true }
});

module.exports = mongoose.model("Disease", DiseaseSchema);
