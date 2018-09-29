// @flow

import fetch from "node-fetch";
import type {
  SendMessagePayload,
  AnswerCallbackQueryPayload,
  EditMessageTextPayload
} from "telegram-typings";

import { TELEGRAM_TOKEN } from "../common/environment";

const TELEGRAM_API_ROOT = "https://api.telegram.org/bot" + TELEGRAM_TOKEN;

export async function sendMessage(bodyJson: SendMessagePayload) {
  return await sendRequest("sendMessage", bodyJson);
}

export async function answerCallbackQuery(
  bodyJson: AnswerCallbackQueryPayload
) {
  return await sendRequest("answerCallbackQuery", bodyJson);
}

export async function editMessageText(bodyJson: EditMessageTextPayload) {
  return await sendRequest("editMessageText", bodyJson);
}

// Update this type as new API methods are added
type AvailableActions =
  | "sendMessage"
  | "answerCallbackQuery"
  | "editMessageText";

async function sendRequest(type: AvailableActions, bodyJson) {
  const url = `${TELEGRAM_API_ROOT}/${type}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "user-agent": "DissoBot v0.0.0",
        "content-type": "application/json"
      },
      body: JSON.stringify(bodyJson)
    });
    const json = await response.json();
    console.log("Response back from Telegram: " + JSON.stringify(json));
    return json;
  } catch (err) {
    console.log(`${type} send did not go so smooth: ` + JSON.stringify(err));
    return Promise.reject({ error: JSON.stringify(err) });
  }
}
