import { Composer } from "grammy";
import escapeHtml from "escape-html";

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

  await ctx.editMessageText(
    `<strike>${text}</strike>` +
      `\n\n<b>❌ Declined by ${escapeHtml(ctx.from.first_name)}.</b>`
  );

  try {
    await ctx.api.sendMessage(from, `ℹ️ ${bot} was declined.`);
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

  await ctx.reply(`<b>✅ Approved by ${escapeHtml(ctx.from.first_name)}.</b>`, {
    reply_to_message_id: msg.message_id,
  });

  try {
    await ctx.api.sendMessage(from, `ℹ️ ${bot} was approved.`);
  } catch (err) {}
});