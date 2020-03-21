import traductions from "./traductions";
import operations from "./operations";

import gamesNames from "@utils/gamesNames";

export default async (logger, game) => {
  // game.stageType = getRandomInt(0, 2);
  game.stageType = game.stageType === 0 ? 1 : 0;

  logger.info(`Load next stage => ${game.stageType}`);

  switch (game.stageType) {
    case gamesNames.GAME_TRADUCTIONS:
      game.stageData = await traductions;
      break;
    case gamesNames.GAME_OPERATIONS:
      game.stageData = await operations;
      break;
    default:
      game.stageData = {};
  }
};
