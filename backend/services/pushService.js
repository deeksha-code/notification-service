// services/pushService.js
const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:test@test.com",
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

async function sendPush(notification) {
  // mock subscription (replace with DB)
  const subscription = {
    endpoint: process.env.ENDPOINT,
    keys: {
      p256dh: process.env.P256DH,
      auth: process.env.AUTH
    }
  };

  const payload = JSON.stringify({
    title: "Notification",
    message: notification.message,
    timestamp: new Date()
  });

  await webpush.sendNotification(subscription, payload);
}

module.exports = { sendPush };