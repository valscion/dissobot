// @flow

import type { Message } from "telegram-typings";

import type {
  ProxyResult,
  IlmoObject,
  SingleIlmoObject
} from "../common/types";
import { scan } from "../common/db";
import { ILMOS_TABLE } from "../common/environment";
import * as api from "./api";

export default async function handleMessage(
  message: Message
): Promise<ProxyResult> {
  const { chat } = message;

  if (chat.type == "private" && message.text) {
    const text = message.text;

    if (/^\/ping$/.test(text)) {
      await api.sendMessage({
        chat_id: chat.id,
        text: "PONG"
      });
    }

    if (text.startsWith("/ilmonneet")) {
      const data = await scan({
        TableName: ILMOS_TABLE
      });
      const items: Array<SingleIlmoObject> = data.items;
      await api.sendMessage({
        chat_id: chat.id,
        text: items[0].attendingList.join("\n")
      });
    }

    return {
      statusCode: 200,
      body: "OK"
    };
  }

  return {
    statusCode: 404,
    body: "Unknown message"
  };
}
