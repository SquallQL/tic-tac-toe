import { getBoxDOMIndex, countItems } from "../../util/utils";
import { findElements, playSymbol } from "../../util/domUtils";

export function isAboutToWin(arr, symbol) {
  const numberOfMoves = countItems(arr, symbol);
  const numberOfEmptyBox = countItems(arr, null);

  return numberOfMoves === arr.length - 1 && numberOfEmptyBox === 1;
}

export function hasPotentialVictory(arr, symbol) {
  const numberOfMoves = countItems(arr, symbol);
  const numberOfEmptyBox = countItems(arr, null);

  return numberOfMoves === 1 && numberOfEmptyBox === 2;
}

export function getWinningMove(moves) {
  let winningMove;

  moves.forEach(move => {
    if (move.isWinningMove) {
      winningMove = move;
    }
  });

  return winningMove ? winningMove : {};
}

export function getOneMoveRandomly(moves) {
  return moves.length ? moves[Math.floor(Math.random() * moves.length)] : {};
}