import { useRoomSocket } from './room';
import { useTraductionsSocket } from './traductions';

export const socketInit = io => {
  io.on("connection", socket => {
    console.log("a user connected");
    useRoomSocket(io, socket);
    useTraductionsSocket(io, socket);
  });
};
