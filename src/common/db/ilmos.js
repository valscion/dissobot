// @flow

import moment from "moment";

import { put, scan } from "../db";
import { ILMOS_TABLE } from "../../common/environment";
import type { SingleIlmoObject } from "../../common/types";

export async function getFirstIlmo(): Promise<void | SingleIlmoObject> {
  const ilmos = await getIlmosFromDatabase();
  return _getFirstIlmo(ilmos);
}

export async function findIlmoForDate(
  mom: moment$Moment
): Promise<void | SingleIlmoObject> {
  const dateToSearch = mom.format("YYYY-MM-DD");
  const ilmoList = await getIlmosFromDatabase();
  return ilmoList.find(ilmo => ilmo.date === dateToSearch);
}

export async function saveIlmo(ilmo: SingleIlmoObject) {
  await put({
    TableName: ILMOS_TABLE,
    Item: {
      date: ilmo.date,
      dateAsWritten: ilmo.dateAsWritten,
      songs: ilmo.songs,
      attendingList: ilmo.attendingList,
      notAttendingList: ilmo.notAttendingList,
      unknownList: ilmo.unknownList
    }
  });
}

async function getIlmosFromDatabase(): Promise<
  $ReadOnlyArray<SingleIlmoObject>
> {
  const data = await scan({
    TableName: ILMOS_TABLE
  });
  return data.Items;
}

function _getFirstIlmo(
  ilmoList: $ReadOnlyArray<SingleIlmoObject>
): void | SingleIlmoObject {
  const sortedList = ilmoList
    .filter(ilmo =>
      moment
        .utc(ilmo.dateAsWritten, "D.M.")
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        })
        .isSameOrAfter(
          moment.utc().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        )
    )
    .sort((a, b) => {
      const mA = moment.utc(a.dateAsWritten, "D.M.");
      const mB = moment.utc(b.dateAsWritten, "D.M.");
      if (mA.isBefore(mB)) return -1;
      if (mB.isBefore(mA)) return 1;
      return 0;
    });
  return sortedList[0];
}