// @flow

import type { SingleIlmoObject } from "../../common/types";

export function refresh(ilmo: SingleIlmoObject) {
  return {
    text: "Refresh",
    callback_data: `REFRESH:${ilmo.date}`
  };
}
