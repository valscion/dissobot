// @flow

import gsheetHandler from "../gsheet/handler";

import type { APIGatewayEvent } from "../common/types";
import { getIlmosFromDatabase } from "../common/db/ilmos";

test("gsheet POST -> /ilmonneet", async () => {
  await lambdaCall(gsheetHandler, [
    ["", "", "", "Soprano", "", "Alto", "", "Tenor", "Bass", ""],
    [
      "Pvm",
      "Biisit",
      "Tulossa (x)",
      "Singer 1",
      "Singer 2",
      "Singer 3",
      "Singer 4",
      "Singer 5",
      "Singer 6",
      "Singer 7"
    ],
    [
      "ti 5.11.",
      "Song names here",
      "1\nSinger 3",
      "- [bot]",
      "",
      "x",
      "",
      "",
      "",
      ""
    ]
  ]);

  const persistedIlmos = await getIlmosFromDatabase();
  expect(persistedIlmos).toMatchInlineSnapshot(`
    Array [
      Object {
        "attendingList": Array [
          "Singer 3",
        ],
        "date": "2019-11-05",
        "dateAsWritten": "ti 5.11.",
        "notAttendingList": Array [
          "Singer 1",
        ],
        "songs": "Song names here",
        "unknownList": Array [
          "Singer 2",
          "Singer 4",
          "Singer 5",
          "Singer 6",
          "Singer 7",
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
