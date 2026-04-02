import { useState, useEffect } from "react";
import Board from "./Board";
import { COLORS } from "./colors";

const MAX_PER_BOLT = 4;
const BOLT_COUNT = 8;

export default function ColorScrewSort() {
  const [board, setBoard] = useState([]);
  const [win, setWin] = useState(false);
  const [history, setHistory] = useState([]); // ✅ store previous states

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const screws = [];
    COLORS.forEach((color) => {
      for (let i = 0; i < MAX_PER_BOLT; i++) screws.push(color);
    });

    for (let i = screws.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [screws[i], screws[j]] = [screws[j], screws[i]];
    }

    const newBoard = Array.from({ length: BOLT_COUNT }, () => []);
    let remaining = [...screws];

    while (remaining.length > 0) {
      const boltIdx = Math.floor(Math.random() * BOLT_COUNT);
      const bolt = newBoard[boltIdx];
      if (bolt.length >= MAX_PER_BOLT) continue;

      const movingScrew = remaining[remaining.length - 1];

      // Bottom 2 positions constraint
      if (bolt.length >= 2) {
        const bottomTwo = bolt.slice(0, 2);
        const uniqueColors = new Set(bottomTwo);
        if (!uniqueColors.has(movingScrew) && uniqueColors.size >= 2) continue;
      }

      bolt.push(remaining.pop());
    }

    setBoard(newBoard);
    setWin(false);
    setHistory([]); // reset undo history on restart
  };

  const checkWin = (currentBoard) => {
    const fullBolts = currentBoard.filter(
      (col) => col.length === MAX_PER_BOLT && col.every((s) => s === col[0])
    );
    const emptyBolts = currentBoard.filter((col) => col.length === 0);
    setWin(fullBolts.length === BOLT_COUNT - 1 && emptyBolts.length === 1);
  };

  const handleDrop = (fromIdx, toIdx) => {
    if (!board[fromIdx] || board[fromIdx].length === 0) return;

    const movingScrew = board[fromIdx][board[fromIdx].length - 1];
    if (!board[toIdx]) return;
    if (board[toIdx].length >= MAX_PER_BOLT) return;
    if (board[toIdx].length > 0 && board[toIdx][board[toIdx].length - 1] !== movingScrew) return;
    if (fromIdx === toIdx) return; // ignore drop on same bolt

    // ✅ save current board in history for undo
    setHistory((prev) => [...prev, board.map((col) => [...col])]);

    const newBoard = board.map((col, idx) => {
      if (idx === fromIdx) return col.slice(0, col.length - 1);
      if (idx === toIdx) return [...col, movingScrew];
      return col;
    });

    setBoard(newBoard);
    checkWin(newBoard);
  };

  const undo = () => {
    if (history.length === 0) return;
    const prevBoard = history[history.length - 1];
    setBoard(prevBoard.map((col) => [...col]));
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setWin(false);
  };

  const restartGame = () => initializeBoard();

  if (board.length === 0) return <button onClick={restartGame}>Start Game</button>;

  return (
    <div className="color-screw-sort">
  <h2>Color Screw Sort</h2>
  {win && <h3>🎉 You sorted all screws!</h3>}
  <div className="css-board">   {/* <-- renamed */}
    <Board board={board} onDrop={handleDrop} className="css-board" />  {/* pass a className */}
  </div>
  <div className="css-controls">
    <button onClick={undo} disabled={history.length === 0}>Undo</button>
    <button onClick={restartGame}>Restart Level</button>
  </div>
</div>
  );
}