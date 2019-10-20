// @flow

import gsheetHandler from "../gsheet/handler";

import type { APIGatewayEvent } from "../common/types";
import { getIlmosFromDatabase } from "../common/db/ilmos";

test("gsheet POST -> /ilmonneet", async () => {
  const sheetData = md`
    |          |             |     | Soprano |     | Alto  | Tenor | Bass |     |
    | -------- | ----------- | --- | ------- | --- | ----- | ----- | ---- | --- |
    | Pvm      | Biisit      |     | One     | Two | Three | Four  | Five | Six |
    | ti 5.11. | First songs |     | x       | x   |       |       | ?    |     |
  `;
  await lambdaCall(gsheetHandler, sheetData);

  const persistedIlmos = await getIlmosFromDatabase();
  expect(persistedIlmos).toMatchInlineSnapshot(`
    Array [
      Object {
        "attendingList": Array [
          "One",
          "Two",
        ],
        "date": "2019-11-05",
        "dateAsWritten": "ti 5.11.",
        "notAttendingList": Array [
          "Five",
        ],
        "songs": "First songs",
        "unknownList": Array [
          "Three",
          "Four",
          "Six",
        ],
      },
    ]
  `);
});

async function lambdaCall(handler, body) {
  const empty: any = undefined;
  return await handler(lambdaData(body), empty, () => {});
}

function lambdaData(body): APIGatewayEvent {
  return ({ body: JSON.stringify(body) }: any);
}

function md(string) {
  const { Extractor } = require("markdown-tables-to-json");
  return Extractor.extractTable(string[0].trim());
}
