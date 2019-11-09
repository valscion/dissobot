// @flow

import escapeHtml from "escape-html";

import type { SingleIlmoObject } from "../../common/types";

export function formatAttendees(ilmo: SingleIlmoObject) {
  const attendingList = ilmo.soprano.attending
    .concat(ilmo.alto.attending)
    .concat(ilmo.tenor.attending)
    .concat(ilmo.bass.attending);
  const notAttendingList = ilmo.soprano.notAttending
    .concat(ilmo.alto.notAttending)
    .concat(ilmo.tenor.notAttending)
    .concat(ilmo.bass.notAttending);
  const unknownList = ilmo.soprano.unknown
    .concat(ilmo.alto.unknown)
    .concat(ilmo.tenor.unknown)
    .concat(ilmo.bass.unknown);
  let str = header(ilmo);
  str += `\n\n`;
  str += `<i>${attendingList.length} coming, ${notAttendingList.length} not coming, ${unknownList.length} have not answered yet.</i>`;
  str += `\n`;
  str += `<i>Attendees are:</i>`;
  str += `\n`;
  const attendeeList = attendingList.join("\n- ").trim();
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
