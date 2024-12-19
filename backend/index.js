
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();


const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true})
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);




app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
})