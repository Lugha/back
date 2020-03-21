import randomData from "./random";

export default async (logger, game) => {
  if (game.waitingNextStage === 2 && game.active) {
    game.waitingNextStage = 0;
    await randomData(logger, game);
  }
};
