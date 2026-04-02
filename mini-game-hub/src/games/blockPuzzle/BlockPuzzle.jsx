import { useEffect, useState } from "react";
import Board from "./Board";
import Tray from "./Tray";
import {
  createEmptyBoard,
  generateBlocks,
  placeBlock,
  clearLines,
  canPlace,
  isGameOver,
} from "./logic";

export default function BlockPuzzle() {
  const [grid, setGrid] = useState(createEmptyBoard());
  const [blocks, setBlocks] = useState(generateBlocks());
  const [score, setScore] = useState(0);
  const [dragging, setDragging] = useState(null);

  const handlePlace = (x, y) => {
  if (!dragging) return;
  const { shape, index, color } = dragging;

  if (!canPlace(grid, shape, x, y)) return;

  // Place the block
  let newGrid = placeBlock(grid, shape, x, y, color);
  const result = clearLines(newGrid);
  setGrid(result.grid);
  setScore((prev) => prev + result.score);

  // Update blocks tray
  const newBlocks = [...blocks];
  newBlocks[index] = null;

  // If all blocks are used, generate the next 3
  let trayBlocks;
  if (newBlocks.every((b) => b === null)) {
    trayBlocks = generateBlocks(); // generate new blocks
    setBlocks(trayBlocks);
  } else {
    trayBlocks = newBlocks;
    setBlocks(trayBlocks);
  }

  // Check game over using **the updated trayBlocks**
  // Only trigger if **no block can be placed**
  if (trayBlocks.every(b => b !== null) && isGameOver(result.grid, trayBlocks)) {
    alert("Game Over");
  }

  setDragging(null);
};

  return (
    <div className="game">
      <h2>Score: {score}</h2>

      <Board grid={grid} dragging={dragging} onPlace={handlePlace} />

      <Tray blocks={blocks} setDragging={setDragging} />
    </div>
  );
}