// @flow

import type { APIGatewayEvent, ProxyResult } from "../common/types";

import { getInfo } from "./spreadsheet";

export default async function updateSpreadsheetHandler(
  event: APIGatewayEvent,
  _context: empty,
  callback: (error: null | Error, result?: ProxyResult) => void
) {
  const { body } = event;
  if (body) {
    console.log(body);
  }

  callback(null, {
    statusCode: 200,
    body: "OK"
  });
}
