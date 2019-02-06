import { xTurnTxt, player2TurnTxt } from "../text.js";
import { run, reset, xTurn } from "../index";
import { isBoxEmpty, updateGrid } from "./utils";
import { addResetBtnListeners, removeResetBtnListeners } from "./listenerUtils";

export function findElements() {
  const elts = {};
  elts.row = document.querySelectorAll(".row");
  elts.boxes = document.querySelectorAll(".box");
  elts.xScoreElt = document.querySelector("#xScore");
  elts.xTurnElt = document.querySelector("#xTurn");
  elts.oScoreElt = document.querySelector("#oScore");
  elts.oTurnElt = document.querySelector("#oTurn");
  elts.resetBtn = document.querySelector("#resetBtn");
  elts.gameStatusElt = document.querySelector("#gameStatus");
  elts.roundNumber = document.querySelector("#roundNumber");
  return elts;
}

export function playSymbol(box) {
  box.innerHTML = xTurn ? "X" : "O";
  // TODO: Add class instead instead of removing.
  box.style.color = xTurn ? "#71ddff" : "#ff7878";
}

export function previewSymbol() {
  this.innerHTML = xTurn ? "X" : "O";
}

export function hidePreviewSymbol() {
  this.innerHTML = "";
  this.style.opacity = "1";
}

export function displayVictory(elts) {
  if (xTurn) {
    elts.gameStatusElt.innerHTML = "The X has claimed victory!";

    let currentScore = Number(elts.xScoreElt.innerHTML);
    elts.xScoreElt.innerHTML = currentScore += 1;
  } else {
    elts.gameStatusElt.innerHTML = "The O has claimed victory!";

    let currentScore = Number(elts.oScoreElt.innerHTML);
    elts.oScoreElt.innerHTML = currentScore += 1;
  }
  elts.roundNumber.setAttribute("class", "isHidden");

  activateResetBtn(elts);
}

export function displayDraw(elts) {
  elts.gameStatusElt.innerHTML = `DRAW`;
  elts.xScoreElt.innerHTML = "<button id='restart'>Restart</button>";

  activateResetBtn(elts);
}

export function activateResetBtn(elts) {
  elts.resetBtn.setAttribute("class", "");

  addResetBtnListeners(elts);
}

export function changeTurn(elts) {
  if (xTurn) {
    elts.xTurnElt.setAttribute("class", "isActiveTurn activeRight");
    elts.oTurnElt.setAttribute("class", "");
  } else {
    elts.oTurnElt.setAttribute("class", "isActiveTurn activeLeft");
    elts.xTurnElt.setAttribute("class", "");
  }
}

export function resetDOM() {
  const elts = findElements();

  // Increment the round count by 1
  let round = Number(elts.roundNumber.innerHTML) + 1;
  elts.roundNumber.innerHTML = round;
  elts.roundNumber.setAttribute("class", "");
  elts.gameStatusElt.innerHTML = "Round ";

  // Disable the reset button
  elts.resetBtn.setAttribute("class", "btnDisabled");
  removeResetBtnListeners(elts);

  // Reset the HTML grid and style
  elts.boxes.forEach(box => {
    box.innerHTML = "";
    box.style.color = "";
  });

  // Reset the turn status to X
  changeTurn(elts, true);

  // Start the new game
  run();
}
