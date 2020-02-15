const { sendRandomRound } = require("../games/traductions");

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');

    io.on('getRandomRound', socket => {
      sendRandomRound(socket);
    });
  });
};
