export default (logger, game) => {
  if (game.waitingNextStage === 2) {
    game.actualStage += 1;
    logger.info(`End stage`);
  }
};
