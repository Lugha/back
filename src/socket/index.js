import log4js from "log4js";
import { useRoomSocket } from "./room";
import { useTraductionsSocket } from "./traductions";

const logger = log4js.getLogger("SOCKET");

export const socketInit = io => {
  io.on("connection", socket => {
    logger.info("a user connected");

    useRoomSocket(io, socket);
    useTraductionsSocket(io, socket);
  });
};
