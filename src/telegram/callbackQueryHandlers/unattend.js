// @flow

import moment from "moment";
import type { CallbackQuery, User } from "telegram-typings";
import fetch from "node-fetch";

import * as api from "../api";
import { findIlmoForDate } from "../../common/db/ilmos";
import { getSingerForTelegramUser } from "../../common/db/users";
import {
  TELEGRAM_BOT_NAME,
  ILMO_SPREADSHEET_API_URL
} from "../../common/environment";
import type { SingleIlmoObject } from "../../common/types";

export const unattend = [
  "UNATTEND",
  async (query: CallbackQuery) => {
    const { data, message } = query;

    // There might not be an attached message if Telegram is buggy.
    // This should be an exceptional case
    if (!message) {
      return await api.answerCallbackQuery({
        callback_query_id: query.id,
        text:
          "Sorry, Telegram sent something strange to the bot when the unattend button was clicked." +
          "\n\n" +
          "Please tell Vesa what happened so he can look into this.",
        show_alert: true
      });
    }

    const mom = moment(data, "YYYY-MM-DD");
    // If the callback query embedded data did not have a valid date string, it could
    // mean that the callback data was invalid in the first place when message was first
    // rendered, or someone is sending us bogus data. This would most likely indicate a bug.
    if (!mom.isValid()) {
      return await api.answerCallbackQuery({
        callback_query_id: query.id,
        text:
          "Sorry, the unattend button you clicked does not seem to work." +
          "\n\n" +
          "Please tell Vesa that stuff is broken.",
        show_alert: true
      });
    }

    const ilmo = await findIlmoForDate(mom);
    // It's likely that the refreshed message refers to rehearsals that are no longer present
    // in the Treeni-ilmoke spreadsheet. Or the code is buggy.
    if (!ilmo) {
      return await api.answerCallbackQuery({
        callback_query_id: query.id,
        text: `The bot doesn't know about rehearsals for date ${mom.format(
          "D.M.YYYY"
        )}. If you think this is surprising, please tell Vesa. The bot might be broken.`,
        show_alert: true
      });
    }

    const singerName = await getSingerNameForUser(query.from);
    if (!singerName) {
      return await api.answerCallbackQuery({
        callback_query_id: query.id,
        url: `t.me/${TELEGRAM_BOT_NAME}?start=unknown-singer`
      });
    }

    const result = await gsheetUpdateAttending(singerName, ilmo);

    if (result.ok) {
      return await api.answerCallbackQuery({
        callback_query_id: query.id,
        text:
          "You have now been marked as not attending.\n\n" +
          'Wait a few minutes, and then click "Refresh" button below bot attending list message.\n\n' +
          "You should see your name removed from the list.",
        show_alert: true
      });
    } else {
      return await api.answerCallbackQuery({
        callback_query_id: query.id,
        text: result.error,
        show_alert: true
      });
    }
  }
];

async function getSingerNameForUser(user: User): Promise<null | string> {
  const found = await getSingerForTelegramUser(user);
  if (found) {
    return found.sheetName;
  }
  return null;
}

async function gsheetUpdateAttending(
  singerName: string,
  ilmo: SingleIlmoObject
): Promise<{| ok: true |} | {| ok: false, error: string |}> {
  if (!ILMO_SPREADSHEET_API_URL) {
    return {
      ok: false,
      error:
        "Internal bot error! Bot cannot connect to Treeni-ilmoke spreadsheet :("
    };
  }
  const url = ILMO_SPREADSHEET_API_URL;
  const bodyJson = {
    action: "MARK_AS_NOT_ATTENDING",
    payload: {
      singer: singerName,
      dateColumn: ilmo.dateAsWritten
    }
  };

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
    return { ok: true };
  } catch (err) {
    console.log(
      `gsheetUpdateAttending send did not go so smooth: ` + JSON.stringify(err)
    );
    return { ok: false, error: "Internal bot error! " + JSON.stringify(err) };
  }
}
