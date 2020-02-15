const { getRandomTraductionRound } = require("../games/traductions");

module.exports = (io) => {
  io.on('connection', socket => {
    console.log('a user connected');

    socket.on('getRandomRound', () => {
      console.log("getRandomRound");
      socket.emit('getRandomRound', getRandomTraductionRound());
    });

    socket.on('joinRoom', room => {
      socket.join(room);
    });

    socket.on('sendToRoom', (room, req) => {
      socket.to(room).emit(req);
    });
  });
};
