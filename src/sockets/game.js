import log4js from "log4js";

import { diffObj } from "@utils/diff";

import { waitingList, activesGames } from "@games/cron";

import gameProcess from "@games/process";

const logger = log4js.getLogger("SOCKET:TRADUCTIONS");
logger.level = "debug";

export const useGamesSocket = (io, socket) => {
  socket.on("JOIN_WAITINGLIST", () => {
    logger.info(`JOIN_WAITINGLIST => ${socket.id}`);
    if (!waitingList.includes(socket.id)) {
      waitingList.push(socket.id);
      console.log({ waitingList });
    }
  });

  socket.on("LEAVE_WAITINGLIST", () => {
    logger.info(`LEAVE_WAITINGLIST => ${socket.id}`);
    if (waitingList.includes(socket.id)) {
      waitingList.splice(waitingList.indexOf(socket.id), 1);
      console.log({ waitingList });
    }
  });

  socket.on(
    "UPDATE_GAME",
    async ({ room = null, choice = null, leave = null }) => {
      logger.info(`UPDATE_GAME => ${room}`);

      if (!activesGames[room]) {
        logger.error(`Game not found => ${room}`);
        return;
      }

      const oldGame = activesGames[room];
      const game = { ...oldGame };

      game.omit = {
        player: game.player1.socket === socket.id ? "player1" : "player2"
      };

      if (leave) {
        game.active = false;
        activesGames[room] = game;
        logger.info(`Player leave game => ${socket.id}`);
      } else {
        gameProcess(game, choice);
      }

      delete game.omit;
      activesGames[room] = game;

      const diff = JSON.stringify(diffObj(oldGame, game));

      logger.info(`diff => ${diff}`);
      io.sockets.in(room).emit("UPDATE_GAME", diff);
    }
  );
};
