import { player1TurnTxt, player2TurnTxt } from "../text.js";

export function findElements() {
  const elts = {};
  elts.row = document.querySelectorAll(".row");
  elts.boxes = document.querySelectorAll(".box");
  elts.playerTurnElt = document.querySelector("#playerTurnText");
  elts.gameStatusElt = document.querySelector("#gameStatus");
  return elts;
}

export function displayVictory(elts, player1Turn) {
  elts.gameStatusElt.innerHTML = `The ${
    player1Turn ? "Player 1" : "Player 2"
  } has claimed victory!`;
  elts.playerTurnElt.innerHTML = "<button id='restart'>Restart</button>";
}

export function displayDraw(elts) {
  elts.gameStatusElt.innerHTML = `DRAW`;
  elts.playerTurnElt.innerHTML = "<button id='restart'>Restart</button>";
}

export function changeTurn(elts, player1Turn) {
  elts.playerTurnElt.innerHTML = player1Turn ? player1TurnTxt : player2TurnTxt;
}

export function resetDOM(elts, fnClick) {
  elts.playerTurnElt.innerHTML = player1TurnTxt;
  elts.gameStatusElt.innerHTML = "Playing";
  elts.boxes.forEach(box => {
    box.innerHTML = "";
    box.addEventListener("click", fnClick, false);
  });
}
