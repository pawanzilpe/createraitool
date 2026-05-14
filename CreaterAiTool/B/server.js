const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

require("dotenv").config();

const connectDB = require("./config/db");
const chatRoutes = require("./routes/chat");
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.post("/command", (req, res) => {
  const cmd = req.body.command;

  if (cmd.includes("shutdown")) {
    exec("shutdown /s /t 0");
  }

  if (cmd.includes("open notepad")) {
    exec("notepad");
  }

  if (cmd.includes("open terminal")) {
    exec("start cmd");
  }

  res.send("Done");
});

// Routes
app.use("/api/auth", require("./routes/auth")); // ✅ FIXED
app.use("/api/users", require("./routes/user"));
app.use("/api/excel-ai", require("./routes/excel"));
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
