// @flow

import type { Update } from "telegram-typings";

import { TELEGRAM_URL_SECRET } from "./environment";
import type { APIGatewayEvent } from "./types";
import * as telegram from "./telegram";

const TELEGRAM_URL = "/telegram/" + TELEGRAM_URL_SECRET;
export default async function handler(
  event: APIGatewayEvent,
  _context: empty,
  callback: Function
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
      statusCode: 500
    });
    return;
  }

  const update: Update = JSON.parse(event.body);
  console.log("Handling telegram update: " + JSON.stringify(update));
  const message = update.message;
  if (message) {
    const { chat } = message;
    if (chat.type == "private") {
      try {
        await telegram.sendMessage({
          chat_id: chat.id,
          text: message.text
        });
        callback(null, {
          statusCode: 200,
          body: "OK"
        });
        return;
      } catch (err) {
        callback(err);
      }
    }
  } else {
    callback(null, {
      statusCode: 404,
      body: "No message received"
    });
  }
}
