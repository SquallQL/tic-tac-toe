import { previewSymbol, hidePreviewSymbol } from "./domUtils";
import { boxClick, reset } from "../index.js";

export function addBoxesListeners(elts) {
  elts.boxes.forEach(box => {
    box.addEventListener("click", boxClick, false);
    box.addEventListener("mouseover", previewSymbol, false);
    box.addEventListener("mouseout", hidePreviewSymbol, false);
  });
}

// Remove listener for a single box.
export function removeBoxListener(box) {
  box.removeEventListener("click", boxClick, false);
  box.removeEventListener("mouseover", previewSymbol, false);
  box.removeEventListener("mouseout", hidePreviewSymbol, false);
}

export function removeBoxesListeners(elts) {
  elts.boxes.forEach(box => {
    box.removeEventListener("onmouseover", boxClick, false);
  });
}

export function addResetBtnListeners(elts) {
  elts.resetBtn.addEventListener("click", reset, false);
}

export function removeResetBtnListeners(elts) {
  elts.resetBtn.addEventListener("click", reset, false);
}
