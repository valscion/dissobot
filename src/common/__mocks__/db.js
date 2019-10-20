// @flow

import typeof {
  deleteItem as realDeleteItem,
  put as realPut,
  scan as realScan
} from "../db";

const data = {
  ILMOS_TABLE: { Items: {} },
  USERS_TABLE: { Items: {} }
};

export const deleteItem: realDeleteItem = ({ TableName, Key }) => {
  delete data[TableName].Items[Key];
  return Promise.resolve();
};

export const put: realPut = ({ TableName, Item }) => {
  const items = data[TableName].Items;
  let key;
  if (TableName === "ILMOS_TABLE") {
    key = Item.date;
  } else if (TableName === "USERS_TABLE") {
    key = Item.id;
  } else {
    throw new Error(`Unknown table name "${TableName}"`);
  }
  items[key] = Item;
  return Promise.resolve();
};

export const scan: realScan = ({ TableName }) => {
  return Promise.resolve({ Items: Object.values(data[TableName].Items) });
};
