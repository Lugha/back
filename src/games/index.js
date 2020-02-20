import traductionsCron from './traductions/cron';

export const startGameCrons = () => {
    traductionsCron.start();
}