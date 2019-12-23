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

test("parses details", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-11-05`].details).toEqual("Some details");
});

test("returns missing songs as null", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-11-12`].songs).toEqual(null);
});

test("calculates attendingList", () => {
  const result = ilmoDataToObject(fakePayload);
  const attendingList = result[`${y}-12-31`].soprano.attending
    .concat(result[`${y}-12-31`].alto.attending)
    .concat(result[`${y}-12-31`].tenor.attending)
    .concat(result[`${y}-12-31`].bass.attending);
  expect(attendingList).toEqual(["Singer 1", "Singer 2", "Singer 3"]);
});

test("calculates notAttendingList", () => {
  const result = ilmoDataToObject(fakePayload);
  const notAttendingList = result[`${y}-11-05`].soprano.notAttending
    .concat(result[`${y}-11-05`].alto.notAttending)
    .concat(result[`${y}-11-05`].tenor.notAttending)
    .concat(result[`${y}-11-05`].bass.notAttending);
  expect(notAttendingList).toEqual(["Singer 1"]);
});

test("calculates unknownList", () => {
  const result = ilmoDataToObject(fakePayload);
  const unknownList = result[`${y}-11-05`].soprano.unknown
    .concat(result[`${y}-11-05`].alto.unknown)
    .concat(result[`${y}-11-05`].tenor.unknown)
    .concat(result[`${y}-11-05`].bass.unknown);
  expect(unknownList).toEqual([
    "Singer 2",
    "Singer 4",
    "Singer 5",
    "Singer 6",
    "Singer 7"
  ]);
});
