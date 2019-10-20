// @flow

import typeof {
  sendMessage as realSendMessage,
  answerCallbackQuery as realAnswerCallbackQuery,
  editMessageText as realEditMessageText
} from "../api";

export const sendMessage: realSendMessage = bodyJson => {
  console.warn("Possibly unexpected Telegram API sendMessage!", bodyJson);
  return Promise.resolve();
};
export const answerCallbackQuery: realAnswerCallbackQuery = bodyJson => {
  console.warn(
    "Possibly unexpected Telegram API answerCallbackQuery!",
    bodyJson
  );
  return Promise.resolve();
};
export const editMessageText: realEditMessageText = bodyJson => {
  console.warn("Possibly unexpected Telegram API editMessageText!", bodyJson);
  return Promise.resolve();
};
