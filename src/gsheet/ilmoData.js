// @flow

import moment from "moment";

type SingleIlmoObject = {|
  dateAsWritten: string,
  songs: string | null,
  attendingList: Array<string>,
  notAttendingList: Array<string>,
  unknownList: Array<string>
|};

type IlmoObject = {
  [dateTime: string]: SingleIlmoObject
};

export function ilmoDataToObject(rawData: Array<Array<string>>): IlmoObject {
  const columns = rawData[0];
  const toSingleIlmo = makeToSingleIlmo(columns);

  return rawData.slice(1).reduce((acc, row) => {
    const [dateStr, ilmoObj] = toSingleIlmo(row);
    acc[dateStr] = ilmoObj;
    return acc;
  }, {});
}

function makeToSingleIlmo(
  columns
): (row: Array<string>) => [string, SingleIlmoObject] {
  const dateColumn = columns.indexOf("Pvm");
  const songsColumn = columns.indexOf("Biisit");

  return row => {
    const dateAsWritten = row[dateColumn];
    const parsedDate = moment.utc(dateAsWritten, "D.M.");

    return [
      parsedDate.format("YYYY-MM-DD"),
      {
        dateAsWritten,
        songs: row[songsColumn] || null,
        attendingList: [],
        notAttendingList: [],
        unknownList: []
      }
    ];
  };
}
