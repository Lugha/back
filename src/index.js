import express from "express";
import http from "http";
import socketIo from "socket.io";

import expressInit from "./services/express";
import { socketInit } from "./services/socket";
import { startGameLaunchers } from "./games";

import db from "./services/mongo";

import configs from "./configs";

const app = express();
expressInit(app);

const server = http.createServer(app);
const io = socketIo(server);

io.listen(server);

socketInit(io);
startGameLaunchers(io);

async function start() {
  try {
    await db.connect();
    console.log(`listen on ${configs.port} ...`);
  } catch (err) {
    console.log({ err });
    setTimeout(start, 3000);
  }
}

server.listen(configs.port, start);
