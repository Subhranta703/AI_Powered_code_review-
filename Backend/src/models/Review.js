const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    type: String, // bug, performance, readability, security
    severity: String, // low, medium, high, critical
    line: Number,
    message: String
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    code: { type: String, required: true },
    language: { type: String },
    summary: { type: String },
    suggestions: { type: String },
    tests: { type: String },
    issues: [issueSchema],
    scores: {
      maintainability: Number,
      complexity: Number,
      security: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
