// @flow

const GoogleSpreadsheet = require("google-spreadsheet");

import {
  SPREADSHEET_SERVICE_ACCOUNT_CLIENT_EMAIL,
  SPREADSHEET_SERVICE_ACCOUNT_PRIVATE_KEY
} from "../common/environment";

const spreadsheet = new GoogleSpreadsheet(
  "1OvhfOt77U1kSULLNrJeeSLkNzYTsLP008yyIWnTmDug"
);

export const ILMO_SHEET_ID: WorksheetId = "od6";

type Callback<ResultType> = (error: ?Error, result: ResultType) => void;

type Spreadsheet = {|
  useServiceAccountAuth: (accountInfo: Object, callback: Callback<any>) => void,
  getInfo: (callback: Callback<Info>) => void,
  getRows: (
    worksheetId: WorksheetId,
    options?: GetRowsOptions,
    callback: Callback<Array<SpreadsheetRow>>
  ) => void,
  addRow: (
    worksheetId: WorksheetId,
    newRow: Object,
    callback: Callback<SpreadsheetRow>
  ) => void,
  getCells: (
    worksheetId: WorksheetId,
    options?: GetCellsOptions,
    callback: Callback<Array<SpreadsheetCell>>
  ) => void,
  bulkUpdateCells: (
    cells: Array<SpreadsheetCell>,
    callback: Callback<any>
  ) => void
|};

async function getSpreadsheet(): Promise<Spreadsheet> {
  // Authentication needs to only happen once
  if (spreadsheet.isAuthActive()) {
    return spreadsheet;
  }

  return new Promise((resolve, reject) => {
    spreadsheet.useServiceAccountAuth(
      {
        client_email: SPREADSHEET_SERVICE_ACCOUNT_CLIENT_EMAIL,
        private_key: SPREADSHEET_SERVICE_ACCOUNT_PRIVATE_KEY
      },
      err => {
        if (err) reject(err);
        resolve(spreadsheet);
      }
    );
  });
}

opaque type WorksheetId: string = string;

type Worksheet = {|
  url: string,
  title: string,
  id: WorksheetId,
  rowCount: number,
  colCount: number,
  getRows: (
    options: GetRowsOptions,
    callback: Callback<Array<SpreadsheetRow>>
  ) => void,
  getCells: (
    options: GetCellsOptions,
    callback: Callback<Array<SpreadsheetCell>>
  ) => void,
  addRow: (newRow: Object, callback: Callback<SpreadsheetRow>) => void
|};

type Info = {
  title: string,
  updated: string,
  author: {
    name: string,
    email: string
  },
  worksheets: Array<Worksheet>
};

export async function getInfo(): Promise<Info> {
  const ss = await getSpreadsheet();
  return new Promise((resolve, reject) => {
    ss.getInfo((err, info) => {
      if (err) reject(err);
      else resolve(info);
    });
  });
}

export type SpreadsheetRow = {|
  save: (callback: Callback<any>) => void,
  del: (callback: Callback<any>) => void,
  [columnId: string]: any
|};

// https://developers.google.com/sheets/api/v3/data#send_a_structured_query_for_rows
type StructuredQuery = string;
type GetRowsOptions = {|
  offset?: number,
  limit?: number,
  orderby?: number,
  reverse?: boolean,
  query?: StructuredQuery
|};
export async function getRows(
  worksheetId: WorksheetId,
  options?: GetRowsOptions
): Promise<Array<SpreadsheetRow>> {
  // TODO: Implement
  return [];
}

export async function addRow(
  worksheetId: WorksheetId,
  newRow: Object
): Promise<SpreadsheetRow> {
  const ss = await getSpreadsheet();
  return new Promise((resolve, reject) => {
    ss.addRow(worksheetId, newRow, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

opaque type CellId: string = string;
export type SpreadsheetCell = {|
  id: CellId,
  row: number,
  col: number,
  value: string,
  formulat: ?string,
  numericValue: ?number,
  save: (callback: Callback<any>) => void,
  del: (callback: Callback<any>) => void,
  setValue: (value: string, callback: Callback<any>) => void
|};

type GetCellsOptions = {|
  "min-row"?: number,
  "max-row"?: number,
  "min-col"?: number,
  "max-col"?: number,
  "return-empty"?: boolean
|};
export async function getCells(
  worksheetId: WorksheetId,
  options?: GetCellsOptions
): Promise<Array<SpreadsheetCell>> {
  const ss = await getSpreadsheet();
  return new Promise((resolve, reject) => {
    ss.getCells(worksheetId, options, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}
