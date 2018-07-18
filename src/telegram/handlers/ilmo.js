// @flow

import type { Chat } from "telegram-typings";
import escapeHtml from "escape-html";

import * as api from "../api";
import { scan } from "../../common/db";
import { ILMOS_TABLE } from "../../common/environment";
import type { SingleIlmoObject } from "../../common/types";

export const ilmonneet = [
  "ilmonneet",
  async (chat: Chat) => {
    const data = await scan({
      TableName: ILMOS_TABLE
    });
    const items: Array<SingleIlmoObject> = data.Items;
    const firstIlmo = items[0];
    if (!firstIlmo) {
      return await api.sendMessage({
        chat_id: chat.id,
        text:
          "There doesn't seem to be any rehearsals marked in Treeni-ilmoke spreadsheet"
      });
    } else {
      const attendingList = firstIlmo.attendingList.join("\n");
      if (attendingList.length > 0) {
        return await api.sendMessage({
          chat_id: chat.id,
          text: firstIlmo.attendingList.join("\n")
        });
      } else {
        return await api.sendMessage({
          chat_id: chat.id,
          text: formatNoSignups(firstIlmo),
          parse_mode: "HTML"
        });
      }
    }
  }
];

function formatNoSignups(ilmo: SingleIlmoObject) {
  let str = "";
  str += `<b>${escapeHtml(ilmo.dateAsWritten)}</b>`;
  str += `\n\n`;
  str += `Nobody has signed up yet.`;

  return str;
}
