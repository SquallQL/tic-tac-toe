import { playAI } from "./AI/decision";

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
import { isGameOver, handleGameOver } from "./util/victoryUtils";

// TODO: Handle Global state privately
export let gridValues = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
export let isPlayerTurn = true;

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
    if (isPlayerTurn) {
      playSymbol(this);
      gridValues[row][col] = "X";
    } else {
      return;
    }
  }

  // If the game is over, we want to display the victory conditions
  if (isGameOver(gridValues)) {
    handleGameOver(gridValues, elts);
  } else {
    removeBoxListener(this);
    isPlayerTurn = !isPlayerTurn;
    changeTurn(elts);

    // Play AI and check if AI has won before changing turn
    setTimeout(() => {
      const AIBoxIndex = playAI();

      if (isGameOver(gridValues)) {
        handleGameOver(gridValues, elts);
      } else {
        isPlayerTurn = !isPlayerTurn;
        changeTurn(elts);
        removeBoxListener(elts.boxes[AIBoxIndex]);
      }
    }, 1000);
  }
}

export function reset() {
  const elts = findElements();

  isPlayerTurn = true;
  gridValues = [[null, null, null], [null, null, null], [null, null, null]];
  hideGameOverModal();
  resetDOM(elts);
  // Reset the turn status to X
  changeTurn(elts, true);

  // Restart the game
  run();
}

run();
