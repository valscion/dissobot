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

  str += `\n\n<b>Soprano</b> <i>(${formatAttendingCount(soprano)})</i>`;
  str += formatVocalRangeAttendees(soprano);

  str += `\n\n<b>Alto</b> <i>(${formatAttendingCount(alto)})</i>`;
  str += formatVocalRangeAttendees(alto);

  str += `\n\n<b>Tenor</b> <i>(${formatAttendingCount(tenor)})</i>`;
  str += formatVocalRangeAttendees(tenor);

  str += `\n\n<b>Bass</b> <i>(${formatAttendingCount(bass)})</i>`;
  str += formatVocalRangeAttendees(bass);
  return str;
}

function formatAttendingCount({ attending, notAttending, unknown }) {
  const answerCount = attending.length + notAttending.length;
  return `${attending.length}/${answerCount} coming, ${unknown.length} unknown`;
}

function formatVocalRangeAttendees({ attending, notAttending, unknown }) {
  const attendingStr = escapeHtml(attending.join("\n- ").trim());
  const notAttendingStr = notAttending
    .map(name => `<s>${escapeHtml(name)}</s>`)
    .join("\n- ")
    .trim();
  const unknownStr = unknown
    .map(name => `?? ${escapeHtml(name)}`)
    .join("\n- ")
    .trim();

  let str = "";
  if (attendingStr) str += `\n- ${attendingStr}`;
  if (notAttendingStr) str += `\n- ${notAttendingStr}`;
  if (unknownStr) str += `\n- ${unknownStr}`;
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
