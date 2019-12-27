// @flow

import moment from "moment";

import type {
  IlmoObject,
  SingleIlmoObject,
  AttendanceMap
} from "../common/types";

export function ilmoDataToObject(rawData: Array<Array<string>>): IlmoObject {
  const vocalRangeRow = rawData[0];
  const headingRow = rawData[1];
  const toSingleIlmo = makeToSingleIlmo({ vocalRangeRow, headingRow });

  return rawData.slice(2).reduce((acc, row) => {
    const ilmo = toSingleIlmo(row);
    if (!ilmo) return acc;
    const [dateStr, ilmoObj] = ilmo;

    acc[dateStr] = ilmoObj;
    return acc;
  }, {});
}

function makeToSingleIlmo({
  vocalRangeRow,
  headingRow
}): (row: Array<string>) => null | [string, SingleIlmoObject] {
  const dateColumn = headingRow.indexOf("Date");
  const detailsColumn = headingRow.indexOf("Details");
  const songsColumn = headingRow.indexOf("Songs");
  const singerColumns: Array<
    "soprano" | "alto" | "tenor" | "bass" | "previous" | "skip"
  > = vocalRangeRow.map(col => {
    const colText = col.toLowerCase();
    if (colText.startsWith("s")) return "soprano";
    if (colText.startsWith("a")) return "alto";
    if (colText.startsWith("t")) return "tenor";
    if (colText.startsWith("b")) return "bass";
    if (colText.trim() === "") return "previous";
    return "skip";
  });
  function findVocalRangeForColumn(
    colIdx: number
  ): "soprano" | "alto" | "tenor" | "bass" | "invalid" {
    let nextIdx = colIdx;
    while (nextIdx >= 0) {
      const match = singerColumns[nextIdx];
      // Stop immediately if we have a faulty singer line
      if (match === "skip") return "invalid";
      if (match === "previous") {
        // Loop back to previous column
        nextIdx--;
      } else {
        return match;
      }
    }
    // If we get here, it means that we checked all columns
    return "invalid";
  }

  const singerNamesAndVocalRanges: Array<{|
    name: string,
    vocalRange: "soprano" | "alto" | "tenor" | "bass",
    colIdx: number
  |}> = headingRow.reduce((acc, col, colIdx) => {
    if (!col) return acc;
    const vocalRange = findVocalRangeForColumn(colIdx);
    if (vocalRange === "invalid") return acc;
    const name = headingRow[colIdx];
    return [...acc, { name, vocalRange, colIdx }];
  }, []);

  return row => {
    const dateAsWritten = row[dateColumn];
    // First try parsing with a year, as next year's ilmos need to
    // put a year to the data to differ them from current year
    let parsedDate = moment.utc(dateAsWritten, "D.M.YYYY");
    if (!parsedDate.isValid()) {
      // Then let's try without a year.
      parsedDate = moment.utc(dateAsWritten, "D.M.");
    }
    // If the date still isn't valid, we skip the ilmo row as malformed.
    if (!parsedDate.isValid()) return null;
    const date = parsedDate.format("YYYY-MM-DD");

    return [
      date,
      {
        date,
        dateAsWritten,
        details: row[detailsColumn] || null,
        songs: row[songsColumn] || null,
        ...getAttendees(row, singerNamesAndVocalRanges)
      }
    ];
  };
}

function getAttendees(
  row,
  singerNamesAndVocalRanges: Array<{|
    name: string,
    vocalRange: "soprano" | "alto" | "tenor" | "bass",
    colIdx: number
  |}>
): {|
  soprano: AttendanceMap,
  alto: AttendanceMap,
  tenor: AttendanceMap,
  bass: AttendanceMap
|} {
  const returnValue = {
    soprano: { attending: [], notAttending: [], unknown: [] },
    alto: { attending: [], notAttending: [], unknown: [] },
    tenor: { attending: [], notAttending: [], unknown: [] },
    bass: { attending: [], notAttending: [], unknown: [] }
  };

  singerNamesAndVocalRanges.forEach(({ name, vocalRange, colIdx }) => {
    const value = row[(colIdx: any)];
    switch (value.toLowerCase()[0]) {
      case "x":
        returnValue[vocalRange].attending.push(name);
        break;
      // undefined means that there were no text in the column
      case undefined:
        returnValue[vocalRange].unknown.push(name);
        break;
      default:
        // All other characters mean that the singer is not attending
        returnValue[vocalRange].notAttending.push(name);
        break;
    }
  });

  return returnValue;
}
