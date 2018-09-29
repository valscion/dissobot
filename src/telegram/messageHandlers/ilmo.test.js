// @flow

import { advanceTo } from "jest-date-mock";
import type { SingleIlmoObject } from "../../common/types";

process.env.TELEGRAM_TOKEN = "anything";
process.env.TELEGRAM_URL_SECRET = "anything";
process.env.ILMOS_TABLE = "anything";
const ilmonneet = require("./ilmo").ilmonneet;

jest.mock("../api");
jest.mock("../../common/db");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("ilmonneet", () => {
  test("ilmo sorting", async () => {
    advanceTo(new Date(2018, 8, 2, 0, 0, 0)); // 2018-09-02

    const ilmos: Array<SingleIlmoObject> = [
      {
        dateAsWritten: "la 6.10.",
        songs: null,
        attendingList: [],
        notAttendingList: [],
        unknownList: []
      },
      {
        dateAsWritten: "ti 4.9.",
        songs: null,
        attendingList: [],
        notAttendingList: [],
        unknownList: []
      },
      {
        dateAsWritten: "ti 28.8.",
        songs: null,
        attendingList: [],
        notAttendingList: [],
        unknownList: []
      }
    ];
    // $FlowFixMe
    require("../../common/db").scan.mockImplementationOnce(() => ({
      Items: ilmos
    }));

    const sendMessage = require("../api").sendMessage;
    const chat = {
      id: 123,
      type: "group"
    };
    await ilmonneet[1](chat);
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        chat_id: 123,
        text: expect.stringContaining("ti 4.9.")
      })
    );
  });

  test("ilmo date cutoff", async () => {
    advanceTo(new Date(2018, 8, 11, 12, 0, 0)); // 2018-09-11T12:00:00

    const ilmos: Array<SingleIlmoObject> = [
      {
        dateAsWritten: "ma 10.9.",
        songs: null,
        attendingList: [],
        notAttendingList: [],
        unknownList: []
      },
      {
        dateAsWritten: "ti 11.9.",
        songs: null,
        attendingList: [],
        notAttendingList: [],
        unknownList: []
      },
      {
        dateAsWritten: "ti 18.9.",
        songs: null,
        attendingList: [],
        notAttendingList: [],
        unknownList: []
      }
    ];
    // $FlowFixMe
    require("../../common/db").scan.mockImplementationOnce(() => ({
      Items: ilmos
    }));

    const sendMessage = require("../api").sendMessage;
    const chat = {
      id: 123,
      type: "group"
    };
    await ilmonneet[1](chat);
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        chat_id: 123,
        text: expect.stringContaining("ti 11.9.")
      })
    );
  });
});
