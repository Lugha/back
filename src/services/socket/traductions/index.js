import { diffObj } from "../../../utils/diff";

import { traductionsGames } from "../../../games";
import { getRandomTraductionRound } from "../../../games/traductions/data";

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
    const game = { ...game };

    if (!game.stageDatas[choice].success) {
      game.active = false;
      return diffObj(oldGame, game);
    }

    if (game.player1.socket === socket.id) {
      game.player1.score += 5;
    } else {
      game.player2.score += 5;
    }

    game.actualRound += 1;
    game.stagePlayedBy += 1;

    if (game.stagePlayedBy === 2 && game.actualRound <= game.roundsTotal) {
      game.stagePlayedBy = 0;
      game.stageDatas = getRandomTraductionRound();
    }

    io.sockets.in(room).emit("UPDATE_GAME", diffObj(oldGame, game));
  });
};
