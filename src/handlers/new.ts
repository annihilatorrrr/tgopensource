import { Composer } from "grammy";
import { submitRequest } from "../requests";
import getInfo from "../getInfo";

const composer = new Composer();

export default composer;

const newMessage =
  "Send me your project's GitHub repository URL followed by its deploy, demo and video URLs if it has any.";
const notValidMessage =
  "The provided URL isn't valid, or it isn't a GitHub repository URL. If you think you are correct, make sure that the repository uses a license and has a description.";

composer.command("new", (ctx) => {
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
    const match = text
      ?.split(/\s/)[0]
      ?.match(/^((http|https):\/\/)?github.com\/(.+)\/(.+)$/i);
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
          info.license,
          ctx.message?.text?.split(/\s/).slice(1)
        );
      } catch (err) {
        await ctx.reply((err as Error).message);
        return;
      }

      await ctx.reply("Submitted.", {
        reply_markup: { force_reply: true },
      });
    } else {
      await ctx.reply(notValidMessage, {
        reply_markup: { force_reply: true },
      });
    }
  }
);
