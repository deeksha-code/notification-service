require("dotenv").config();

const connectDB = require("../db/db");  
connectDB();                             

const amqp = require("amqplib");
const { sendPush } = require("../services/pushService");
const Notification = require("../models/notificationModel");
const { emitEvent } = require("../services/sseService");

async function startWorker() {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();

  console.log("Worker connected to RabbitMQ");

  await channel.assertQueue("notification_queue");
  await channel.assertQueue("dead_letter_queue");

  channel.consume("notification_queue", async (msg) => {
    const data = JSON.parse(msg.content.toString());

    console.log("Worker received job:", data._id);

    try {
      console.log("Sending push...");

      await sendPush(data); 

      await Notification.findByIdAndUpdate(data._id, {
        status: "sent"
      });

      emitEvent(data.userId, data);

      channel.ack(msg);

    } catch (err) {
      console.log("Error in worker:", err.message);

      channel.ack(msg);
    }
  });
}

startWorker();