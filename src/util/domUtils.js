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
  box.style.cursor = "auto";
}

export function previewSymbol() {
  this.innerHTML = xTurn ? "X" : "O";
  this.style.color = "rgba(255, 255, 255, 0.2)";
}

export function hidePreviewSymbol() {
  this.style.color = "rgba(255, 255, 255, 0)";
}

export function displayVictory(elts) {
  if (xTurn) {
    let currentScore = Number(elts.xScoreElt.innerHTML);
    elts.xScoreElt.innerHTML = currentScore += 1;
  } else {
    let currentScore = Number(elts.oScoreElt.innerHTML);
    elts.oScoreElt.innerHTML = currentScore += 1;
  }

  const message = `The ${xTurn ? "X" : "O"} has claimed victory!`;

  removePointerCursor(elts);
  showGameOverModal(message);
}

export function displayDraw(elts) {
  removePointerCursor(elts);
  showGameOverModal("DRAW");
}

export function showGameOverModal(message) {
  const root = document.querySelector("#root");
  const takeOverNode = document.createElement("div");
  const modalNode = document.createElement("div");
  const restartNode = document.createElement("button");

  takeOverNode.setAttribute("id", "gameOver");
  modalNode.setAttribute("class", "modal");
  restartNode.setAttribute("id", "resetBtn");

  modalNode.innerHTML = message;
  restartNode.innerHTML = "Restart";

  root.appendChild(takeOverNode);
  takeOverNode.appendChild(modalNode);
  takeOverNode.style.opacity = "1";
  modalNode.appendChild(restartNode);

  addResetBtnListeners(restartNode);
}

export function hideGameOverModal() {
  const root = document.querySelector("#root");
  const takeOver = document.querySelector("#gameOver");
  root.removeChild(takeOver);
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

export function resetDOM(elts) {
  // Increment the round count by 1
  let round = Number(elts.roundNumber.innerHTML) + 1;
  elts.roundNumber.innerHTML = round;
  elts.roundNumber.setAttribute("class", "");
  elts.gameStatusElt.innerHTML = "Round ";

  // Disable the reset button
  removeResetBtnListeners(elts);

  // Reset the HTML grid and style
  elts.boxes.forEach(box => {
    box.innerHTML = "";
    box.style.color = "";
    box.style.cursor = "";
  });
}

export function removePointerCursor(elts) {
  elts.boxes.forEach(box => {
    box.style.cursor = "auto";
  });
}
