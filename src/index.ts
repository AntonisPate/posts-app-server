import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import postRouter from "./routes/post.route";
import userRouter from "./routes/user.route";
import cors from "cors";
const { socketConnection } = require("./utils/socket-io");

var socketIO = require("socket.io");
var http = require("http");

const app: Express = express();
const server = http.Server(app);
server.listen(9998);
socketConnection(server);

app.use(bodyParser.json());
app.use(cors());

app.use("/posts", postRouter);
app.use("/users", userRouter);

module.exports = app;

// app.listen(9999, () => {});
