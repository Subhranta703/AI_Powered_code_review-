const { generateReview } = require("../services/ai.services");


exports.getReview = async (req, res) => {
  try {
    if (!req.body.code) {
      return res.status(400).json({ message: "Code is required" });
    }

    const review = await generateReview(req.body.code);

    res.json({ review });
  } catch (err) {
    console.error("Review Error:", err);
    res.status(500).json({ message: "AI review failed" });
  }
};
