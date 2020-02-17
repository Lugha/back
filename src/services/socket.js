const { getRandomTraductionRound } = require("../games/traductions");

module.exports = (io) => {
  io.on('connection', socket => {
    console.log('a user connected');

    socket.on('GET_RANDOM_ROUND', () => {
      console.log("GET_RANDOM_ROUND");
      socket.emit('GET_RANDOM_ROUND', getRandomTraductionRound());
    });

    socket.on('joinRoom', room => {
      socket.join(room);
    });

    socket.on('sendToRoom', (room, req) => {
      socket.to(room).emit(req);
    });
  });
};
