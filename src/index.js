const express = require('express');

const {port} = require('./configs');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.listen(server);

require('./services/socket')(io);

server.listen(port, () => {
  console.log(`listen on ${port} ...`);
});
