const Notification = require("../models/notificationModel");
const { checkRateLimit } = require("../services/rateLimiter");
const { sendToQueue } = require("../queue/producer");

async function createNotification(req, res) {
  const { userId, message, scheduleAt } = req.body;
  console.log("API HIT:", userId, message);

  const allowed = await checkRateLimit(userId);

  if (!allowed) {
    return res.status(429).json({ error: "Too many requests" });
  }

  const notification = await Notification.create({
    userId,
    message,
    scheduleAt
  });

  if (!scheduleAt) {
     console.log("Sending to queue");  
    await sendToQueue(notification);
  }


  res.json({ success: true });
}

module.exports = { createNotification };