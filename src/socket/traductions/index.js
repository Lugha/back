import { diffObj } from "../../utils/diff";

import {
  traductionWaitingList,
  traductionsGames
} from "../../games/crons/traductions";

import traductionModel from "../../databases/traductions";

export const useTraductionsSocket = (io, socket) => {
  socket.on("JOIN_TRADUCTIONS_WAITINGLIST", () => {
    if (!traductionWaitingList.includes(socket.id)) {
      traductionWaitingList.push(socket.id);
      console.log({ traductionWaitingList });
    }
  });

  socket.on("LEAVE_TRADUCTIONS_WAITINGLIST", () => {
    if (traductionWaitingList.includes(socket.id)) {
      traductionWaitingList.splice(traductionWaitingList.indexOf(socket.id), 1);
      console.log({ traductionWaitingList });
    }
  });

  socket.on("UPDATE_GAME_TRADUCTIONS", async ({ room, choice }) => {
    console.log("UPDATE_GAME_TRADUCTIONS");

    if (!traductionsGames[room]) {
      console.log("Game not found");
      return;
    }

    const oldGame = traductionsGames[room];
    const game = { ...oldGame };

    game.waitingNextStage += 1;

    if (!game.stageData[choice].success) {
      game.stageFailed = true;
    }

    if (game.stageFailed && game.waitingNextStage === 2) {
      game.active = false;
      return io.sockets.in(room).emit("UPDATE_GAME", diffObj(oldGame, game));
    }

    if (game.player1.socket === socket.id && game.stageData[choice].success) {
      game.player1.score += 5;
    } else if (game.stageData[choice].success) {
      game.player2.score += 5;
    }

    if (game.waitingNextStage === 2) {
      game.waitingNextStage = 0;
      game.stageData = await new Promise((resolve, reject) => {
        traductionModel.findOneRandom((err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
    }

    io.sockets.in(room).emit("UPDATE_GAME", diffObj(oldGame, game));
  });
};
