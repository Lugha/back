import { traductionsLauncher } from "./crons/traductions";

export const startGameLaunchers = io => {
  traductionsLauncher(io);
};