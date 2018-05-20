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
  const singerNames = columns.filter(col => {
    if (col === "Pvm") return false;
    if (col === "Biisit") return false;
    if (col === "Tulossa (x)") return false;
    if (!col) return false;
    return true;
  });
  const singerNamesToColumns = singerNames.reduce(
    (acc, name) => ({
      ...acc,
      [name]: columns.indexOf(name)
    }),
    {}
  );

  return row => {
    const dateAsWritten = row[dateColumn];
    const parsedDate = moment.utc(dateAsWritten, "D.M.");

    return [
      parsedDate.format("YYYY-MM-DD"),
      {
        dateAsWritten,
        songs: row[songsColumn] || null,
        ...getAttendees(row, singerNamesToColumns)
      }
    ];
  };
}

function getAttendees(
  row,
  singerNamesToColumns: {
    [name: string]: number
  }
): {
  attendingList: Array<string>,
  notAttendingList: Array<string>,
  unknownList: Array<string>
} {
  const attendingList = [];
  const notAttendingList = [];
  const unknownList = [];

  for (const [name, colIdx] of Object.entries(singerNamesToColumns)) {
    const value = row[(colIdx: any)];
    switch (value.toLowerCase()[0]) {
      case "x":
        attendingList.push(name);
        break;
      case "?":
        unknownList.push(name);
        break;
      case "-":
      case undefined:
        notAttendingList.push(name);
        break;
    }
  }

  return {
    attendingList,
    notAttendingList,
    unknownList
  };
}
