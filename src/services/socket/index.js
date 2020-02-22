import { useRoomSocket } from './room';
import { useGameSocket } from './game';

export const socketInit = io => {
  io.on("connection", socket => {
    console.log("a user connected");
    useRoomSocket(io, socket);
    useGameSocket(io, socket);
  });
};
