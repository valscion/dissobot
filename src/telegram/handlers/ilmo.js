// @flow

import type { Chat } from "telegram-typings";
import * as api from "../api";
import { scan } from "../../common/db";
import { ILMOS_TABLE } from "../../common/environment";
import type { SingleIlmoObject } from "../../common/types";

export const ilmonneet = [
  "ilmonneet",
  async (chat: Chat) => {
    const data = await scan({
      TableName: ILMOS_TABLE
    });
    const items: Array<SingleIlmoObject> = data.Items;
    return await api.sendMessage({
      chat_id: chat.id,
      text: items[0].attendingList.join("\n")
    });
  }
];
