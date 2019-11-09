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
  str += `\n`;
  str += `<i>Attendees are:</i>`;

  str += `\n\n<b>Soprano</b> <i>(${formatAttendingCount(soprano)})</i>\n- `;
  str +=
    soprano.attending.length > 0
      ? escapeHtml(soprano.attending.join("\n- ").trim())
      : "No attendees yet";

  str += `\n\n<b>Alto</b> <i>(${formatAttendingCount(alto)})</i>\n- `;
  str +=
    alto.attending.length > 0
      ? escapeHtml(alto.attending.join("\n- ").trim())
      : "No attendees yet";

  str += `\n\n<b>Tenor</b> <i>(${formatAttendingCount(tenor)})</i>\n- `;
  str +=
    tenor.attending.length > 0
      ? escapeHtml(tenor.attending.join("\n- ").trim())
      : "No attendees yet";

  str += `\n\n<b>Bass</b> <i>(${formatAttendingCount(bass)})</i>\n- `;
  str +=
    bass.attending.length > 0
      ? escapeHtml(bass.attending.join("\n- ").trim())
      : "No attendees yet";
  return str;
}

function formatAttendingCount({ attending, notAttending, unknown }) {
  const answerCount = attending.length + notAttending.length;
  return `${attending.length}/${answerCount} coming, ${unknown.length} unknown`;
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
