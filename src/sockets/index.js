import log4js from "log4js";
import { useRoomSocket } from "./room";
import { useGamesSocket } from "./game";

const logger = log4js.getLogger("SOCKET");
logger.level = 'debug';

export default io => {
  io.on("connection", socket => {
    logger.info("a user connected");

    useRoomSocket(io, socket);
    useGamesSocket(io, socket);
  });
};
