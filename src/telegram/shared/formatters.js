// @flow

import escapeHtml from "escape-html";

import type { SingleIlmoObject } from "../../common/types";

export function formatAttendees(ilmo: SingleIlmoObject) {
  let str = header(ilmo);
  str += `\n\n`;
  str += `<i>${ilmo.attendingList.length} coming, ${
    ilmo.notAttendingList.length
  } not coming, ${ilmo.unknownList.length} have not answered yet.</i>`;
  str += `\n`;
  str += `<i>Attendees are:</i>`;
  str += `\n`;
  const attendeeList = ilmo.attendingList.join("\n- ").trim();
  str += "- " + escapeHtml(attendeeList || "No attendees yet");
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
