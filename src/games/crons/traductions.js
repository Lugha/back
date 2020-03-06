import uuidv4 from "uuid/v4";
import { CronJob } from "cron";
import log4js from "log4js";

import traductionModel from "../../databases/traductions";

const logger = log4js.getLogger("CRONS:TRADUCTIONS");
logger.level = "debug";

export const traductionWaitingList = [];
export const traductionsGames = {};
const traductionGameTemplate = ({
  room,
  roundTotal = 3,
  stageTotal = 5,
  stageData = {},
  socket1,
  socket2
}) => {
  return {
    room,
    active: true,
    actualStage: 1,
    actualRound: 1,
    roundTotal,
    waitingNextStage: 0,
    stageData,
    stageFailed: false,
    player1: {
      socket: socket1,
      stageSubmited: false
    },
    player2: {
      socket: socket2,
      stageSubmited: false
    }
  };
};

function createRoom(io, game) {
  logger.info(`create room => ${game}`);
  io.to(traductionWaitingList[0])
    .to(traductionWaitingList[1])
    .emit("UPDATE_GAME", JSON.stringify(game));
}

export const traductionsLauncher = io => {
  new CronJob(
    "* * * * * *",
    async () => {
      if (traductionWaitingList.length >= 2) {
        logger.info(`create new game from 2 players`);

        const room = "room-" + uuidv4();

        let stageData;

        try {
          stageData = await new Promise((resolve, reject) => {
            traductionModel.findOneRandom((err, result) => {
              if (err) {
                reject(err);
              }
              resolve(result);
            });
          });
        } catch (err) {
          logger.fatal("Error when set traductions datas");
        }

        traductionsGames[room] = traductionGameTemplate({
          room,
          stageData,
          socket1: traductionWaitingList[0],
          socket2: traductionWaitingList[1]
        });

        createRoom(io, traductionsGames[room]);
        traductionWaitingList.splice(0, 2);
      }
    },
    null,
    true
  ).start();
};
