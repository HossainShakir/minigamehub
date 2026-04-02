export function canPlaceScrew(board, screw, columnIndex) {
  const column = board[columnIndex];
  if (!column) return false;
  return column.length === 0 || column[column.length - 1] === screw;
}