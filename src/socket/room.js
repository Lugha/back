export const useRoomSocket = (io, socket) => {
  socket.on("JOIN_ROOM", ({ room }) => {
    console.log("join room", room);
    socket.join(room);
  });

  socket.on("LEAVE_ROOM", ({ room }) => {
    console.log("leave room", room);
    socket.leave(room);
  });

  socket.on("SEND_TO_ROOM", ({ room, event }) => {
    console.log(`send ${event} to ${room}`);
    socket.to(room).emit(event);
  });
};
