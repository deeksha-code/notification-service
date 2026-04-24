const webpush = require("web-push");
const User = require("../models/userModel");

webpush.setVapidDetails(
  "mailto:test@test.com",
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

async function sendPush(notification) {
  const user = await User.findOne({ userId: notification.userId });

  if (!user || !user.subscription) {
    throw new Error("No subscription found");
  }

  const payload = JSON.stringify({
    title: "Notification",
    message: notification.message,
    timestamp: new Date()
  });

  await webpush.sendNotification(user.subscription, payload);
}

module.exports = { sendPush };