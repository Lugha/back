import { traductionsLauncher, traductionsGame } from "./traductions/cron";

export const startGameCrons = io => {
  traductionsLauncher(io);
  traductionsGame(io);
};
