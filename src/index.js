import express from "express";
import http from "http";
import socket from "socket.io";

import expressInit from './services/express';
import { socketInit } from "./services/socket";
import { startGameCrons } from "./games";

import configs from './configs';

const app = express();
expressInit(app);

const server = http.createServer(app);
const io = socket(server);

io.listen(server);

socketInit(io);
startGameCrons();

server.listen(configs.port, () => {
  console.log(`listen on ${configs.port} ...`);
});
