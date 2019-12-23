// @flow

import escapeHtml from "escape-html";

import type { SingleIlmoObject } from "../../common/types";

export function formatAttendees(ilmo: SingleIlmoObject) {
  const { soprano, alto, tenor, bass } = ilmo;
  const attendingCount = [soprano, alto, tenor, bass].reduce(
    (acc, next) => acc + next.attending.length,
    0
  );
  const notAttendingCount = [soprano, alto, tenor, bass].reduce(
    (acc, next) => acc + next.notAttending.length,
    0
  );
  const unknownCount = [soprano, alto, tenor, bass].reduce(
    (acc, next) => acc + next.unknown.length,
    0
  );
  let str = header(ilmo);
  str += `\n\n`;
  str += `<i>${attendingCount} coming, ${notAttendingCount} not coming, ${unknownCount} have not answered yet.</i>`;

  str += `\n\n<b>Soprano</b>`;
  str += formatVocalRangeAttendees(soprano);

  str += `\n\n<b>Alto</b>`;
  str += formatVocalRangeAttendees(alto);

  str += `\n\n<b>Tenor</b>`;
  str += formatVocalRangeAttendees(tenor);

  str += `\n\n<b>Bass</b>`;
  str += formatVocalRangeAttendees(bass);
  return str;
}

function formatVocalRangeAttendees({ attending, notAttending, unknown }) {
  const attendingStr = escapeHtml(attending.join("\n- ").trim());
  const notAttendingStr = escapeHtml(notAttending.join("\n- ").trim());
  const unknownStr = escapeHtml(unknown.join("\n- ").trim());

  let str = "";
  if (attendingStr)
    str += `\n<i>Coming (${attending.length}):</i>\n- ${attendingStr}`;
  if (notAttendingStr)
    str += `\n<i>Not coming (${notAttending.length}):</i>\n- ${notAttendingStr}`;
  if (unknownStr)
    str += `\n<i>Unknown (${unknown.length}):</i>\n- ${unknownStr}`;
  return str;
}

function header(ilmo: SingleIlmoObject) {
  let str = "";
  str += `<b>${escapeHtml(ilmo.dateAsWritten)}</b>`;
  str += `\n\n`;
  if (ilmo.details) {
    str += escapeHtml(ilmo.details);
    str += `\n\n`;
  }
  str += songs(ilmo);
  return str;
}

function songs(ilmo: SingleIlmoObject) {
  const ilmoSongs = (ilmo.songs && ilmo.songs.trim()) || "";
  let str = "";
  if (ilmoSongs.length > 0) {
    str += `<b>Songs:</b>\n${escapeHtml(ilmoSongs)}`;
  } else {
    str += `Songs not yet input`;
  }
  return str;
}
