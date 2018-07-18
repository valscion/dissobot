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
      return await api.sendMessage({
        chat_id: chat.id,
        text: formatAttendees(firstIlmo),
        parse_mode: "HTML"
      });
    }
  }
];

function formatAttendees(ilmo: SingleIlmoObject) {
  let str = header(ilmo);
  str += `\n\n`;
  str += `<i>Attending:</i>`;
  str += `\n\n`;
  str +=
    "- " + escapeHtml(ilmo.attendingList.join("\n- ")) || "No attendees yet";
  str += `<i>Not attending:</i>`;
  str += `\n\n`;
  str +=
    "- " + escapeHtml(ilmo.notAttendingList.join("\n- ")) ||
    "Nobody has said they're not attending";
  return str;
}

function header(ilmo: SingleIlmoObject) {
  let str = "";
  str += `<b>${escapeHtml(ilmo.dateAsWritten)}</b>`;
  str += `\n\n`;
  str += songs(ilmo);
  return str;
}

function songs(ilmo: SingleIlmoObject) {
  const ilmoSongs = (ilmo.songs && ilmo.songs.trim()) || "";
  let str = "";
  if (ilmoSongs.length > 0) {
    str += `Songs:\n${escapeHtml(ilmoSongs)}`;
  } else {
    str += `Songs not yet input`;
  }
  return str;
}
