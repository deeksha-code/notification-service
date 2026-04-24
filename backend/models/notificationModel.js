const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: String,
  message: String,
  scheduleAt: Date,
  status: { type: String, default: "pending" },
  retries: { type: Number, default: 0 }
});

module.exports = mongoose.model("Notification", schema);