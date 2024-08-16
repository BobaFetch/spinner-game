const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

const params = {
  oldPick: [],
  name: "Wheel of Misfortune",
  picked: 100000,
  rotation: 0,
};
io.on("connection", (socket) => {
  io.emit("init", params);
  console.log("a user has connected", params);

  socket.on("spin", (data) => {
    console.log("spinning");
    params.oldPick.push(data.picked);
    params.rotation = data.rotation;
    params.picked = data.picked;
    io.emit("spin", params);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, "192.168.8.2", () => {
  console.log("server running on port 3000");
});
