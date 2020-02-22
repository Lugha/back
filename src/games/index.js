import { traductionsLauncher } from "./traductions/cron";

export const startGameLaunchers = io => {
  traductionsLauncher(io);
};

/*
  CONST FOR TRADUCTIONS GAMES
*/
export const traductionWaitingList = [];
export const traductionsGames = {};