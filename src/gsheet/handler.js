// @flow

import type { APIGatewayEvent, ProxyResult } from "../common/types";

import { ilmoDataToObject } from "./ilmoData";

export default async function updateSpreadsheetHandler(
  event: APIGatewayEvent,
  _context: empty,
  callback: (error: null | Error, result?: ProxyResult) => void
) {
  const { body } = event;
  if (body) {
    const jsonData = JSON.parse(body);
    console.log(ilmoDataToObject(jsonData));
  }

  callback(null, {
    statusCode: 200,
    body: "OK"
  });
}
