// @flow

import moment from "moment";

type IlmoObject = {
  [dateTime: string]: {
    dateAsWritten: string,
    songs: string,
    attendingList: Array<string>,
    notAttendingList: Array<string>,
    unknownList: Array<string>
  }
};

export function ilmoDataToObject(rawData: Array<Array<string>>): IlmoObject {
  const columns = rawData[0];
  const rawDateList = rawData.slice(1).map(row => row[0]);
  return rawDateList.reduce((acc, rawDate) => {
    if (!rawDate) return acc;

    const parsedDate = moment.utc(rawDate, "D.M.");

    return {
      ...acc,
      [parsedDate.format("YYYY-MM-DD")]: {
        dateAsWritten: rawDate
      }
    };
  }, {});
}
