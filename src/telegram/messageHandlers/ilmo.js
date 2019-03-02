// @flow

import type { Chat } from "telegram-typings";

import * as api from "../api";
import { formatAttendees } from "../shared/formatters";
import {
  refresh,
  goToIlmoSpreadsheet,
  attendRehearsals,
  unattendRehearsals,
  compactInlineKeyboards
} from "../shared/inlineKeyboards";
import { getFirstIlmo } from "../../common/db/ilmos";

export const ilmonneet = [
  "ilmonneet",
  async ({ chat }: { chat: Chat }) => {
    const firstIlmo = await getFirstIlmo();
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
          inline_keyboard: compactInlineKeyboards([
            [refresh(firstIlmo)],
            [attendRehearsals(firstIlmo)],
            [unattendRehearsals(firstIlmo)],
            [goToIlmoSpreadsheet()]
          ])
        }
      });
    }
  }
];
