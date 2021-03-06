// @flow

import type { Update } from "telegram-typings";

import { TELEGRAM_URL_SECRET } from "../common/environment";
import type { APIGatewayEvent, ProxyResult } from "../common/types";

import handleMessage from "./handleMessage";
import handleCallbackQuery from "./handleCallbackQuery";

const TELEGRAM_URL = "/telegram/" + TELEGRAM_URL_SECRET;
export default async function telegramHandler(
  event: APIGatewayEvent,
  _context: empty,
  callback: (error: null | Error, result?: ProxyResult) => void
) {
  if (event.path !== TELEGRAM_URL) {
    console.log("Not a telegram path, skipping: " + event.path);
    callback(null, {
      statusCode: 404,
      body: "Not Found"
    });
    return;
  }
  if (!event.body) {
    console.error("No body for telegram request!");
    callback(null, {
      statusCode: 500,
      body: "No body for telegram request"
    });
    return;
  }

  const update: Update = JSON.parse(event.body);
  if (process.env.NODE_ENV !== "test") {
    console.log("Handling telegram update: " + JSON.stringify(update));
  }
  const { message, callback_query: callbackQuery } = update;
  if (message) {
    try {
      const result = await handleMessage(message);
      return callback(null, result);
    } catch (err) {
      return callback(err);
    }
  } else if (callbackQuery) {
    try {
      const result = await handleCallbackQuery(callbackQuery);
      return callback(null, result);
    } catch (err) {
      return callback(err);
    }
  } else {
    callback(null, {
      statusCode: 200,
      body: "No message received"
    });
  }
}
