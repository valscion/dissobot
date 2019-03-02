// @flow

import type { APIGatewayEvent, ProxyResult } from "../common/types";

import { ilmoDataToObject } from "./ilmoData";
import { saveIlmo, getIlmosFromDatabase, deleteIlmo } from "../common/db/ilmos";

export default async function updateSpreadsheetHandler(
  event: APIGatewayEvent,
  _context: empty,
  callback: (error: null | Error, result?: ProxyResult) => void
) {
  const { body } = event;
  if (body) {
    const jsonData = JSON.parse(body);
    const ilmos = ilmoDataToObject(jsonData);

    const persistedIlmos = await getIlmosFromDatabase();

    for (const date of Object.keys(ilmos)) {
      const ilmo = ilmos[date];
      await saveIlmo(ilmo);
    }

    const deletedIlmos = persistedIlmos.filter(ilmo => !ilmos[ilmo.date]);
    for (const ilmo of deletedIlmos) {
      await deleteIlmo(ilmo);
    }
  }

  callback(null, {
    statusCode: 200,
    body: "OK"
  });
}
