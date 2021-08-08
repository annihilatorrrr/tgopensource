import { Composer, InlineKeyboard } from "grammy";

const composer = new Composer();

export default composer;

composer.command("start", async (ctx) => {
  await ctx.reply(
    `You can use me submit your Telegram project to be added to @TGOpenSource.
  
Use /new to start making a new submittion`,
    {
      reply_markup: new InlineKeyboard().url(
        "My Source Code",
        "https://github.com/rojserbest/tgtranslators"
      ),
    }
  );
});
