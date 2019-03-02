// @flow

import type { User as TelegramUser } from "telegram-typings";

import { put, scan } from "../db";
import { USERS_TABLE } from "../../common/environment";
import type { IlmoUser } from "../../common/types";

export async function getSingerForTelegramUser(
  user: TelegramUser
): Promise<null | IlmoUser> {
  const users = await _getUsers();
  const foundUser = users.find(u => u.id === user.id);
  if (foundUser) {
    return foundUser;
  } else {
    return null;
  }
}

async function _getUsers(): Promise<$ReadOnlyArray<IlmoUser>> {
  const data = await scan({
    TableName: USERS_TABLE
  });
  return data.Items;
}

export async function saveTelegramUserSheetName(
  user: TelegramUser,
  sheetName: string
) {
  const data: IlmoUser = {
    id: user.id,
    sheetName: sheetName
  };
  await put({
    TableName: USERS_TABLE,
    Item: data
  });
}
