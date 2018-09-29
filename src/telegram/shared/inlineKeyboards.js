// @flow

import type { InlineKeyboardButton } from "telegram-typings";

import { ILMO_SPREADSHEET_URL } from "../../common/environment";
import type { SingleIlmoObject } from "../../common/types";

export function refresh(ilmo: SingleIlmoObject): InlineKeyboardButton {
  return {
    text: "Refresh",
    callback_data: `REFRESH:${ilmo.date}`
  };
}

export function goToIlmoSpreadsheet(): null | InlineKeyboardButton {
  if (!ILMO_SPREADSHEET_URL) {
    return null;
  }
  return {
    text: "Open Treeni-ilmoke",
    url: ILMO_SPREADSHEET_URL
  };
}

export function compactInlineKeyboards(
  kbs: Array<Array<InlineKeyboardButton | null>>
): Array<Array<InlineKeyboardButton>> {
  return kbs.reduce((outerAcc, kbRow) => {
    const row = kbRow.reduce((innerAcc, kb) => {
      if (kb) innerAcc.push(kb);
      return innerAcc;
    }, []);
    if (row.length > 0) outerAcc.push(row);
    return outerAcc;
  }, []);
}
