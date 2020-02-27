import uuidv4 from "uuid/v4";
import { CronJob } from "cron";

const traductionWaitingList = [];
const traductionsGames = {};
const traductionGameTemplate = ({
  room,
  roundsTotal = 5,
  socket1,
  socket2
}) => {
  return {
    room,
    active: false,
    actualRound: 1,
    roundsTotal,
    stagePlayedBy: 0,
    stageDatas: {},
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

        traductionsGames[room_name] = traductionGameTemplate({
          room,
          socket1: traductionWaitingList[0],
          socket2: traductionWaitingList[1]
        });

        createRoom(io, traductionsGames[room_name]);
      }
    },
    null,
    true
  ).start();
};
