// @flow

import moment from "moment";
import {
  getCells,
  ILMO_SHEET_ID,
  type SpreadsheetCell,
  type SpreadsheetRow
} from "./spreadsheet";

const isDateCell = (cell: SpreadsheetCell) =>
  cell.col === 1 && cell.row > 1 && !!cell.value;
const cellAsMoment = (cell: SpreadsheetCell) => moment(cell.value, "D.M.");
const isPresentOrFutureDataCell = (cell: SpreadsheetCell) =>
  !cellAsMoment(cell).isBefore(moment(), "day");

export function getNextTrainingCell(
  cells: Array<SpreadsheetCell>
): SpreadsheetCell {
  const nextTraining = cells
    .filter(isDateCell)
    .filter(isPresentOrFutureDataCell)[0];
  if (!nextTraining) {
    throw new Error(
      "The trainings spreadsheet doesn't contain any future trainings..?"
    );
  }
  return nextTraining;
}

const nameCells = (cells: Array<SpreadsheetCell>) =>
  cells.filter(c => c.row === 1 && c.col > 3 && !!c.value);

const signedUpForRow = ({
  cells,
  row
}: {
  cells: Array<SpreadsheetCell>,
  row: number
}) =>
  nameCells(cells).filter(nameCell =>
    cells
      .filter(c => c.row === row && c.col === nameCell.col)
      .filter(signUpCell => !!signUpCell.value)
      .find(signUpCell => signUpCell.value[0].toLowerCase() === "x")
  );

const notSignedUpForRow = ({
  cells,
  row
}: {
  cells: Array<SpreadsheetCell>,
  row: SpreadsheetRow
}) =>
  nameCells(cells).filter(nameCell =>
    cells
      .filter(c => c.row === row && c.col === nameCell.col)
      .find(signUpCell => {
        const value = signUpCell.value;
        if (!value) return true;
        if (value[0] === "?") return false;
        if (value[0].toLowerCase() === "x") return false;
        return true;
      })
  );

const getComingPeople = ({ cells, nextTrainingCell }) =>
  signedUpForRow({ cells, row: nextTrainingCell.row })
    .map(signUpCell => cells.find(c => c.row === 1 && c.col === signUpCell.col))
    .map(nameCell => nameCell && nameCell.value);

export async function peopleSignedUp() {
  const cells = await getCells(ILMO_SHEET_ID, {
    "min-row": 1,
    "max-row": 100,
    "return-empty": true
  });
  const nextTrainingCell = getNextTrainingCell(cells);
  const comingPeople = getComingPeople({ cells, nextTrainingCell });
  return signedUpForRow({ cells, row: nextTrainingCell.row })
    .map(signUpCell => cells.find(c => c.row === 1 && c.col === signUpCell.col))
    .map(nameCell => nameCell && nameCell.value);
}
