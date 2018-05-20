// @flow

import type { APIGatewayEvent, ProxyResult } from "../common/types";

import { ilmoDataToObject } from "./ilmoData";
import { put } from "../common/db";
import { ILMOS_TABLE } from "../common/environment";

export default async function updateSpreadsheetHandler(
  event: APIGatewayEvent,
  _context: empty,
  callback: (error: null | Error, result?: ProxyResult) => void
) {
  const { body } = event;
  if (body) {
    const jsonData = JSON.parse(body);
    const ilmos = ilmoDataToObject(jsonData);
    for (const date of Object.keys(ilmos)) {
      const ilmo = ilmos[date];
      await put({
        TableName: ILMOS_TABLE,
        Item: {
          date,
          dateAsWritten: ilmo.dateAsWritten,
          songs: ilmo.songs,
          attendingList: ilmo.attendingList,
          notAttendingList: ilmo.notAttendingList,
          unknownList: ilmo.unknownList
        }
      });
    }
  }

  callback(null, {
    statusCode: 200,
    body: "OK"
  });
}
