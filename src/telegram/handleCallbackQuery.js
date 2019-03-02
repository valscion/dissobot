// @flow

import type { CallbackQuery } from "telegram-typings";

import type { ProxyResult } from "../common/types";
import * as api from "./api";
import { refresh } from "./callbackQueryHandlers/refresh";
import { attend } from "./callbackQueryHandlers/attend";

const commandsToHandlers = new Map([refresh, attend]);

function getHandlerForCallbackData(data: string) {
  for (const [cmd, handler] of commandsToHandlers.entries()) {
    if (data.startsWith(cmd)) {
      return handler;
    }
  }
  return null;
}

export default async function handleCallbackQuery(
  query: CallbackQuery
): Promise<ProxyResult> {
  const { data } = query;

  if (!data) {
    console.log("Received a callback query without any callback data.", {
      id: query.id,
      from: query.from
    });
    await api.answerCallbackQuery({
      callback_query_id: query.id,
      text:
        "Bot can't handle this action. Telegram sent the bot some strange info.",
      show_alert: true
    });
    return {
      // Using 2xx status code as we don't want Telegram to re-send this query.
      // We know we won't be able to handle it.
      statusCode: 200,
      body: "callback data not present in callback query"
    };
  } else {
    const handler = getHandlerForCallbackData(data);
    if (handler) {
      await handler(query);
    } else {
      await api.answerCallbackQuery({
        callback_query_id: query.id,
        text: "I don't know what to do with that action :(",
        show_alert: true
      });
    }
  }

  return {
    statusCode: 200,
    body: "OK"
  };
}
