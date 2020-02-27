import uuidv4 from "uuid/v4";
import { CronJob } from "cron";

import UserModel from "../../databases/users";

const traductionWaitingList = [];
const traductionsGames = {};
const traductionGameTemplate = ({
  room,
  roundsTotal = 5,
  player1,
  player2
}) => {
  return {
    room,
    active: false,
    actualRound: 1,
    roundsTotal,
    traductions: {},
    [player1]: {
      score: 0
    },
    [player2]: {
      score: 0
    }
  };
};

function createRoom(io, game) {
  io.to(traductionWaitingList[0])
    .to(traductionWaitingList[1])
    .emit("INVITATION_TO_JOIN_ROOM", room_name);
  traductionWaitingList.splice(0, 2);

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

        const { username: player1 } = await UserModel.findOne({
          socketId: traductionWaitingList[0]
        }).lean();
        const { username: player2 } = await UserModel.findOne({
          socketId: traductionWaitingList[1]
        }).lean();

        if (!player1 || !player2) {
          console.log("User not found:", { player1, player2 });
          return;
        }

        await UserModel.updateOne(
          {
            socketId: traductionWaitingList[0]
          },
          { opponent: player2 }
        );

        await UserModel.updateOne(
          {
            socketId: traductionWaitingList[1]
          },
          { opponent: player1 }
        );

        traductionsGames[room_name] = traductionGameTemplate({
          room,
          player1,
          player2
        });

        createRoom(io, traductionsGames[room_name]);
      }
    },
    null,
    true
  ).start();
};
