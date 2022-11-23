import { Socket } from "socket.io";

let io: Socket;
exports.socketConnection = (server: any) => {
  io = require("socket.io")(server, {
    cors: "*",
  });
  io.on("connection", (socket: any) => {
    console.log("connected");
  });
};

exports.updatePosts = () => {
  io.emit("update-posts");
};
