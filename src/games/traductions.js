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

function getRandomTraductionRound(socket) {
  const randomRound = getRandomInt(0, rounds.length);
  return JSON.stringify(rounds[randomRound]);
}

module.exports = {
  getRandomTraductionRound
}