const express = require("express");
const { protect } = require("../middleware/auth.Middleware");
const { getReview } = require("../controllers/review.controller");

const router = express.Router();

router.post("/", protect, getReview);

module.exports = router;
