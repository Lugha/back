export default (logger, game) => {
  if (game.stageFailed && game.waitingNextStage === 2) {
    game.actualRound += 1;
    game.actualStage = 1;
    if (game.actualRound === game.roundTotal) {
      game.active = false;
      logger.info(`Last round`);
    } else {
      logger.info(`Next round`);
    }
  }
};
