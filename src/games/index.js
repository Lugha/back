import { traductionsLauncher } from "./traductions/cron";

export const startGameLaunchers = io => {
  traductionsLauncher(io);
};