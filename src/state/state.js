const state = {
  isPlayerStarting: true,
  isPlayerTurn: true,
  gridValues: [[null, null, null], [null, null, null], [null, null, null]]
};

export function getGridValues() {
  return state.gridValues;
}

export function setGridValue(row, col, value) {
  state.gridValues[row][col] = value;
}

export function resetGridValues() {
  state.gridValues = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
}

export function getIsPlayerStarting() {
  return state.isPlayerStarting;
}

export function toggleIsPlayerStarting() {
  return (state.isPlayerStarting = !state.isPlayerStarting);
}

export function getIsPlayerTurn() {
  return state.isPlayerTurn;
}

export function setIsPlayerTurn(booleanValue) {
  if (typeof booleanValue === "boolean") {
    return (state.isPlayerTurn = booleanValue);
  } else {
    throw new Error("isPlayerTurn must be a boolean");
  }
}

export function toggleIsPlayerTurn() {
  state.isPlayerTurn = !state.isPlayerTurn;
}
