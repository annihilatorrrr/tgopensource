import { Context } from "grammy";
import escapeHtml from "escape-html";
import { request } from "./database";
import env from "./env";

export const submitRequest = async (
  ctx: Context,
  name: string,
  description: string,
  url: string,
  license: string
) => {
  await request(name);
  const message = await ctx.api.sendMessage(
    env.ADMINS_CHAT_ID,
    `#u_${ctx.from?.id}\n\n` +
      `<b>From:</> <a href="tg://user?id=${ctx.from?.id}">` +
      escapeHtml(ctx.from?.first_name) +
      `</>\n` +
      `<b>Name</>: ${name}\n` +
      `<b>Description:</> ${description}\n` +
      `<b>URL:</> ${url}\n` +
      `<b>License:</> ${license}`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "❌ Decline", callback_data: "decline" },
            { text: "Approve ✅", callback_data: "approve" },
          ],
        ],
      },
    }
  );
};
