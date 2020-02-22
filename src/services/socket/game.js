import { traductionsGames } from "../../games";

import { getRandomTraductionRound } from "../../games/traductions/data";

export const useGameSocket = (io, socket) => {
  socket.on("GET_NEXT_ROUND", ({ room, success }) => {
    console.log("GET_NEXT_ROUND");
    const game = traductionsGames[room];
    if (game) {
      console.log("game before:", game);
      if (!success) {
        game.active = false;
      }
      game.needNextRound += 1;
      if (game.needNextRound === 2) {
        if (game.active) {
          io.sockets
            .in(room)
            .emit("GET_RANDOM_ROUND", getRandomTraductionRound());
        } else {
          console.log('GET END GAME')
          io.sockets
            .in(room)
            .emit("GET_END_GAME", JSON.stringify({end: true}));
            game.active = true;
        }
        game.needNextRound = 0;
      }
      console.log("game after:", game);
    } else {
      console.log("Game not found");
    }
  });
};
