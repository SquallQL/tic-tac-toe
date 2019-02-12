import {
  getIndexOfEmptyBox,
  isAboutToWin,
  countItems,
  playIndex
} from "./utils";
import { gridValues, isPlayerTurn } from "../index";
import { findElements, changeTurn } from "../util/domUtils";

export function playAI() {
  const elts = findElements();

  const winningMovePosition = actOnWinningCondition("O");
  const defeatMovePosition = actOnWinningCondition("X");

  let position;

  if (typeof winningMovePosition.row === "number") {
    position = winningMovePosition;
  } else if (typeof defeatMovePosition.row === "number") {
    position = defeatMovePosition;
  } else {
    position = findRandomIndex(elts);
  }

  return playIndex(position, gridValues);

  // Return position of move to play. If no move is found, return -1
  function actOnWinningCondition(symbol) {
    let position = -1;

    for (let i = 0; i < gridValues.length; i++) {
      const column = [gridValues[0][i], gridValues[1][i], gridValues[2][i]];
      const leftCross = [
        gridValues[0][i],
        gridValues[1][i + 1],
        gridValues[2][i + 2]
      ];
      const rightCross = [
        gridValues[0][i + 2],
        gridValues[1][i + 1],
        gridValues[2][i]
      ];

      // Check if AI should block a row
      if (isAboutToWin(gridValues[i], symbol)) {
        position = {
          row: i,
          col: getIndexOfEmptyBox(gridValues[i])
        };
      }
      // Check if AI should block a column
      else if (isAboutToWin(column, symbol)) {
        position = {
          row: getIndexOfEmptyBox(column),
          col: i
        };
      }
      // Check if AI should block a left cross
      else if (isAboutToWin(leftCross, symbol)) {
        position = {
          row: getIndexOfEmptyBox(leftCross),
          col: getIndexOfEmptyBox(leftCross)
        };
      }
      // Check if AI should block a right cross
      else if (isAboutToWin(rightCross, symbol)) {
        let col = 0;

        // Convert the col to the right index
        switch (getIndexOfEmptyBox(rightCross)) {
          case 0:
            col = 2;
            break;
          case 1:
            col = 1;
            break;
          case 2:
            col = 0;
            break;
        }

        position = {
          row: getIndexOfEmptyBox(rightCross),
          col
        };
      }
    }

    return position;
  }

  function actOnOffensive() {
    // Go through all the possible move set:
    // If
  }

  function findRandomIndex(elts) {
    const emptyGrid = [];

    for (let row = 0; row < gridValues.length; row++) {
      for (let col = 0; col < gridValues.length; col++) {
        if (gridValues[row][col] === null) {
          emptyGrid.push({ row, col });
        }
      }
    }

    return emptyGrid[Math.floor(Math.random() * emptyGrid.length)];
  }
}
