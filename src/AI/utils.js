import { getBoxDOMIndex } from "../util/utils";
import { findElements, playSymbol } from "../util/domUtils";

export function countItems(list, lookup) {
  let count = 0;

  list.map(item => {
    if (item === lookup) {
      count++;
    }
  });

  return count;
}

export function isAboutToWin(arr, symbol) {
  const numberOfMoves = countItems(arr, symbol);
  const numberOfEmptyBox = countItems(arr, null);

  if (numberOfMoves === arr.length - 1 && numberOfEmptyBox === 1) {
    return true;
  } else {
    return false;
  }
}

export function getIndexOfEmptyBox(arr) {
  return arr.indexOf(null);
}

export function playIndex(position, gridValues) {
  const elts = findElements();

  const { row, col } = position;
  const domBoxIndex = getBoxDOMIndex(row, col);

  playSymbol(elts.boxes[domBoxIndex]);
  gridValues[row][col] = "O";

  // Return position of played box
  return domBoxIndex;
}