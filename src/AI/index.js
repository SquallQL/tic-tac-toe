import { findBestMove } from "./util/logicUtils";
import { playIndex } from "./util/playUtils";
import { getRandomGridIndex } from "../util/utils";
import { isGameOver, handleGameOver } from "../util/victoryUtils";
import { findElements, changeTurn } from "../util/domUtils";
import { removeBoxListener } from "../util/listenerUtils";
import { getGridValues, toggleIsPlayerTurn, getIsPlayerTurn } from "../state/state";

export function playAI() {
  const elts = findElements();
  const gridValues = getGridValues();

  const offensiveMovePositions = findBestMove("O");
  const defensiveMovePositions = findBestMove("X");

  let position;

  if (typeof offensiveMovePositions.winningMove.row === "number") {
    position = offensiveMovePositions.winningMove;
  } else if (typeof defensiveMovePositions.winningMove.row === "number") {
    position = defensiveMovePositions.winningMove;
  } else if (typeof offensiveMovePositions.offsensiveMove.row === "number") {
    position = offensiveMovePositions.offsensiveMove;
  } else {
    position = getRandomGridIndex(elts, gridValues);
  }

  // Play AI and check if AI has won before changing turn
  setTimeout(() => {
    playIndex(position, gridValues);

    if (isGameOver(gridValues)) {
      handleGameOver(gridValues, elts);
    } else {      
      toggleIsPlayerTurn();
      changeTurn(elts, getIsPlayerTurn());
    }
  }, 1000);
}
