import { xTurnTxt, player2TurnTxt } from "../text.js";
import { reset } from "../index";
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

export function playSymbol(box, xTurn) {
  box.innerHTML = xTurn ? "X" : "O";
  // TODO: Add class instead instead of removing.
  box.setAttribute("class", xTurn ? "box blueSymbol" : "box redSymbol");
}

// TODO: Pass the xTurn to the function listener
// TODO: Add opacity 50%;
export function previewSymbol(xTurn) {
  this.innerHTML = xTurn ? "X" : "O";
}

export function hidePreviewSymbol() {
  this.innerHTML = "";
}

export function displayVictory(elts, xTurn) {
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
  /* TODO: Pass args to reset function */
  addResetBtnListeners(elts);
}

export function changeTurn(elts, xTurn) {
  if (xTurn) {
    elts.xTurnElt.setAttribute("class", "isActiveTurn activeRight");
    elts.oTurnElt.setAttribute("class", "");
  } else {
    elts.oTurnElt.setAttribute("class", "isActiveTurn activeLeft");
    elts.xTurnElt.setAttribute("class", "");
  }
}

export function resetDOM(elts, fnClick) {
  let roundNumber = Number(elts.roundNumber.innerHTML);
  elts.roundNumber.innerHTML = roundNumber++;
  elts.roundNumber.setAttribute("class", "");

  elts.gameStatusElt.innerHTML = "Round";
  elts.resetBtn.setAttribute("class", "btnDisabled");
  removeResetBtnListeners(elts);

  elts.boxes.forEach(box => {
    box.innerHTML = "";
  });
}
