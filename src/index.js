import express from "express";
import http from "http";
import socketIo from "socket.io";

import expressInit from './services/express';
import { socketInit } from "./services/socket";
import { startGameLaunchers } from "./games";

import configs from './configs';

const app = express();
expressInit(app);

const server = http.createServer(app);
const io = socketIo(server);

io.listen(server);

socketInit(io);
startGameLaunchers(io);

server.listen(configs.port, () => {
  console.log(`listen on ${configs.port} ...`);
});
