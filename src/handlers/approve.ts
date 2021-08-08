import { Composer } from "grammy";

const composer = new Composer();

export default composer;

composer.callbackQuery("decline", async (ctx) => {
  const msg = ctx.callbackQuery.message;
  const text = msg?.text;
  const from = text?.split("\n")[0].split("_")[1];
  const bot = text?.split("\n")[3].split(": ")[1];

  if (!msg || !text || !from || !bot) {
    return;
  }

  await ctx.editMessageText(text, {
    entities: msg.entities,
    disable_web_page_preview: true,
  });
  await ctx.reply(`Declined by ${ctx.from.first_name}.`, {
    reply_to_message_id: msg.message_id,
  });

  try {
    await ctx.api.sendMessage(from, `${bot} was declined.`);
  } catch (err) {}
});

composer.callbackQuery("approve", async (ctx) => {
  const msg = ctx.callbackQuery.message;
  const text = msg?.text;
  const from = text?.split("\n")[0].split("_")[1];
  const bot = text?.split("\n")[3].split(": ")[1];

  if (!msg || !text || !from || !bot) {
    return;
  }

  await ctx.editMessageText(text, {
    entities: msg.entities,
    disable_web_page_preview: true,
  });
  await ctx.reply(`Approved by ${ctx.from.first_name}.`, {
    reply_to_message_id: msg.message_id,
  });

  try {
    await ctx.api.sendMessage(from, `${bot} was approved.`);
  } catch (err) {}
});
