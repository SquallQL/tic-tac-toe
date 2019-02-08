export function getBoxPosition(box) {
  // Check in which sub-array it belongs
  const position = {};

  if (box.id < 3) {
    position.row = 0;
    position.col = box.id;
  } else if (box.id < 6) {
    position.row = 1;
    position.col = box.id - 3;
  } else {
    position.row = 2;
    position.col = box.id - 6;
  }
  return position;
}

export function getBoxDOMIndex(row, col) {
  // Check in which sub-array it belongs
  if (row === 0) {
    return row + col;
  } else if (row === 1) {
    return 3 + col;
  } else {
    return 6 + col;
  }
}

export function isBoxEmpty(box) {
  return box === null;
}
