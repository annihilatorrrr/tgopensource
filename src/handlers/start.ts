import { Composer, InlineKeyboard } from "grammy";

const composer = new Composer();

export default composer;

composer.command("start", async (ctx) => {
  await ctx.reply(
    `👋 <i>Hello!</i>
  
You can use me <b>submit your Telegram project to be added to <i>@TGOpenSource</></>.
  
👨‍💻 Use /new or the button below to <b>make a new submittion</>.`,
    {
      parse_mode: "HTML",
      reply_markup: new InlineKeyboard()
        .text("📚 New request", "new")
        .row()
        .url("⚒ My source code", "https://github.com/rojserbest/tgtranslators"),
    }
  );
});
