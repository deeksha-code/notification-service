const amqp = require("amqplib");

let channel;

async function connectQueue() {
  const conn = await amqp.connect("amqp://localhost");
  channel = await conn.createChannel();

  console.log("RabbitMQ connected");   

  await channel.assertQueue("notification_queue");
  await channel.assertQueue("dead_letter_queue");
}

async function sendToQueue(data) {
  if (!channel) {
    console.log("Channel not initialized"); 
    return;
  }

  console.log("Sending job to queue:", data._id);  

  channel.sendToQueue(
    "notification_queue",
    Buffer.from(JSON.stringify(data))
  );
}

module.exports = { connectQueue, sendToQueue };