const express = require("express");
const router = express.Router();

const { createNotification } = require("../controllers/notificationController");
const { addClient } = require("../services/sseService");
const User = require("../models/userModel");

//  Save subscription
router.post("/save-subscription", async (req, res) => {
  const { userId, subscription } = req.body;

  await User.findOneAndUpdate(
    { userId },
    { subscription },
    { upsert: true }
  );

  res.json({ success: true });
});

// create notification
router.post("/", createNotification);

// SSE
router.get("/stream/:userId", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  addClient(req.params.userId, res);
});

module.exports = router;