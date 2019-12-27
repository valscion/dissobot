// @flow

import moment from "moment";

import { put, scan, deleteItem } from "../db";
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
      details: ilmo.details,
      songs: ilmo.songs,
      soprano: ilmo.soprano,
      alto: ilmo.alto,
      tenor: ilmo.tenor,
      bass: ilmo.bass
    }
  });
}

export async function deleteIlmo(ilmo: SingleIlmoObject) {
  await deleteItem({
    TableName: ILMOS_TABLE,
    Key: {
      date: ilmo.date
    }
  });
}

export async function getIlmosFromDatabase(): Promise<
  $ReadOnlyArray<SingleIlmoObject>
> {
  const data = await scan({
    TableName: ILMOS_TABLE
  });
  return data.Items;
}

export async function getUpcomingIlmos(): Promise<
  $ReadOnlyArray<SingleIlmoObject>
> {
  const ilmoList = await getIlmosFromDatabase();
  return _sortUpcomingIlmos(ilmoList);
}

function _sortUpcomingIlmos(ilmoList: $ReadOnlyArray<SingleIlmoObject>) {
  return ilmoList
    .filter(ilmo =>
      moment
        .utc(ilmo.date, "YYYY-MM-DD", true)
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
      const mA = moment.utc(a.date, "YYYY-MM-DD", true);
      const mB = moment.utc(b.date, "YYYY-MM-DD", true);
      if (mA.isBefore(mB)) return -1;
      if (mB.isBefore(mA)) return 1;
      return 0;
    });
}

function _getFirstIlmo(
  ilmoList: $ReadOnlyArray<SingleIlmoObject>
): void | SingleIlmoObject {
  return _sortUpcomingIlmos(ilmoList)[0];
}
