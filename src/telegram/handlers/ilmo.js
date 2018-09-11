// @flow

import type { Chat } from "telegram-typings";
import escapeHtml from "escape-html";
import moment from "moment";

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
        parse_mode: "HTML"
      });
    }
  }
];

function getFirstIlmo(
  ilmoList: $ReadOnlyArray<SingleIlmoObject>
): void | SingleIlmoObject {
  const sortedList = ilmoList
    .filter(ilmo =>
      moment.utc(ilmo.dateAsWritten, "D.M.").isAfter(
        moment()
          .subtract("1 day")
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
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

function formatAttendees(ilmo: SingleIlmoObject) {
  let str = header(ilmo);
  str += `\n\n`;
  str += `<i>Attending:</i>`;
  str += `\n`;
  const attendeeList = ilmo.attendingList.join("\n- ").trim();
  str += "- " + escapeHtml(attendeeList || "No attendees yet");
  str += `\n\n`;
  const notAttendeeList = ilmo.notAttendingList.join("\n- ").trim();
  str += `<i>Not attending:</i>`;
  str += `\n`;
  str +=
    "- " +
    escapeHtml(notAttendeeList || "Nobody has said they're not attending");
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
