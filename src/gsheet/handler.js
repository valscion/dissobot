// @flow

import type { APIGatewayEvent, ProxyResult } from "../common/types";

import { getInfo } from "./spreadsheet";

export default async function updateSpreadsheetHandler(
  event: APIGatewayEvent,
  _context: empty,
  callback: (error: null | Error, result?: ProxyResult) => void
) {
  const info = await getInfo();
  console.log({
    title: info.title,
    sheets: info.worksheets.map(sh => sh.title).join(", ")
  });

  callback(null, {
    statusCode: 200,
    body: "OK"
  });
}
