const express = require("express");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.listen(server);

const sentencesAndTraductions = [
  {
    sentence: 'How are you today ?',
    traductions: [
      'Il pleut aujourd\'hui ?',
      '*Comment allez-vous aujourd\'hui ?',
      'La glace était-elle délicieuse ?'
    ]
  },
  {
    sentence: 'Can you give me food ?',
    traductions: [
      '*Tu peux me donner à manger ?',
      'Pourquoi t\'es nul à smash ?',
      'Je serai musclé dans combien de temps ?'
    ]
  },
]

let i = 0;
function sendSentence() {
  console.log("sending to mobiles");
  io.sockets.emit('receiveSentence', JSON.stringify(sentencesAndTraductions[i]));
  if (i === 0) i = 1;
  else if (i === 1) i = 0;
  setTimeout(sendSentence, 5 * 1000);
}

io.on('connection', (socket) => {
  console.log('a user connected');
});

sendSentence();

server.listen(5001, () => {
  console.log("listen on 5001 ...");
});
