import { CronJob } from "cron";

import { traductionWaitingList, traductionsGames } from ".";
import { getRandomTraductionRound } from "./data";

export const traductionsLauncher = io => {
  new CronJob(
    "* * * * * *",
    () => {
      if (traductionWaitingList.length >= 2) {
        console.log("launch game");
        io.to(traductionWaitingList[0])
          .to(traductionWaitingList[1])
          .emit("CREATE_ROOM", "game");
        traductionWaitingList.splice(0, 2);
        traductionsGames.push({
          room: "game",
          played: 2
        });
      }
    },
    null,
    true
  ).start();
};

export const traductionsGame = io => {
  new CronJob("* * * * * *", () => {
    if (traductionsGames.length > 0) {
      for (const game of traductionsGames) {
        if (game.played === 2) {
          console.log("push round");
          game.played = 0;
          io.sockets.in(game.room).emit("GET_RANDOM_ROUND", getRandomTraductionRound());
        }
      }
    }
  }).start();
};
