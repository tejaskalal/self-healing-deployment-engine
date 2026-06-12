const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🚀 Self-Healing Deployment Engine Running - V2");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime()
  });
});

app.get("/version", (req, res) => {
  res.json({
    version: "v2"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
