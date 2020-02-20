import { getRandomTraductionRound } from "../games/traductions/data";

import { traductionWaitingList } from '../games/traductions';

export const socketInit = io => {
  io.on("connection", socket => {
    console.log("a user connected");

    socket.on("GET_RANDOM_ROUND", () => {
      socket.emit("GET_RANDOM_ROUND", getRandomTraductionRound());
    });

    socket.on("JOIN_TRADUCTIONS_LIST", ({ pseudo }) => {
      if (!traductionWaitingList.includes(pseudo)) {
        traductionWaitingList.push(pseudo);
      }
    });

    socket.on("LEAVE_TRADUCTIONS_LIST", ({ pseudo }) => {
      traductionWaitingList.splice(traductionWaitingList.indexOf(pseudo), 1);
    });

    socket.on("JOIN_ROOM", ({ name: room }) => {
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
