import { Bot } from "grammy";
import env from "./env";
import handlers from "./handlers";

const bot = new Bot(env.BOT_TOKEN);

bot.use(handlers);

export default () => bot.start({ drop_pending_updates: true });
