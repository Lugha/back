import uuidv4 from 'uuid/v4'
import { CronJob } from "cron";

import { traductionWaitingList, traductionsGames } from "..";

const initGameData = {
  needNextRound: 0,
  active: true,
  leaveRoom: 0,
}

export const traductionsLauncher = io => {
  new CronJob(
    "* * * * * *",
    () => {
      const room_name = "room-" + uuidv4()
      if (traductionWaitingList.length >= 2) {
        console.log("launch game");
        io.to(traductionWaitingList[0])
          .to(traductionWaitingList[1])
          .emit("CREATE_ROOM", room_name);
        traductionWaitingList.splice(0, 2);
        traductionsGames[room_name] = initGameData;
        console.log({ traductionsGames });
      }
    },
    null,
    true
  ).start();
};
