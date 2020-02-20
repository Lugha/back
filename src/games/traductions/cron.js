import { CronJob } from 'cron';

export default new CronJob('* * * * * *', () => {

}, null, true);