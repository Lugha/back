import { traductionWaitingList, traductionsGames } from "../games/traductions";

export const socketInit = io => {
  io.on("connection", socket => {
    console.log("a user connected");

    socket.on("END_ROUND", ({ room }) => {
      traductionsGames[room].played += 1;
    });

    socket.on("CREATE_ROOM", () => {
      if (!traductionWaitingList.includes(socket.id)) {
        traductionWaitingList.push(socket.id);
        console.log({ traductionWaitingList });
      }
    });

    socket.on("JOIN_ROOM", ({ room }) => {
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
