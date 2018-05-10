// @flow

import type { APIGatewayEvent, ProxyResult } from "../common/types";

export default function updateSpreadsheetHandler(
  event: APIGatewayEvent,
  _context: empty,
  callback: (error: null | Error, result?: ProxyResult) => void
) {
  console.log("Called updateSpreadsheetHandler", JSON.stringify(event));

  callback(null, {
    statusCode: 200,
    body: "OK"
  });
}
