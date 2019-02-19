import {
  isAboutToWin,
  hasPotentialVictory,
  getOneMoveRandomly,
  getWinningMove
} from "./utils.js";
import { getGridValues } from "../../state/state";
import { changeTurn } from "../../util/domUtils";
import { countItems, getIndexOfEmptyBox } from "../../util/utils";

// Return position of move to play. If no move is found, return -1
export function findBestMove(symbol) {
  const possibleMoves = [];
  const gridValues = getGridValues();

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
    if (
      isAboutToWin(gridValues[i], symbol) ||
      hasPotentialVictory(gridValues[i], symbol)
    ) {
      possibleMoves.push({
        row: i,
        col: getIndexOfEmptyBox(gridValues[i]),
        isWinningMove: isAboutToWin(gridValues[i], symbol)
      });
    }
    // Check if AI should block a column
    if (isAboutToWin(column, symbol) || hasPotentialVictory(column, symbol)) {
      possibleMoves.push({
        row: getIndexOfEmptyBox(column),
        col: i,
        isWinningMove: isAboutToWin(column, symbol)
      });
    }
    // Check if AI should block a left cross
    if (
      isAboutToWin(leftCross, symbol) ||
      hasPotentialVictory(leftCross, symbol)
    ) {
      possibleMoves.push({
        row: getIndexOfEmptyBox(leftCross),
        col: getIndexOfEmptyBox(leftCross),
        isWinningMove: isAboutToWin(leftCross, symbol)
      });
    }
    // Check if AI should block a right cross
    if (
      isAboutToWin(rightCross, symbol) ||
      hasPotentialVictory(rightCross, symbol)
    ) {
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

      possibleMoves.push({
        row: getIndexOfEmptyBox(rightCross),
        col,
        isWinningMove: isAboutToWin(rightCross, symbol)
      });
    }
  }

  return {
    winningMove: getWinningMove(possibleMoves),
    offsensiveMove: getOneMoveRandomly(possibleMoves)
  };
}
