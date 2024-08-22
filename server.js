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
  prizeIndex: 0,
  rotation: 0,
};
io.on("connection", (socket) => {
  io.emit("init", params);
  console.log("a user has connected", params);

  socket.on("spin", (data) => {
    console.log("spinning: ", data);
    params.oldPick.push(data.picked);
    params.rotation = data.rotation;
    params.picked = data.picked;
    params.prizeIndex = data.prizeIndex;
    io.emit("spin", params);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(5175, "192.168.11.40", () => {
  console.log("server running on port 5175");
});
