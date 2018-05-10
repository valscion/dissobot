// @flow

import type { Message } from "telegram-typings";

import type { ProxyResult } from "./types";
import * as telegram from "./telegram";

export default async function handleMessage(
  message: Message
): Promise<ProxyResult> {
  const { chat } = message;

  if (chat.type == "private" && message.text) {
    const text = message.text;

    if (/^\/ping$/.test(text)) {
      await telegram.sendMessage({
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