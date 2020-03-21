export default (game, choice) => {
  const success = choice !== null && choice === game.stageData.response;

  if (success) {
    game[game.omit.player].score += 5;
  }

  return success;
};
