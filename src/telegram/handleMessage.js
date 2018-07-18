// @flow

import type { Message } from "telegram-typings";

import type { ProxyResult } from "../common/types";
import * as api from "./api";
import { ping } from "./handlers/debug";
import { ilmonneet } from "./handlers/ilmo";

const commandsToHandlers = new Map([ping, ilmonneet]);

function getHandlerForCommand(text) {
  for (const [cmd, handler] of commandsToHandlers.entries()) {
    if (text.startsWith(`/${cmd}`)) {
      return handler;
    }
  }
  return null;
}

export default async function handleMessage(
  message: Message
): Promise<ProxyResult> {
  const { chat } = message;

  if (chat.type === "private" && message.text) {
    const text = message.text;
    const handler = getHandlerForCommand(text);
    if (handler) {
      await handler(chat);
    } else {
      await api.sendMessage({
        chat_id: chat.id,
        text: `Sorry, I don't know that command.`
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
