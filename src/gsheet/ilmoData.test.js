// @flow

import fakePayload from "./__mocks__/fakePayload";

import { ilmoDataToObject } from "./ilmoData";

test("maps dates to ISO", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(Object.keys(result)).toContainEqual("2018-01-16");
  expect(Object.keys(result)).toContainEqual("2018-05-19");
});
