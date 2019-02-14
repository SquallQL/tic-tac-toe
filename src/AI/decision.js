import {
  getIndexOfEmptyBox,
  isAboutToWin,
  hasPotentialVictory,
  countItems,
  playIndex
} from "./utils";
import { gridValues, isPlayerTurn } from "../index";
import { findElements, changeTurn } from "../util/domUtils";

export function playAI() {
  const elts = findElements();

  const offensiveMovePosition = actOnOffensive("O");
  const defensiveMovePosition = actOnOffensive("X");

  console.log(offensiveMovePosition);
  console.log(defensiveMovePosition);

  let position;

  if (typeof offensiveMovePosition.winningMove.row === "number") {
    position = offensiveMovePosition.winningMove;
  } else if (typeof defensiveMovePosition.winningMove.row === "number") {
    position = defensiveMovePosition.winningMove;
  } else if (typeof offensiveMovePosition.offsensiveMove.row === "number") {
    position = offensiveMovePosition.offsensiveMove;
  } else {
    position = findRandomIndex(elts);
  }

  return playIndex(position, gridValues);

  // Return position of move to play. If no move is found, return -1
  function actOnOffensive(symbol) {
    const possibleMoves = [];

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
      if (
        isAboutToWin(column, symbol) ||
        hasPotentialVictory(column, symbol)
      ) {
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

    function findWinningMove(moves) {
      let winningMove;

      moves.forEach(move => {
        if (move.isWinningMove) {
          winningMove = move;
        }
      });

      return winningMove ? winningMove : {};
    }

    return {
      winningMove: findWinningMove(possibleMoves),
      offsensiveMove: possibleMoves[0] || {}
    };
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
