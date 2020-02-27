import uuidv4 from "uuid/v4";
import { CronJob } from "cron";

import traductionModel from "../../databases/traductions";

export const traductionWaitingList = [];
export const traductionsGames = {};
const traductionGameTemplate = ({
  room,
  roundsTotal = 1,
  stageData = {},
  socket1,
  socket2
}) => {
  return {
    room,
    active: true,
    actualRound: 1,
    roundsTotal,
    waitingNextStage: 0,
    stageData,
    stageFailed: false,
    player1: {
      socket: socket1,
      score: 0
    },
    player2: {
      socket: socket2,
      score: 0
    }
  };
};

function createRoom(io, game) {
  io.to(traductionWaitingList[0])
    .to(traductionWaitingList[1])
    .emit("UPDATE_GAME", JSON.stringify(game));
}

export const traductionsLauncher = io => {
  new CronJob(
    "* * * * * *",
    async () => {
      if (traductionWaitingList.length >= 2) {
        console.log("launch game");
        const room = "room-" + uuidv4();

        const stageData = await new Promise((resolve, reject) => {
          traductionModel.findOneRandom((err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        });

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
