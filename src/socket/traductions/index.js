import log4js from "log4js";

import { diffObj } from "../../utils/diff";

import {
  traductionWaitingList,
  traductionsGames
} from "../../games/crons/traductions";

import traductionModel from "../../databases/traductions";

const logger = log4js.getLogger("SOCKET:TRADUCTIONS");
logger.level = "debug";

export const useTraductionsSocket = (io, socket) => {
  socket.on("JOIN_WAITINGLIST", () => {
    logger.info(`JOIN_WAITINGLIST => ${socket.id}`);
    if (!traductionWaitingList.includes(socket.id)) {
      traductionWaitingList.push(socket.id);
      console.log({ traductionWaitingList });
    }
  });

  socket.on("LEAVE_WAITINGLIST", () => {
    logger.info(`LEAVE_WAITINGLIST => ${socket.id}`);
    if (traductionWaitingList.includes(socket.id)) {
      traductionWaitingList.splice(traductionWaitingList.indexOf(socket.id), 1);
      console.log({ traductionWaitingList });
    }
  });

  socket.on("UPDATE_GAME", async ({ room, choice }) => {
    logger.info(`UPDATE_GAME => ${room}`);

    if (!traductionsGames[room]) {
      logger.error(`Game not found => ${room}`);
      return;
    }

    const oldGame = traductionsGames[room];
    const game = { ...oldGame };

    game.waitingNextStage += 1;

    console.log({ choice });

    if (!game.stageData.traductions[choice].success) {
      game.stageFailed = true;
    }

    if (game.stageFailed && game.waitingNextStage === 2) {
      game.active = false;
      traductionsGames[room] = game;
      return io.sockets
        .in(room)
        .emit("UPDATE_GAME", JSON.stringify(diffObj(oldGame, game)));
    }

    if (
      game.player1.socket === socket.id &&
      game.stageData.traductions[choice].success
    ) {
      game.player1.score += 5;
    } else if (game.stageData.traductions[choice].success) {
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

    traductionsGames[room] = game;
    io.sockets
      .in(room)
      .emit("UPDATE_GAME", JSON.stringify(diffObj(oldGame, game)));
  });
};
