// @flow

import type { CallbackQuery } from "telegram-typings";

import type { ProxyResult } from "../common/types";
import * as api from "./api";

export default async function handleCallbackQuery(
  query: CallbackQuery
): Promise<ProxyResult> {
  const { message } = query;

  if (!message) {
    console.log("Received a callback query without an attached message.", {
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
      body: "callback query not attached to a message"
    };
  } else {
    await api.answerCallbackQuery({
      callback_query_id: query.id,
      text: "Button click worked!",
      show_alert: true
    });
  }

  return {
    statusCode: 200,
    body: "OK"
  };
}
