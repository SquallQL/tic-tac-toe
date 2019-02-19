import { findElements, playSymbol } from "../../util/domUtils";
import { removeBoxListener } from "../../util/listenerUtils";
import { getBoxDOMIndex } from "../../util/utils";
import { setGridValue } from "../../state/state";

export function playIndex(position, gridValues) {
  const elts = findElements();

  const { row, col } = position;
  const domBoxIndex = getBoxDOMIndex(row, col);

  playSymbol(elts.boxes[domBoxIndex]);
  setGridValue(row, col, "O");
  removeBoxListener(elts.boxes[domBoxIndex]);

  // Return position of played box
  return domBoxIndex;
}
