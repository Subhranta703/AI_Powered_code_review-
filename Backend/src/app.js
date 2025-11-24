const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const reviewRoutes = require("./routes/review.routes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

module.exports = app;
