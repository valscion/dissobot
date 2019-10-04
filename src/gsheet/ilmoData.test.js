// @flow

import fakePayload from "./__mocks__/fakePayload";

import { ilmoDataToObject } from "./ilmoData";

const y = new Date().getFullYear();

test("maps dates to ISO", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(Object.keys(result)).toContainEqual(`${y}-11-05`);
  expect(Object.keys(result)).toContainEqual(`${y}-11-12`);
});

test("contains dates as written", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-11-05`].dateAsWritten).toEqual("ti 5.11.");
  expect(result[`${y}-12-31`].dateAsWritten).toEqual("Konsertti ti 31.12.");
});

test("parses song names", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-11-05`].songs).toEqual(
    "Hello\nIs there anybody in there?\nIt's not like you can't hear me"
  );
});

test("returns missing songs as null", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-11-12`].songs).toEqual(null);
});

test("calculates attendingList", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-12-31`].attendingList).toEqual([
    "Singer 1",
    "Singer 2",
    "Singer 3"
  ]);
});

test("calculates notAttendingList", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-11-05`].notAttendingList).toEqual(["Singer 1"]);
});

test("calculates unknownList", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-11-05`].unknownList).toEqual([
    "Singer 2",
    "Singer 4",
    "Singer 5",
    "Singer 6",
    "Singer 7"
  ]);
});
