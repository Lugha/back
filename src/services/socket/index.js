import { initRoomSocket } from './room';

export const socketInit = io => {
  io.on("connection", socket => {
    console.log("a user connected");
    initRoomSocket(socket);
  });
};
