import { SHAPES } from "./shapes";

export const SIZE = 10;

export function createEmptyBoard() {
  return Array(SIZE)
    .fill(0)
    .map(() => Array(SIZE).fill(0));
}

export function generateBlocks() {
  return Array.from({ length: 3 }, () => {
    return SHAPES[Math.floor(Math.random() * SHAPES.length)];
  });
}

export function canPlace(grid, shape, startX, startY) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (!shape[y][x]) continue;

      const newX = startX + x;
      const newY = startY + y;

      // SAFE bounds check
      if (
        newX < 0 ||
        newY < 0 ||
        newY >= grid.length ||
        newX >= grid[0].length
      ) {
        return false;
      }

      if (grid[newY][newX]) {
        return false;
      }
    }
  }

  return true;
}
export function placeBlock(grid, shape, startX, startY, color) {
  const newGrid = grid.map((row) => [...row]);

  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        newGrid[startY + y][startX + x] = color;
      }
    });
  });

  return newGrid;
}

export function clearLines(grid) {
  let score = 0;
  const size = grid.length;
  const newGrid = grid.map((row) => [...row]);

  // clear rows
  for (let y = 0; y < size; y++) {
    if (newGrid[y].every((c) => c)) {
      newGrid[y] = Array(size).fill(0);
      score += 10;
    }
  }

  // clear columns
  for (let x = 0; x < size; x++) {
    let full = true;

    for (let y = 0; y < size; y++) {
      if (!newGrid[y][x]) {
        full = false;
        break;
      }
    }

    if (full) {
      for (let y = 0; y < size; y++) {
        newGrid[y][x] = 0;
      }
      score += 10;
    }
  }

  return { grid: newGrid, score };
}

export function isGameOver(grid, blocks) {
  for (const shape of blocks) {
    if (!shape) continue;

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {  // use grid[0].length
        if (canPlace(grid, shape, x, y)) {
          return false;
        }
      }
    }
  }
  return true;
}