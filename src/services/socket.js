const { getRandomTraductionRound } = require("../games/traductions");

module.exports = (io) => {
  io.on('connection', socket => {
    console.log('a user connected');

    socket.on('GET_RANDOM_ROUND', () => {
      console.log("GET_RANDOM_ROUND");
      socket.emit('GET_RANDOM_ROUND', getRandomTraductionRound());
    });

    // socket.on('JOIN_ROOM', ({ name: room }) => {
    //   console.log('join room:', room)
    //   socket.join(room);
    // });

    socket.on('LEAVE_ROOM', room => {
      socket.leave(room);
    });

    socket.on('SEND_TO_ROOM', (room, req) => {
      socket.to(room).emit(req);
    });
  });
};
