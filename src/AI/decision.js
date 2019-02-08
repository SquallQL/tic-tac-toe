import { gridValues, isXTurn } from "../index";
import { findElements, playSymbol, changeTurn } from "../util/domUtils";
import { getBoxDOMIndex } from "../util/utils";

export function playAI() {
  console.log("CALLED");

  const elts = findElements();

  AIShouldBlock();
  function AIShouldBlock() {
    // Block Row
    for (let i = 0; i < gridValues.length; i++) {
      let move = getIndexOfEmptyBox(gridValues[i]);

      // Column move
      if (!move.shouldBlock) {
        const column = [
          gridValues[i][0],
          gridValues[i + 1][0],
          gridValues[i + 2][0]
        ];

        move = getIndexOfEmptyBox(column);
      }
      // Cross move
      if (!move.shouldBlock) {
        const diagonal1 = [
          gridValues[i][0],
          gridValues[i + 1][1],
          gridValues[i + 2][2]
        ];

        move = getIndexOfEmptyBox(diagonal1);
      }

      if (!move.shouldBlock) {
        const diagonal2 = [
          gridValues[i][2],
          gridValues[i + 1][1],
          gridValues[i + 2][0]
        ];

        move = getIndexOfEmptyBox(diagonal2);
      }

      if (move.shouldBlock) {
        playSymbol(elts.boxes[move.index]);
        gridValues[move.index] = "O";
      } else {
        const emptyGrid = [];
        console.log("ELSE");
        for (let row = 0; row < gridValues.length; row++) {
          console.log("FIRST LOOP");
          for (let col = 0; col < row; col++) {
            console.log("SECOND LOOP");
            console.log(gridValues[row][col]);
            if (gridValues[row][col] === null) {
              emptyGrid.push({ row, col });
            }
          }
        }

        const index = emptyGrid[Math.floor(Math.random() * emptyGrid.length)];

        console.log(index);
        console.table(emptyGrid);

        playSymbol(elts.boxes[getBoxDOMIndex(index.row, index.col)]);
        gridValues[index.row][index.col] = "O";
      }
    }
  }
}

function countItems(list, lookup) {
  let count = 0;

  list.map(item => {
    if (item === lookup) {
      count++;
    }
  });

  return count;
}

function getIndexOfEmptyBox(arr) {
  const numberOfMoves = countItems(arr);

  if (numberOfMoves === arr.length - 1) {
    // Returns the position to play
    return { shouldBlock: true, index: arr.indexOf(null) };
  } else {
    return { shouldBlock: false, index: null };
  }
}
