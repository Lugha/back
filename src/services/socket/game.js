import { traductionsGames } from "../../games";

import { getRandomTraductionRound } from "../../games/traductions/data";

export const useGameSocket = (io, socket) => {
  socket.on("GET_NEXT_ROUND", ({ room }) => {
    console.log("GET_NEXT_ROUND");
    const game = traductionsGames[room];
    if (game) {
      console.log("game before:", game);

      game.needNextRound += 1;
      if (game.needNextRound === 2) {
        io.sockets
          .in(room)
          .emit("GET_RANDOM_ROUND", getRandomTraductionRound());
        game.needNextRound = 0;
      }
      console.log("game after:", game);
    } else {
      console.log("Game not found");
    }
  });
};
