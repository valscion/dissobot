// @flow

import type { Message } from "telegram-typings";

import type { ProxyResult } from "../common/types";
import { ping } from "./messageHandlers/debug";
import { ilmonneet } from "./messageHandlers/ilmo";

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

  if (message.text) {
    const text = message.text;
    const handler = getHandlerForCommand(text);
    if (handler) {
      await handler(chat);
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
