import traductions from "./traductions";
import operations from "./operations";

import gamesNames from "@utils/gamesNames";

export default (logger, game, choice) => {
  let success = null;

  game.waitingNextStage += 1;
  if (game.stageType === gamesNames.GAME_TRADUCTIONS) {
    success = traductions(game, choice);
  } else if (game.stageType === gamesNames.GAME_OPERATIONS) {
    success = operations(game, choice);
  }

  if (!success) {
    game.stageFailed = true;
    logger.info(`Stage failed`);
  } else if (success && game.waitingNextStage === 1) {
    game.stageFailed = false;
  }
  
};
