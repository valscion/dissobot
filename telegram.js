// @flow

import fetch from "node-fetch";

import { TELEGRAM_TOKEN } from "./environment";

const TELEGRAM_API_ROOT = "https://api.telegram.org/bot" + TELEGRAM_TOKEN;

// TODO: Improve the type of bodyJson
export async function sendMessage(bodyJson: Object) {
  const url = TELEGRAM_API_ROOT + "/sendMessage";

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
    console.log("Replying did not go so smooth: " + JSON.stringify(err));
    return Promise.reject({ error: JSON.stringify(err) });
  }
}
