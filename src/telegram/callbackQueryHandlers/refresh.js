// @flow

import type { CallbackQuery } from "telegram-typings";

import * as api from "../api";

export const refresh = [
  "REFRESH",
  async (query: CallbackQuery) => {
    await api.answerCallbackQuery({
      callback_query_id: query.id,
      text: "Button click worked!",
      show_alert: true
    });
  }
];
