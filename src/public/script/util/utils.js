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

export function getIndexOfEmptyBox(arr) {
  return arr.indexOf(null);
}

export function isBoxEmpty(box) {
  return box === null;
}

export function countItems(list, lookup) {
  let count = 0;

  list.map(item => {
    if (item === lookup) {
      count++;
    }
  });

  return count;
}
export function getRandomGridIndex(elts, gridValues) {
  const emptyGrid = [];

  for (let row = 0; row < gridValues.length; row++) {
    for (let col = 0; col < gridValues.length; col++) {
      if (gridValues[row][col] === null) {
        emptyGrid.push({ row, col });
      }
    }
  }

  return emptyGrid[Math.floor(Math.random() * emptyGrid.length)];
}


