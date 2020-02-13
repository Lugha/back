const express = require("express");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.listen(server)

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
      'Je serai musclé dans combien de temps ?',
      'Gateaux ?'
    ]
  },
  {
    sentence: 'What\'s the deal ?',
    traductions: [
      'C\'est quoi les bails ?',
      'T\'as un problème negro ?',
      'Quel est le problème ?',
    ]
  },
]

function sendSentence(socket) {
  console.log("sending to mobiles");
  try {
    socket.emit('receiveSentence', JSON.stringify(sentencesAndTraductions));
  } catch (error) {
    console.error(`Error: Erreur emit [receiveSentence]`);
  }
  console.log("send");
}

io.on('connection', (socket) => {
  console.log('a user connected');
  sendSentence(socket)
});

server.listen(5001, () => {
  console.log("listen on 5001 ...");
});
