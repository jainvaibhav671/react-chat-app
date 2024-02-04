const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const AuthRouter = require("./routes/userRoutes");
const MessageRouter = require("./routes/messageRoutes");
const socket = require("socket.io");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/msg", MessageRouter);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on PORT: ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connect", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
