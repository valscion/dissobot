// @flow

import type { Chat } from "telegram-typings";
import * as api from "../api";

export const ping = [
  "ping",
  async ({ chat }: { chat: Chat }) => {
    await api.sendMessage({
      chat_id: chat.id,
      text: "PONG"
    });
  }
];
