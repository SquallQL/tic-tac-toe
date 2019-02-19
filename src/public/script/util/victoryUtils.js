import { displayVictory, displayDraw } from "./domUtils";
import { removeBoxesListeners } from "./listenerUtils";

export function isGameOver(gridValues) {
  if (isGameWon(gridValues) || isGridFull(gridValues)) {
    return true;
  }

  return false;
}

export function handleGameOver(gridValues, elts) {
  if (isGameWon(gridValues)) {
    displayVictory(elts);
  } else if (isGridFull(gridValues)) {
    displayDraw(elts);
  }

  removeBoxesListeners(elts);
}

function isGameWon(gridValues) {
  // If the grid is full and no other victory conditions are found,
  // it is a draw.

  function isRowVictory(gridValues) {
    let hasWon = false;

    for (let i = 0; i < gridValues.length; i++) {
      if (
        gridValues[i][0] &&
        gridValues[i][0] === gridValues[i][1] &&
        gridValues[i][1] === gridValues[i][2]
      ) {
        hasWon = true;
      }
    }

    return hasWon;
  }

  function isColumnVictory(gridValues) {
    let hasWon = false;

    for (let i = 0; i < gridValues.length; i++) {
      if (
        gridValues[0][i] &&
        gridValues[0][i] === gridValues[1][i] &&
        gridValues[1][i] === gridValues[2][i]
      ) {
        hasWon = true;
      }
    }
    return hasWon;
  }

  function isDiagonalVictory(gridValues) {
    let hasWon = false;

    for (let i = 0; i < gridValues.length; i++) {
      if (
        gridValues[0][i] &&
        gridValues[0][i] === gridValues[1][i + 1] &&
        gridValues[1][i + 1] === gridValues[2][i + 2]
      ) {
        hasWon = true;
      } else if (
        gridValues[0][i + 2] &&
        gridValues[0][i + 2] === gridValues[1][i + 1] &&
        gridValues[1][i + 1] === gridValues[2][i]
      ) {
        hasWon = true;
      }
    }
    return hasWon;
  }

  // Check for victory conditions

  if (
    isColumnVictory(gridValues) ||
    isDiagonalVictory(gridValues) ||
    isRowVictory(gridValues)
  ) {
    return true;
  }
}

function isGridFull(gridValues) {
  let isGridFull = true;

  gridValues.forEach(row => {
    for (let box in row) {
      // If one value is null, then it cannot be a full GRID
      if (!row[box]) {
        isGridFull = false;
        return;
      }
    }
  });

  return isGridFull;
}
