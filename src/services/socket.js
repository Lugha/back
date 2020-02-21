import { getRandomTraductionRound } from "../games/traductions/data";

import { traductionWaitingList } from '../games/traductions';

export const socketInit = io => {
  io.on("connection", socket => {
    console.log("a user connected");

    socket.on("GET_RANDOM_ROUND", () => {
      socket.emit("GET_RANDOM_ROUND", getRandomTraductionRound());
    });

    socket.on("CREATE_ROOM", () => {
      if (!traductionWaitingList.includes(socket.id)) {
        traductionWaitingList.push(socket.id);
        console.log({ traductionWaitingList });
      }
    });

    socket.on("JOIN_ROOM", ({ name: room }) => {
      console.log({ id: socket.id, room })
      socket.join(room);
    });

    socket.on("LEAVE_ROOM", room => {
      socket.leave(room);
    });

    socket.on("SEND_TO_ROOM", (room, req) => {
      socket.to(room).emit(req);
    });
  });
};
