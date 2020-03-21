export default (game, choice) => {
  const success = choice !== null && game.stageData.traductions[choice].success;

  if (success) {
    game[game.omit.player].score += 5;
  }

  return success;
};
