const { getRandomInt } = require("../utils/random");

const rounds = [
  {
    sentence: 'How are you today ?',
    traductions: [
      'Il pleut aujourd\'hui ?',
      '*Comment allez-vous aujourd\'hui ?',
      'La glace était-elle délicieuse ?',
    ],
  },
  {
    sentence: 'Can you give me food ?',
    traductions: [
      '*Tu peux me donner à manger ?',
      'Pourquoi t\'es nul à smash ?',
      'Je serai musclé dans combien de temps ?',
      'Gateaux ?',
    ],
  },
  {
    sentence: 'What\'s the deal ?',
    traductions: [
      'C\'est quoi les bails ?',
      'T\'as un problème negro ?',
      'Quel est le problème ?',
    ],
  },
];

function sendRandomRound(socket) {
  const randomRound = getRandomInt(0, rounds.length);

  console.log('sending random sentence to mobile');
  try {
    socket.emit('getRandomRound', JSON.stringify(rounds[randomRound]));
  } catch (error) {
    console.error(`Error: Erreur emit [receiveSentence]`);
  }
  console.log('send');
}

module.exports = {
  sendRandomRound
}