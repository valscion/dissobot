// @flow

import type { Message, Chat } from "telegram-typings";
import * as api from "../api";
import { getFirstIlmo } from "../../common/db/ilmos";
import { saveTelegramUserSheetName } from "../../common/db/users";

export const start = [
  "start",
  async ({ chat }: { chat: Chat }) => {
    if (chat.type !== "private") {
      // Silently ignore any non-private /start commands
      return;
    }

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
    const possibleNames = ["soprano", "alto", "tenor", "bass"]
      .flatMap(vocalRange =>
        ilmo[vocalRange].attending
          .concat(ilmo[vocalRange].notAttending)
          .concat(ilmo[vocalRange].unknown)
      )
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
  async ({
    message,
    chat,
    text
  }: {
    message: Message,
    chat: Chat,
    text: string
  }) => {
    if (chat.type !== "private") {
      // Silently ignore any non-private /i_am commands
      return;
    }

    const name = text.substring(6);
    if (!name.trim()) {
      return await api.sendMessage({
        chat_id: chat.id,
        text:
          "Sorry, I didn't quite catch your name. Say /start again and I'll give you a list of names to choose from."
      });
    }

    const from = message.from;
    if (!from) {
      return await api.sendMessage({
        chat_id: chat.id,
        text:
          "Huh, Telegram did not tell me who you were. I'm afraid I can't do anything now.",
        reply_markup: {
          remove_keyboard: true
        }
      });
    }

    try {
      await saveTelegramUserSheetName(from, name);
    } catch (err) {
      return await api.sendMessage({
        chat_id: chat.id,
        text:
          "Oh no! Some kind of a horrible error happened!\n\n" +
          JSON.stringify(err),
        reply_markup: {
          remove_keyboard: true
        }
      });
    }

    return await api.sendMessage({
      chat_id: chat.id,
      text:
        `Ok, so you're "${name}". If that wasn't right, send /start and I'll ask again.\n\n` +
        "You can now try attending (or unattending) to rehearsals via this bot. You can do it here, too: Send me " +
        "/ilmonneet command and I will show you next upcoming rehearsals and the reply will contain " +
        "a button to mark attendance status.",
      reply_markup: {
        remove_keyboard: true
      }
    });
  }
];
