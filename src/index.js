import { player1TurnTxt } from "./text";
import {
  findElements,
  displayVictory,
  displayDraw,
  changeTurn,
  resetDOM
} from "./util/domUtils";
import { getBoxPosition } from "./util/utils";
import { isGameWon, isGridFull } from "./util/victoryUtils";

// TODO: Handle Global state privately
let gridValues = [[null, null, null], [null, null, null], [null, null, null]];
let player1Turn = true;

// Initialize the board and add click listeners to each box.
function run() {
  const elts = findElements();
  elts.playerTurnElt.innerHTML = player1TurnTxt;

  elts.boxes.forEach(box => {
    box.addEventListener("click", boxClick, false);
  });

  // Function that handle updating the grid when a click was received
  function boxClick() {
    const { row, col } = getBoxPosition(this);

    if (!gridValues[row][this.id]) {
      if (player1Turn) {
        this.innerHTML = "X";
        gridValues[row][col] = "X";
      } else if (!player1Turn) {
        this.innerHTML = "O";
        gridValues[row][col] = "O";
      }
    }

    // If the game is over, we want to display the victory conditions
    if (isGameWon(gridValues)) {
      displayVictory(elts, player1Turn);

      const restartElt = document.querySelector("#restart");

      restartElt.addEventListener("click", () => {
        reset(elts, boxClick);
      });

      elts.boxes.forEach(box => {
        box.removeEventListener("click", boxClick);
      });
    } else if (isGridFull(gridValues)) {
      displayDraw(elts);
    } else {
      // Update the player turn
      player1Turn = !player1Turn;
      changeTurn(elts, player1Turn);
    }
  }
}

function reset(elts, boxClick) {
  player1Turn = true;
  gridValues = [[null, null, null], [null, null, null], [null, null, null]];
  resetDOM(elts, boxClick);
}

run();
