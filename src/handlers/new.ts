import { Composer } from "grammy";
import { submitRequest } from "../requests";
import getInfo from "../getInfo";

const composer = new Composer();

export default composer;

const newMessage = "Send me your project's GitHub repository.";
const notValidMessage = "This is not a valid GitHub repository.";

composer.command("new", (ctx) => {
  return ctx.reply(newMessage, {
    reply_markup: { force_reply: true },
  });
});

composer.callbackQuery("new", async (ctx) => {
  return ctx.reply(newMessage, {
    reply_markup: { force_reply: true },
  });
});

composer.filter(
  (ctx) => {
    const message = ctx.message?.reply_to_message;
    const text = message?.text;

    if (text && message?.from?.id == ctx.me.id) {
      if (text == newMessage || text == notValidMessage) return true;
    }

    return false;
  },
  async (ctx) => {
    const text = ctx.message?.text;
    const match = text?.match(/^((http|https):\/\/)?github.com\/(.+)\/(.+)$/);
    let info;

    if (match) {
      info = await getInfo(match);
    }

    if (match && info) {
      try {
        await submitRequest(
          ctx,
          info.name,
          info.description,
          info.url,
          info.license
        );
      } catch (err) {
        await ctx.reply((err as Error).message);
        return;
      }

      await ctx.reply("✅ Submitted.", {
        reply_markup: { force_reply: true },
      });
    } else {
      await ctx.reply(notValidMessage, {
        reply_markup: { force_reply: true },
      });
    }
  }
);
