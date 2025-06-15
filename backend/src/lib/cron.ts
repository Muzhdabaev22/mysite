import { CronJob } from "cron";
import { type AppContext } from "./ctx";
import { notifyAboutMostLikedIdeas } from "../scripts/notifyAboutMostLikedIdeas";


export const applyCron = (ctx: AppContext) => {
    new CronJob(
        '0 10 1 * *',
        () => {
           notifyAboutMostLikedIdeas(ctx).catch(console.error)
        },
        null,
        true
    )
}