import { diffObj } from "../../../utils/diff";

import UserModel from "../../../databases/users";

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

  socket.on("UPDATE_GAME_TRADUCTIONS", async ({ room, choice, opponent }) => {
    console.log("UPDATE_GAME_TRADUCTIONS");

    const user = await UserModel.findOne({ socketId: socket.id }).lean();
    if (!user) {
      console.log("User not found");
      return;
    }
    if (!traductionsGames[room]) {
      console.log("Game not found");
      return;
    }

    const oldGame = traductionsGames[room];
    const game = { ...game };

    game[user.username].lastChoice = choice;
    if (!game.traductions[choice].success) {
      game.active = false;
      return diffObj(oldGame, game);
    }

    game[user.username].score += 5;
    game.actualRound += 1;

    if (game[opponent].lastChoice && game.actualRound <= game.roundsTotal) {
      game.traductions = getRandomTraductionRound();
    }

    io.sockets.in(room).emit("UPDATE_GAME", diffObj(oldGame, game));
  });
};
