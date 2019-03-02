// @flow

import moment from "moment";

import { scan } from "../db";
import { ILMOS_TABLE } from "../../common/environment";
import type { SingleIlmoObject } from "../../common/types";

export async function getFirstIlmo(): Promise<void | SingleIlmoObject> {
  const data = await scan({
    TableName: ILMOS_TABLE
  });
  return _getFirstIlmo(data.Items);
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
