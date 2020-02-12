const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.listen(server);

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(5001, () => {
  console.log('listen on 5001 ...');
});
