const { getRandomInt } = require("../utils/random");

const rounds = [
  {
    sentence: 'How are you today ?',
    traductions: [
      { text: 'Il pleut aujourd\'hui ?', success: false },
      { text: 'Comment allez-vous aujourd\'hui ?', success: true },
      { text: 'La glace était-elle délicieuse ?', success: false },
    ],
  },
  {
    sentence: 'Can you give me food ?',
    traductions: [
      { text: 'Tu peux me donner à manger ?', success: true },
      { text: 'Pourquoi t\'es nul à smash ?', success: false },
      { text: 'Je serai musclé dans combien de temps ?', success: false },
    ],
  },
  {
    sentence: 'What\'s the deal ?',
    traductions: [
      { text: 'C\'est quoi les bails ?', success: false },
      { text: 'T\'as un problème negro ?', success: false },
      { text: 'Quel est le problème ?', success: true },
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