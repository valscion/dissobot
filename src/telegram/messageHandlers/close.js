// @flow

import type { Chat } from "telegram-typings";
import * as api from "../api";

export const close = [
  "close",
  async ({ chat }: { chat: Chat }) => {
    return await api.sendMessage({
      chat_id: chat.id,
      text: "Closed any potentially open inline keyboard.",
      reply_markup: {
        remove_keyboard: true
      }
    });
  }
];
