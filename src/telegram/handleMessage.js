// @flow

import type { Message } from "telegram-typings";

import type { ProxyResult } from "../common/types";
import * as api from "./api";

export default async function handleMessage(
  message: Message
): Promise<ProxyResult> {
  const { chat } = message;

  if (chat.type == "private" && message.text) {
    const text = message.text;

    if (/^\/ping$/.test(text)) {
      await api.sendMessage({
        chat_id: chat.id,
        text: "PONG"
      });
    }

    return {
      statusCode: 200,
      body: "OK"
    };
  }

  return {
    statusCode: 404,
    body: "Unknown message"
  };
}
