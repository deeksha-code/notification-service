require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const connectDB = require("./db/db");
const { connectQueue } = require("./queue/producer");
const { initScheduler } = require("./services/scheduler");

const app = express();
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

connectDB();
connectQueue();

app.use("/notifications", require("./routes/notificationRoutes"));

initScheduler();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});