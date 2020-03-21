import uuidv4 from "uuid/v4";
import { CronJob } from "cron";
import log4js from "log4js";

import gameTemplate from "./template";
import randomData from "@games/process/data/random";

export const waitingList = [];
export const activesGames = {};

const logger = log4js.getLogger("CRONS:TRADUCTIONS");
logger.level = "debug";

function createRoom(io, game) {
  logger.info(`create room`);
  io.to(waitingList[0])
    .to(waitingList[1])
    .emit("UPDATE_GAME", JSON.stringify(game));
}

export default io => {
  new CronJob(
    "* * * * * *",
    async () => {
      if (waitingList.length >= 2) {
        logger.info(`create new game from 2 players`);

        const room = "room-" + uuidv4();
        activesGames[room] = gameTemplate({
          room,
          socket1: waitingList[0],
          socket2: waitingList[1]
        });

        await randomData(logger, activesGames[room]);

        createRoom(io, activesGames[room]);
        logger.info(activesGames[room]);
        waitingList.splice(0, 2);
      }
    },
    null,
    true
  ).start();
};
