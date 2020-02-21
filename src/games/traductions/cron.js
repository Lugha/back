import { CronJob } from "cron";

import { traductionWaitingList } from ".";

const initCron = io => {
  new CronJob(
    "* * * * * *",
    () => {
      if (traductionWaitingList.length >= 2) {
        console.log('launch game');
        io.to(traductionWaitingList[0])
          .to(traductionWaitingList[1])
          .emit("CREATE_ROOM", "game");
        traductionWaitingList.splice(0, 2);
      }
    },
    null,
    true
  ).start();
};

export default initCron;
