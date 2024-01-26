const express = require("express");
const path = require("path");

const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { addUser, getUsersInRoom } = require("./utils/users");
const { generateMessage } = require("./utils/messages");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("socket.id", socket.id);

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });
    if (error) {
      return callback(error);
    }
    // 이 socket이 특정 room에 들어가게 됨
    socket.join(user.room);

    socket.emit(
      "message",
      generateMessage("Admin", `${user.room}방에 오신 것을 환영합니다`)
    );
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage("", `${user.username}가 방에 참여했습니다`)
      );

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("sendMessage", () => {
    console.log("sendMessage");
  });

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
});

const port = 4000;
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
