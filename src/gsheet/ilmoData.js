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

    let parsedDate = moment.utc(rawDate, moment.ISO_8601);
    if (!parsedDate.isValid()) {
      parsedDate = moment(rawDate, "D.M.");
    } else {
      // Hard-code Europe/Helsinki DST offset to get correct date
      parsedDate.utcOffset("+03:00");
    }

    return {
      ...acc,
      [parsedDate.format("YYYY-MM-DD")]: null
    };
  }, {});
}
