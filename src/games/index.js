import traductionsCron from "./traductions/cron";

export const startGameCrons = io => {
  traductionsCron(io);
};
