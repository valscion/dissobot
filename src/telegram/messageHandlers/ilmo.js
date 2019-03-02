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
import { getFirstIlmo, getUpcomingIlmos } from "../../common/db/ilmos";

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

export const ilmonneetAt = [
  "show",
  async ({ chat, text }: { chat: Chat, text: string }) => {
    const date = text.substring("show".length + 2).trim();
    if (chat.type !== "private" && !date) {
      // List mode works only in private chat
      return;
    }
    const nextIlmos = await getUpcomingIlmos();
    if (nextIlmos.length === 0) {
      return await api.sendMessage({
        chat_id: chat.id,
        text:
          "There doesn't seem to be any upcoming rehearsals marked in Treeni-ilmoke spreadsheet",
        remove_keyboard: true
      });
    }
    if (!date) {
      return await api.sendMessage({
        chat_id: chat.id,
        text: "Which upcoming ilmolist would you like to see?",
        reply_markup: {
          one_time_keyboard: true,
          keyboard: nextIlmos.map(ilmo => {
            return [{ text: `/show ${ilmo.dateAsWritten}` }];
          })
        }
      });
    }

    const foundIlmo = nextIlmos.find(ilmo => ilmo.dateAsWritten === date);
    if (!foundIlmo) {
      return await api.sendMessage({
        chat_id: chat.id,
        text: `I could not find an upcoming rehearsal "${date}" :(`,
        remove_keyboard: true
      });
    }

    return await api.sendMessage({
      chat_id: chat.id,
      text: formatAttendees(foundIlmo),
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: compactInlineKeyboards([
          [refresh(foundIlmo)],
          [attendRehearsals(foundIlmo)],
          [unattendRehearsals(foundIlmo)],
          [goToIlmoSpreadsheet()]
        ])
      }
    });
  }
];
