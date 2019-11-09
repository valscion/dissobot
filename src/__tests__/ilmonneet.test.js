// @flow

import { advanceTo } from "jest-date-mock";

import gsheetHandler from "../gsheet/handler";
import telegramHandler from "../telegram/handler";

import type { Update } from "telegram-typings";
import type { APIGatewayEvent, ProxyResult } from "../common/types";

import * as tgApi from "../telegram/api";

const tgSendMessage = jest
  .spyOn(tgApi, "sendMessage")
  .mockImplementation(() => Promise.resolve());

beforeEach(() => tgSendMessage.mockClear());

test("gsheet POST -> /ilmonneet", async () => {
  advanceTo(new Date(2018, 8, 2, 0, 0, 0)); // 2018-09-02

  const sheetData = md`
    |          |             |     | Soprano |     | Alto  | Tenor | Bass |     |
    | -------- | ----------- | --- | ------- | --- | ----- | ----- | ---- | --- |
    | Pvm      | Biisit      |     | One     | Two | Three | Four  | Five | Six |
    | ti 5.11. | First songs |     | x       | x   |       |       | ?    |     |
  `;
  await lambdaCall(gsheetHandler, { body: sheetData });

  const tgSendMessage = jest
    .spyOn(tgApi, "sendMessage")
    .mockImplementationOnce(() => Promise.resolve());

  const tgResult = await lambdaCall(telegramHandler, {
    body: ilmonneetCommand(),
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

    <b>Soprano</b> <i>(2)</i>
    - One
    - Two

    <b>Alto</b> <i>(0)</i>
    - No attendees yet

    <b>Tenor</b> <i>(0)</i>
    - No attendees yet

    <b>Bass</b> <i>(0)</i>
    - No attendees yet"
  `);
});

describe("gsheet POST -> /show <date>", () => {
  beforeEach(async () => {
    advanceTo(new Date(2018, 8, 2, 0, 0, 0)); // 2018-09-02
    const sheetData = md`
      |               |        |             | Soprano | Alto |      | Tenor 2 | Tenor 1 | Bass 1 | Bass 2 |
      | ------------- | ------ | ----------- | ------- | ---- | ---- | ------- | ------- | ------ | ------ |
      | Pvm           | Biisit | Tulossa (x) | SopA    | AltA | AltB | TenA    | TenB    | BasA   | BasB   |
      | 5.11. all     |        |             | x       | x    | x    | x       | x       | x      | x      |
      | 6.11. unknown |        |             |         |      |      |         |         |        |        |
      | 7.11. none    |        |             | -       | -    | -    | -       | -       | -      | -      |
    `;
    await lambdaCall(gsheetHandler, { body: sheetData });
  });

  test("all attending", async () => {
    expect(await replyTextFromShowCommand("5.11. all")).toMatchInlineSnapshot(`
      "<b>5.11. all</b>

      Songs not yet input

      <i>7 coming, 0 not coming, 0 have not answered yet.</i>
      <i>Attendees are:</i>

      <b>Soprano</b> <i>(1)</i>
      - SopA

      <b>Alto</b> <i>(2)</i>
      - AltA
      - AltB

      <b>Tenor</b> <i>(2)</i>
      - TenA
      - TenB

      <b>Bass</b> <i>(2)</i>
      - BasA
      - BasB"
    `);
  });

  test("unknown attendance for all", async () => {
    expect(await replyTextFromShowCommand("6.11. unknown"))
      .toMatchInlineSnapshot(`
      "<b>6.11. unknown</b>

      Songs not yet input

      <i>0 coming, 0 not coming, 7 have not answered yet.</i>
      <i>Attendees are:</i>

      <b>Soprano</b> <i>(0)</i>
      - No attendees yet

      <b>Alto</b> <i>(0)</i>
      - No attendees yet

      <b>Tenor</b> <i>(0)</i>
      - No attendees yet

      <b>Bass</b> <i>(0)</i>
      - No attendees yet"
    `);
  });

  test("none attending", async () => {
    expect(await replyTextFromShowCommand("7.11. none")).toMatchInlineSnapshot(`
      "<b>7.11. none</b>

      Songs not yet input

      <i>0 coming, 7 not coming, 0 have not answered yet.</i>
      <i>Attendees are:</i>

      <b>Soprano</b> <i>(0)</i>
      - No attendees yet

      <b>Alto</b> <i>(0)</i>
      - No attendees yet

      <b>Tenor</b> <i>(0)</i>
      - No attendees yet

      <b>Bass</b> <i>(0)</i>
      - No attendees yet"
    `);
  });

  test("unknown date", async () => {
    expect(
      await replyTextFromShowCommand("4.11. bad date")
    ).toMatchInlineSnapshot(
      `"I could not find an upcoming rehearsal \\"4.11. bad date\\" :("`
    );
  });
});

function ilmonneetCommand(): Update {
  return {
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
}

async function replyTextFromShowCommand(rowText: string) {
  await lambdaCall(telegramHandler, {
    body: showCommand(rowText),
    path: "/telegram/TELEGRAM_URL_SECRET"
  });
  expect(tgSendMessage).toHaveBeenCalledTimes(1);
  return tgSendMessage.mock.calls[0][0].text;
}

function showCommand(rowText: string): Update {
  return {
    update_id: 1,
    message: {
      message_id: 100,
      date: Date.now(),
      chat: {
        id: 200,
        type: "group"
      },
      text: `/show ${rowText}`
    }
  };
}

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
