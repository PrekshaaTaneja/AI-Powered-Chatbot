const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chatRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const historyRoutes = require("./routes/historyRoutes");
// const apiLimiter = require("./utils/rateLimiter");

const app = express();

app.use(cors());
app.use(express.json());
// app.use("/api", apiLimiter);

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {
  res.send("AI Chatbot Backend is running 🚀");
});

module.exports = app;
