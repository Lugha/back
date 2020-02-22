import { CronJob } from "cron";

import { traductionWaitingList, traductionsGames } from "..";

const initGameData = {
  needNextRound: 0,
  active: true,
}

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
        traductionsGames["game"] = initGameData;
        console.log({ traductionsGames });
      }
    },
    null,
    true
  ).start();
};
