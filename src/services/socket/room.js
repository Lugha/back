import { traductionWaitingList } from "../../games/traductions";

export const initRoomSocket = socket => {
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
  });

  socket.on("SEND_TO_ROOM", (room, req) => {
    socket.to(room).emit(req);
  });
};
