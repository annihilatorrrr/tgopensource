import { Context } from "grammy";
import { request } from "./database";
import env from "./env";

export const submitRequest = async (
  ctx: Context,
  name: string,
  description: string,
  url: string,
  license: string,
  otherUrls: string[] | undefined
) => {
  await request(name);
  await ctx.api.sendMessage(
    env.ADMINS_CHAT_ID,
    `#u_${ctx.from?.id}\n\n` +
      `From: ${ctx.from?.first_name} [${ctx.from?.id}]\n` +
      `Name: ${name}\n` +
      `Description: ${description}\n` +
      `URL: ${url}\n` +
      `License: ${license}\n` +
      `Other URLs: ${otherUrls?.join(", ")}`,
    {
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Decline", callback_data: "decline" },
            { text: "Approve", callback_data: "approve" },
          ],
        ],
      },
    }
  );
};
