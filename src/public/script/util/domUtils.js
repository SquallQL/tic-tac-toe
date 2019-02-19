import {
  xColor,
  oColor,
  xColorTransparent,
  oColorTransparent,
  previewColor,
  hiddenColor,
  fadeOutBackground
} from "../settings/colorConstants";
import { run, reset } from "../index";
import { getIsPlayerTurn } from "../state/state";
import { isBoxEmpty, updateGrid } from "./utils";
import { addResetBtnListeners, removeResetBtnListeners } from "./listenerUtils";

export function findElements() {
  const elts = {};
  elts.row = document.querySelectorAll(".row");
  elts.boxes = document.querySelectorAll(".box");
  elts.xScoreElt = document.querySelector("#xScore");
  elts.isPlayerTurnElt = document.querySelector("#isPlayerTurn");
  elts.oScoreElt = document.querySelector("#oScore");
  elts.oTurnElt = document.querySelector("#oTurn");
  elts.resetBtn = document.querySelector("#resetBtn");
  elts.gameStatusElt = document.querySelector("#gameStatus");
  elts.roundNumber = document.querySelector("#roundNumber");
  return elts;
}

export function playSymbol(box) {
  const isPlayerTurn = getIsPlayerTurn();

  box.innerHTML = isPlayerTurn ? "X" : "O";
  box.style.color = isPlayerTurn ? xColor : oColor;
  box.style.cursor = "auto";
}

export function previewSymbol() {
  const isPlayerTurn = getIsPlayerTurn();

  this.innerHTML = isPlayerTurn ? "X" : "";
  this.style.color = previewColor;
}

export function hidePreviewSymbol() {
  this.style.color = hiddenColor;
}

export function displayVictory(elts) {
  const isPlayerTurn = getIsPlayerTurn();

  if (isPlayerTurn) {
    let currentScore = Number(elts.xScoreElt.innerHTML);
    elts.xScoreElt.innerHTML = currentScore += 1;
  } else {
    let currentScore = Number(elts.oScoreElt.innerHTML);
    elts.oScoreElt.innerHTML = currentScore += 1;
  }

  const winner = isPlayerTurn ? "X" : "O";
  const message = `${winner} WINS!`;

  removePointerCursor(elts);
  showGameOverModal(message, winner);
}

export function displayDraw(elts) {
  removePointerCursor(elts);
  showGameOverModal("DRAW");
}

export function showGameOverModal(message, winner) {
  // Create all the new elements
  const root = document.querySelector("#root");
  const takeOverNode = document.createElement("div");
  const modalNode = document.createElement("div");
  const textNode = document.createElement("span");
  const restartNode = document.createElement("button");

  // Set the ids and classes
  takeOverNode.setAttribute("id", "gameOver");
  modalNode.setAttribute("class", "modal");
  textNode.setAttribute("class", "modalTextHidden");
  restartNode.setAttribute("id", "resetBtn");

  // Add the content
  textNode.innerHTML = message;
  restartNode.innerHTML = "Play again";

  //Append the content in the DOM
  root.appendChild(takeOverNode);
  takeOverNode.appendChild(modalNode);
  modalNode.appendChild(textNode);
  modalNode.appendChild(restartNode);

  // Change styles
  if (winner) {
    modalNode.style["background-color"] =
      winner === "X" ? xColorTransparent : oColorTransparent;
  }

  // Change styles or classes after an arbitrary small time to trigger animation
  window.setTimeout(() => {
    takeOverNode.style["background-color"] = fadeOutBackground;
    modalNode.style.left = "50%";
    restartNode.style.opacity = "1";
    textNode.className += " modalText";
  }, 50);

  addResetBtnListeners(restartNode);
}

export function hideGameOverModal() {
  const root = document.querySelector("#root");
  const takeOver = document.querySelector("#gameOver");

  root.removeChild(takeOver);
}

export function changeTurn(elts, isPlayerTurn) {
  if (isPlayerTurn) {
    elts.isPlayerTurnElt.setAttribute("class", "isActiveTurn activeRight");
    elts.oTurnElt.setAttribute("class", "");
  } else {
    elts.oTurnElt.setAttribute("class", "isActiveTurn activeLeft");
    elts.isPlayerTurnElt.setAttribute("class", "");
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
