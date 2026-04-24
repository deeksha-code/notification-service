
const amqp = require("amqplib");

let channel;

async function connectQueue() {
  const conn = await amqp.connect("amqp://localhost");
  channel = await conn.createChannel();

  await channel.assertQueue("notification_queue");
  await channel.assertQueue("dead_letter_queue");
}

async function sendToQueue(data) {
  channel.sendToQueue(
    "notification_queue",
    Buffer.from(JSON.stringify(data))
  );
}

module.exports = { connectQueue, sendToQueue };