// @flow

import type { Message } from "telegram-typings";

import type { ProxyResult } from "../common/types";
import { ping } from "./messageHandlers/debug";
import { ilmonneet, ilmonneetAt } from "./messageHandlers/ilmo";
import { start, iAm } from "./messageHandlers/start";

const commandsToHandlers = new Map([ping, ilmonneetAt, ilmonneet, start, iAm]);

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

  if (message.text) {
    const text = message.text;
    const handler = getHandlerForCommand(text);
    if (handler) {
      await handler({ message, chat, text });
    }

    return {
      statusCode: 200,
      body: "OK"
    };
  }

  return {
    statusCode: 200,
    body: "Unknown message"
  };
}
