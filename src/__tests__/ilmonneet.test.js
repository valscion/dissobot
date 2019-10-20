// @flow

import { advanceTo } from "jest-date-mock";

import gsheetHandler from "../gsheet/handler";
import telegramHandler from "../telegram/handler";

import type { Update } from "telegram-typings";
import type { APIGatewayEvent, ProxyResult } from "../common/types";

import * as tgApi from "../telegram/api";

test("gsheet POST -> /ilmonneet", async () => {
  advanceTo(new Date(2018, 8, 2, 0, 0, 0)); // 2018-09-02

  const sheetData = md`
    |          |             |     | Soprano |     | Alto  | Tenor | Bass |     |
    | -------- | ----------- | --- | ------- | --- | ----- | ----- | ---- | --- |
    | Pvm      | Biisit      |     | One     | Two | Three | Four  | Five | Six |
    | ti 5.11. | First songs |     | x       | x   |       |       | ?    |     |
  `;
  await lambdaCall(gsheetHandler, { body: sheetData });

  const tgUpdate: Update = {
    update_id: 1,
    message: {
      message_id: 100,
      date: Date.now(),
      chat: {
        id: 200,
        type: "group"
      },
      text: "/ilmonneet"
    }
  };

  const tgSendMessage = jest
    .spyOn(tgApi, "sendMessage")
    .mockImplementationOnce(() => Promise.resolve());

  const tgResult = await lambdaCall(telegramHandler, {
    body: tgUpdate,
    path: "/telegram/TELEGRAM_URL_SECRET"
  });
  expect(tgResult).toMatchInlineSnapshot(`
    Object {
      "body": "OK",
      "statusCode": 200,
    }
  `);

  expect(tgSendMessage).toHaveBeenCalledTimes(1);
  expect(tgSendMessage.mock.calls[0][0]).toMatchObject({
    chat_id: 200,
    parse_mode: "HTML",
    text: expect.any(String)
  });
  expect(tgSendMessage.mock.calls[0][0].text).toMatchInlineSnapshot(`
    "<b>ti 5.11.</b>

    Songs:
    First songs

    <i>2 coming, 1 not coming, 3 have not answered yet.</i>
    <i>Attendees are:</i>
    - One
    - Two"
  `);
});

async function lambdaCall(handler, { body, path = "" }): Promise<ProxyResult> {
  const empty: any = undefined;
  let returnedError;
  let returnedResult;
  await handler(lambdaData({ body, path }), empty, (error, result) => {
    returnedError = error;
    returnedResult = result;
  });

  if (returnedError) {
    throw returnedError;
  }
  if (!returnedResult) {
    throw new Error("Handler did not return a result or an error");
  }
  return returnedResult;
}

function lambdaData({ body, path }): APIGatewayEvent {
  return ({ body: JSON.stringify(body), path }: any);
}

function md(string) {
  const { Extractor } = require("markdown-tables-to-json");
  return Extractor.extractTable(string[0].trim());
}
