// @flow

import fakePayload from "./__mocks__/fakePayload";

import { ilmoDataToObject } from "./ilmoData";

const y = new Date().getFully();

test("maps dates to ISO", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(Object.keys(result)).toContainEqual(`${y}-01-16`);
  expect(Object.keys(result)).toContainEqual(`${y}-05-19`);
});

test("contains dates as written", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-01-16`].dateAsWritten).toEqual("ti 16.1.");
  expect(result[`${y}-05-19`].dateAsWritten).toEqual("konsertti la 19.5.");
});

test("parses song names", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-01-16`].songs).toEqual(
    "Under häggarna\nWeep, o mine eyes\nLauantai-ilta"
  );
});

test("returns missing songs as null", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-02-20`].songs).toEqual(null);
});

test("calculates attendingList", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-01-16`].attendingList).toEqual([
    "Singer A",
    "Singer B",
    "Singer C",
    "Singer F",
    "Singer G",
    "Singer H",
    "Singer K",
    "Singer N",
    "Singer R",
    "Singer S",
    "Singer T",
    "Singer U",
    "Singer X",
    "Singer Y",
    "Singer Z",
    "Singer 1",
    "Singer 2"
  ]);
});

test("calculates notAttendingList", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-01-16`].notAttendingList).toEqual([
    "Singer D",
    "Singer E",
    "Singer I",
    "Singer J",
    "Singer L",
    "Singer M",
    "Singer O",
    "Singer P",
    "Singer Q",
    "Singer V",
    "Singer W",
    "Singer 0",
    "Singer 3"
  ]);
});

test("calculates unknownList", () => {
  const result = ilmoDataToObject(fakePayload);
  expect(result[`${y}-05-19`].unknownList).toEqual([
    "Singer I",
    "Singer L",
    "Singer P",
    "Singer Q",
    "Singer W",
    "Singer X",
    "Singer 1"
  ]);
});
