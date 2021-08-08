import { Composer } from "grammy";
import env from "../env";
import { isBanned } from "../database";
import ban from "./ban";
import approve from "./approve";
import conversation from "./conversation";
import new_ from "./new";
import start from "./start";

const composer = new Composer();

export default composer;

composer.use(conversation);

composer
  .filter((ctx) => ctx.chat?.id == env.ADMINS_CHAT_ID)
  .use(ban)
  .use(approve);

composer
  .filter(async (ctx) =>
    Boolean(
      ctx.chat?.type == "private" && ctx.from && !(await isBanned(ctx.from.id))
    )
  )
  .use(new_)
  .use(start);
