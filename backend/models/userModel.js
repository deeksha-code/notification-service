const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: { type: String, unique: true },
  subscription: Object
});

module.exports = mongoose.model("User", schema);