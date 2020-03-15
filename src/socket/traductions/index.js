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

  socket.on(
    "UPDATE_GAME",
    async ({ room = null, choice = null, leave = null }) => {
      logger.info(`UPDATE_GAME => ${room}`);

      if (!traductionsGames[room]) {
        logger.error(`Game not found => ${room}`);
        return;
      }

      const oldGame = traductionsGames[room];
      const game = { ...oldGame };

      if (leave) {
        game.active = false;
        traductionsGames[room] = game;
        logger.info(`Player leave game => ${socket.id}`);
        return io.sockets
          .in(room)
          .emit("UPDATE_GAME", JSON.stringify(diffObj(oldGame, game)));
      }

      game.waitingNextStage += 1;
      logger.info(`waitingNextStage => ${game.waitingNextStage}`);

      const success =
        choice !== null && game.stageData.traductions[choice].success;

      // on check si un joueur a mal repondue et on termine le stage
      if (!success) {
        game.stageFailed = true;
        logger.info(`Stage failed`);
      }

      // on check si les deux ont joué et on passe au prochain stage
      if (game.waitingNextStage === 2) {
        game.actualStage += 1;
        game.endStage = true;
      }

      // on check si le stage est terminé et on passe au prochain round
      if (game.stageFailed && game.waitingNextStage === 2) {
        game.actualRound += 1;
        game.actualStage = 1;
        game.endStage = false;
        logger.info(`Next round`);
      }

      const player = game.player1.socket === socket.id ? "player1" : "player2";

      // on check si le joueur a bien repondu et on lui donne ses points
      if (success) {
        game[player].score += 5;
      }

      if (success && game.waitingNextStage === 1) {
        game.stageFailed = false;
      }

      // on check si c'était le dernier round et si oui on arrête la game
      if (game.actualRound === game.roundTotal) {
        game.active = false;
        logger.info(`Last round`);
      }

      // si tout le monde a joué on recharge des données
      if (game.waitingNextStage === 2 && game.active) {
        logger.info(`Next stage`);
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
      const diff = JSON.stringify(diffObj(oldGame, game));
      delete diff.omit;
      logger.info(`diff => ${diff}`);
      io.sockets.in(room).emit("UPDATE_GAME", diff);
    }
  );
};
