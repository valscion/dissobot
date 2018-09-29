// @flow

import moment from "moment";
import type { CallbackQuery } from "telegram-typings";

import * as api from "../api";
import { formatAttendees } from "../shared/formatters";
import { scan } from "../../common/db";
import { ILMOS_TABLE } from "../../common/environment";
import type { SingleIlmoObject } from "../../common/types";

export const refresh = [
  "REFRESH",
  async (query: CallbackQuery) => {
    const { data, message } = query;

    // There might not be an attached message if Telegram is buggy.
    // This should be an exceptional case
    if (!message) {
      return await api.answerCallbackQuery({
        callback_query_id: query.id,
        text:
          "Sorry, Telegram sent something strange to the bot when the refresh button was clicked." +
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
          "Sorry, the refresh button you clicked does not seem to work." +
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

    await api.editMessageText({
      chat_id: message.chat.id,
      message_id: message.message_id,
      text: formatAttendees(ilmo),
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Refresh",
              callback_data: `REFRESH:${ilmo.date}`
            }
          ]
        ]
      }
    });

    return await api.answerCallbackQuery({
      callback_query_id: query.id,
      text: "Ilmo data refreshed!"
    });
  }
];

async function findIlmoForDate(mom: moment$Moment) {
  const dateToSearch = mom.format("YYYY-MM-DD");
  const ilmoList = await getIlmosFromDatabase();
  return ilmoList.find(ilmo => ilmo.date === dateToSearch);
}

async function getIlmosFromDatabase(): Promise<
  $ReadOnlyArray<SingleIlmoObject>
> {
  const data = await scan({
    TableName: ILMOS_TABLE
  });
  return data.Items;
}
