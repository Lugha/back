import log4js from "log4js";

const logger = log4js.getLogger("SOCKET:ROOM");

export const useRoomSocket = (io, socket) => {
  socket.on("JOIN_ROOM", ({ room }) => {
    logger.info(`${socket.id} => join room => ${room}`);

    socket.join(room);
  });

  socket.on("LEAVE_ROOM", ({ room }) => {
    logger.info(`${socket.id} => leave room => ${room}`);

    socket.leave(room);
  });
};
