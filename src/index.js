import { determineNextMove } from "./AI/decision";

import {
  findElements,
  playSymbol,
  displayVictory,
  displayDraw,
  changeTurn,
  resetDOM,
  hideGameOverModal
} from "./util/domUtils";
import {
  addBoxesListeners,
  removeBoxesListeners,
  removeBoxListener
} from "./util/listenerUtils";
import { getBoxPosition, isBoxEmpty } from "./util/utils";
import { isGameWon, isGridFull } from "./util/victoryUtils";

// TODO: Handle Global state privately
export let gridValues = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
export let isXTurn = true;

// Call after the onload event from the dom to start the program
export function run() {
  const elts = findElements();
  addBoxesListeners(elts);
}

// Function that handle updating the grid when a click was received
export function boxClick() {
  const elts = findElements();

  const { row, col } = getBoxPosition(this);
  const currentBox = gridValues[row][col];

  if (isBoxEmpty(currentBox)) {
    if (isXTurn) {
      playSymbol(this);
      gridValues[row][col] = "X";
    } else {
      playSymbol(this);
      gridValues[row][col] = "O";
    }
  }

  // If the game is over, we want to display the victory conditions
  if (isGameWon(gridValues)) {
    displayVictory(elts);
    removeBoxesListeners(elts);
  } else if (isGridFull(gridValues)) {
    displayDraw(elts);
    removeBoxesListeners(elts);
  }
  // If it is not a victory, then prepare the next turn
  else {
    removeBoxListener(this);
    isXTurn = !isXTurn;
    changeTurn(elts);
  }
}

export function reset() {
  const elts = findElements();

  isXTurn = true;
  gridValues = [[null, null, null], [null, null, null], [null, null, null]];
  hideGameOverModal();
  resetDOM(elts);
  // Reset the turn status to X
  changeTurn(elts, true);

  // Restart the game
  run();
}

run();
