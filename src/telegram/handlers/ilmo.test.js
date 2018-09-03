// @flow

import type { SingleIlmoObject } from "../../common/types";

process.env.TELEGRAM_TOKEN = "anything";
process.env.TELEGRAM_URL_SECRET = "anything";
process.env.ILMOS_TABLE = "anything";
const ilmonneet = require("./ilmo").ilmonneet;

jest.mock("../api");
jest.mock("../../common/db");

describe("ilmonneet", () => {
  test("ilmo sorting", async () => {
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
});
