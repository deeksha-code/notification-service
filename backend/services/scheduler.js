const Notification = require("../models/notificationModel");
const { sendToQueue } = require("../queue/producer");

function initScheduler() {
  setInterval(async () => {
    const now = new Date();

    const jobs = await Notification.find({
      scheduleAt: { $lte: now },
      status: "pending"
    });

    for (let job of jobs) {
      await sendToQueue(job);
      job.status = "queued";
      await job.save();
    }
  }, 5000);
}

module.exports = { initScheduler };