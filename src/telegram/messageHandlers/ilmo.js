// @flow

import type { Chat } from "telegram-typings";
import moment from "moment";

import * as api from "../api";
import { formatAttendees } from "../shared/formatters";
import { refresh } from "../shared/inlineKeyboards";
import { scan } from "../../common/db";
import { ILMOS_TABLE } from "../../common/environment";
import type { SingleIlmoObject } from "../../common/types";

export const ilmonneet = [
  "ilmonneet",
  async (chat: Chat) => {
    const data = await scan({
      TableName: ILMOS_TABLE
    });
    const firstIlmo = getFirstIlmo(data.Items);
    if (!firstIlmo) {
      return await api.sendMessage({
        chat_id: chat.id,
        text:
          "There doesn't seem to be any rehearsals marked in Treeni-ilmoke spreadsheet"
      });
    } else {
      return await api.sendMessage({
        chat_id: chat.id,
        text: formatAttendees(firstIlmo),
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[refresh(firstIlmo)]]
        }
      });
    }
  }
];

function getFirstIlmo(
  ilmoList: $ReadOnlyArray<SingleIlmoObject>
): void | SingleIlmoObject {
  const sortedList = ilmoList
    .filter(ilmo =>
      moment
        .utc(ilmo.dateAsWritten, "D.M.")
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        })
        .isSameOrAfter(
          moment.utc().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        )
    )
    .sort((a, b) => {
      const mA = moment.utc(a.dateAsWritten, "D.M.");
      const mB = moment.utc(b.dateAsWritten, "D.M.");
      if (mA.isBefore(mB)) return -1;
      if (mB.isBefore(mA)) return 1;
      return 0;
    });
  return sortedList[0];
}
