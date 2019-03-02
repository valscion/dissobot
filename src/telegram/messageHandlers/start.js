// @flow

import type { Chat } from "telegram-typings";
import * as api from "../api";
import { getFirstIlmo } from "../../common/db/ilmos";

export const start = [
  "start",
  async (chat: Chat, _text: string) => {
    const ilmo = await getFirstIlmo();
    if (!ilmo) {
      return await api.sendMessage({
        chat_id: chat.id,
        text:
          "Hi, nice to meet you!\n\nUnfortunately, I'm a bit lost right now. To my knowledge, " +
          "there are no upcoming rehearsals happening, so I'm a bit useless right now 😔.\n\n" +
          "Maybe the Treeni-ilmoke spreadsheet does not have any upcoming rehearsals?"
      });
    }
    const possibleNames = ilmo.attendingList
      .concat(ilmo.notAttendingList)
      .concat(ilmo.unknownList)
      .sort((a, b) => a.localeCompare(b));

    return await api.sendMessage({
      chat_id: chat.id,
      text:
        "Hi, nice to meet you! I'm not sure if I know who you are yet, though. Would you mind " +
        "telling me what you're called in Dissonanssi's Treeni-ilmoke spreadsheet?",
      reply_markup: {
        one_time_keyboard: true,
        keyboard: possibleNames.map(name => {
          return [{ text: `/i_am ${name}` }];
        })
      }
    });
  }
];

export const iAm = [
  "i_am",
  async (chat: Chat, text: string) => {
    const name = text.substring(6);
    return await api.sendMessage({
      chat_id: chat.id,
      text: `Ok, so you're "${name}". If that wasn't right, send /start and I'll ask again.`,
      reply_markup: {
        remove_keyboard: true
      }
    });
  }
];