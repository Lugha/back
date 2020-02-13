const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.listen(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('receiveSentence', "test");
  socket.on('sendSentence', msg => {
    console.log("receive: ", msg);
    io.emit('receiveSentence', msg);
  });
});

server.listen(5001, () => {
  console.log('listen on 5001 ...');
});
