// @flow

import type { Update } from "telegram-typings";

import { TELEGRAM_URL_SECRET } from "./environment";
import type { APIGatewayEvent, ProxyResult } from "./types";

import handleMessage from "./handleMessage";

const TELEGRAM_URL = "/telegram/" + TELEGRAM_URL_SECRET;
export default async function handler(
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
  console.log("Handling telegram update: " + JSON.stringify(update));
  const message = update.message;
  if (message) {
    try {
      const result = await handleMessage(message);
      return callback(null, result);
    } catch (err) {
      return callback(err);
    }
  } else {
    callback(null, {
      statusCode: 404,
      body: "No message received"
    });
  }
}
