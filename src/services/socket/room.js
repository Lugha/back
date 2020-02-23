import { traductionWaitingList } from "../../games";
import { traductionsGames } from "../../games";

export const useRoomSocket = (io, socket) => {
  socket.on("CREATE_ROOM", () => {
    if (!traductionWaitingList.includes(socket.id)) {
      traductionWaitingList.push(socket.id);
      console.log({ traductionWaitingList });
    }
  });

  socket.on("CANCEL_CREATE_ROOM", () => {
    if (traductionWaitingList.includes(socket.id)) {
      traductionWaitingList.splice(traductionWaitingList.indexOf(socket.id), 1);
      console.log({ traductionWaitingList });
    }
  });

  socket.on("JOIN_ROOM", ({ room }) => {
    console.log("join room", room);
    socket.join(room);
  });

  socket.on("LEAVE_ROOM", ({ room }) => {
    console.log("leave room", room);
    socket.leave(room);

    io.sockets
      .in(room)
      .emit("GET_END_GAME", JSON.stringify({ end: true }));
  });

  socket.on("SEND_TO_ROOM", ({ room, event }) => {
    console.log(`send ${event} to ${room}`);
    socket.to(room).emit(event);
  });
};
