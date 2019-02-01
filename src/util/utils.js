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
