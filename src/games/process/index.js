import log4js from "log4js";

import successOrFail from "./success";
import nextStage from "./stage";
import nextRound from "./round";
import data from "./data";

const logger = log4js.getLogger("GAME_PROCESS");
logger.level = "debug";

export default async (game, choice) => {
  logger.info(`Process game`);

  successOrFail(logger, game, choice);
  nextStage(logger, game);
  nextRound(logger, game);
  data(logger, game);

  logger.info(`End Process`);
};
