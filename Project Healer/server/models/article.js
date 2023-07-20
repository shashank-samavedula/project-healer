const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: String,
  description: String,
  content: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
    },
    username: String,
    firstName: String,
    lastName: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Article", articleSchema);
