import { playAI } from "./AI/index";

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
  getGridValues,
  setGridValue,
  resetGridValues,
  getIsPlayerTurn,
  toggleIsPlayerTurn,
  setIsPlayerTurn,
  getIsPlayerStarting,
  toggleIsPlayerStarting
} from "./state/state";
import {
  addBoxesListeners,
  removeBoxesListeners,
  removeBoxListener
} from "./util/listenerUtils";
import { getBoxPosition, isBoxEmpty } from "./util/utils";
import { isGameOver, handleGameOver } from "./util/victoryUtils";

export function run() {
  const elts = findElements();
  addBoxesListeners(elts);

  const isPlayerStarting = getIsPlayerStarting();

  if (!isPlayerStarting) {
    playAI();
  }
}

// Function that handle updating the grid when a click was received
export function boxClick() {
  const elts = findElements();
  const gridValues = getGridValues();
  const isPlayerTurn = getIsPlayerTurn();

  const { row, col } = getBoxPosition(this);
  const currentBox = gridValues[row][col];

  if (isBoxEmpty(currentBox)) {
    if (isPlayerTurn) {
      playSymbol(this);
      setGridValue(row, col, "X");
    } else {
      return;
    }
  }

  // If the game is over, we want to display the victory conditions
  if (isGameOver(gridValues)) {
    handleGameOver(gridValues, elts);
  } else {
    removeBoxListener(this);

    toggleIsPlayerTurn();
    changeTurn(elts, isPlayerTurn);

    playAI();
  }
}

export function reset() {
  const elts = findElements();

  toggleIsPlayerStarting();

  const isPlayerStarting = getIsPlayerStarting();
  setIsPlayerTurn(isPlayerStarting);

  resetGridValues();
  hideGameOverModal();
  resetDOM(elts);
  // Reset the turn status to X
  changeTurn(elts, isPlayerStarting);

  // Restart the game
  run();
}

run();
