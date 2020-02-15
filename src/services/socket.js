const { getRandomRound } = require("../games/traductions");

module.exports = (io) => {
  io.on('connection', socket => {
    console.log('a user connected');

    socket.on('getRandomRound', () => {
      socket.emit('getRandomRound', getRandomRound());
    });
  });
};
